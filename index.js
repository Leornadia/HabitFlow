const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Add this to serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the frontend entry point (index.html) if the route isn't an API call
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to SQLite database
const db = new sqlite3.Database('./habits.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the habits database.');
});

// Create users and habits tables
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS habits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  streak INTEGER DEFAULT 0,
  last_logged TEXT,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

// Registration route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [username, email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'User registered successfully!' });
  });
});

// Login route
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

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied.');

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
}

// Add a new habit
app.post('/habits', authenticateToken, (req, res) => {
  const { name, description } = req.body;
  const sql = `INSERT INTO habits (name, description, user_id) VALUES (?, ?, ?)`;

  db.run(sql, [name, description, req.user.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, name, description });
  });
});

// Get all habits for the logged-in user
app.get('/habits', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM habits WHERE user_id = ?`;

  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ habits: rows });
  });
});

// Log a habit (increment streak)
app.put('/habits/:id/log', authenticateToken, (req, res) => {
  const id = req.params.id;
  const today = new Date().toISOString().split('T')[0];

  const sql = `
    UPDATE habits
    SET streak = streak + 1, last_logged = ?
    WHERE id = ? AND user_id = ? AND (last_logged IS NULL OR last_logged <> ?)
  `;

  db.run(sql, [today, id, req.user.id, today], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Habit logged successfully!' });
  });
});

// Delete a habit
app.delete('/habits/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM habits WHERE id = ? AND user_id = ?`;

  db.run(sql, [id, req.user.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Habit deleted successfully!' });
  });
});

// Disable caching for routes
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Habitflow API is running at http://localhost:${port}`);
});

