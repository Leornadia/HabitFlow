const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with current timestamp
  }
});

const upload = multer({ storage: storage });

// Connect to SQLite database
const db = new sqlite3.Database('./habitflow.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create Users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

// Create Habits table
db.run(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

// Create Checkins table
db.run(`
  CREATE TABLE IF NOT EXISTS checkins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    time_of_day TEXT,
    date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

// Create Journal Entries table
db.run(`
  CREATE TABLE IF NOT EXISTS journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entry TEXT NOT NULL,
    user_id INTEGER,
    date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

// JWT secret key
const SECRET_KEY = 'mysecretkey';

// Register a new user
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [username, email, hashedPassword], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User registered successfully!' });
  });
});

// Login a user and generate JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;
  
  db.get(sql, [email], async (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

// Middleware to authenticate user using JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Route to get habits for authenticated user
app.get('/habits', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM habits WHERE user_id = ?`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ habits: rows });
  });
});

// Route to add a new habit
app.post('/habits', authenticateToken, (req, res) => {
  const { name, description } = req.body;
  const sql = `INSERT INTO habits (name, description, user_id) VALUES (?, ?, ?)`;
  
  db.run(sql, [name, description, req.user.id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, name, description });
  });
});

// Route to get journal entries for authenticated user
app.get('/journal', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM journal_entries WHERE user_id = ?`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ journal: rows });
  });
});

// Route to add a new journal entry
app.post('/journal', authenticateToken, (req, res) => {
  const { entry } = req.body;
  const date = new Date().toISOString();
  const sql = `INSERT INTO journal_entries (entry, user_id, date) VALUES (?, ?, ?)`;
  
  db.run(sql, [entry, req.user.id, date], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Journal entry saved successfully!' });
  });
});

// Route to handle check-ins
app.post('/checkin', authenticateToken, (req, res) => {
  const { timeOfDay } = req.body;
  const date = new Date().toISOString().split('T')[0];
  
  const sql = `INSERT INTO checkins (user_id, time_of_day, date) VALUES (?, ?, ?)`;
  db.run(sql, [req.user.id, timeOfDay, date], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: `Check-in for ${timeOfDay} saved successfully!` });
  });
});

// Get today's check-ins for a user
app.get('/checkin', authenticateToken, (req, res) => {
  const date = new Date().toISOString().split('T')[0];
  const sql = `SELECT * FROM checkins WHERE user_id = ? AND date = ?`;
  
  db.all(sql, [req.user.id, date], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ checkins: rows });
  });
});

// Route to handle image uploads
app.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
  res.json({ file: req.file.filename, message: 'Image uploaded successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

