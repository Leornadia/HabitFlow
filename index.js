const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to SQLite Database
const db = new sqlite3.Database('./habitflow.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Users Table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )`);
    
    // Create Check-ins Table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS checkins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      time_of_day TEXT,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
    
    // Create Journal Entries Table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entry TEXT NOT NULL,
      user_id INTEGER,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    console.log('Database tables created (if they didn\'t exist already).');
  }
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Route: Add a new check-in
app.post('/checkin', authenticateToken, (req, res) => {
  const { timeOfDay } = req.body; // morning, afternoon, evening
  const date = new Date().toISOString().split('T')[0]; // Get today's date
  
  const sql = `INSERT INTO checkins (user_id, time_of_day, date) VALUES (?, ?, ?)`;
  db.run(sql, [req.user.id, timeOfDay, date], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: `Check-in for ${timeOfDay} saved successfully!` });
  });
});

// Route: Get today's check-ins for a user
app.get('/checkin', authenticateToken, (req, res) => {
  const date = new Date().toISOString().split('T')[0];
  const sql = `SELECT * FROM checkins WHERE user_id = ? AND date = ?`;
  
  db.all(sql, [req.user.id, date], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ checkins: rows });
  });
});

// Route: Save a journal entry
app.post('/journal', authenticateToken, (req, res) => {
  const { entry } = req.body;
  const date = new Date().toISOString();
  
  const sql = `INSERT INTO journal_entries (entry, user_id, date) VALUES (?, ?, ?)`;
  db.run(sql, [entry, req.user.id, date], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Journal entry saved successfully!' });
  });
});

// Route: Get journal entries for a user
app.get('/journal', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM journal_entries WHERE user_id = ?`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ journal: rows });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

