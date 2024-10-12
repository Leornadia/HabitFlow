const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Or a persistent DB (e.g., 'habitflow.db')
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied.');

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
}

// Set up the users and journal_entries tables when the server starts
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entry TEXT NOT NULL,
      user_id INTEGER,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [username, email, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User registered successfully!' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], (err, user) => {
    if (err) return res.status(400).json({ error: err.message });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  });
});

app.get('/habits', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM habits WHERE user_id = ?`;
  
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ habits: rows });
  });
});

app.post('/habits', authenticateToken, (req, res) => {
  const { name, description } = req.body;
  const sql = `INSERT INTO habits (name, description, user_id) VALUES (?, ?, ?)`;

  db.run(sql, [name, description, req.user.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, name, description });
  });
});

// --- JOURNAL FUNCTIONALITY ---

// Route to save a new journal entry
app.post('/journal', authenticateToken, (req, res) => {
  const { entry } = req.body;
  const date = new Date().toISOString();
  
  const sql = `INSERT INTO journal_entries (entry, user_id, date) VALUES (?, ?, ?)`;
  db.run(sql, [entry, req.user.id, date], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Journal entry saved successfully!' });
  });
});

// Route to get all journal entries for a user
app.get('/journal', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM journal_entries WHERE user_id = ?`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ journal: rows });
  });
});

// --- SERVER LISTEN ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

