const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Connect to SQLite database
const db = new sqlite3.Database('./habits.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the habits database.');
});

// Create the habits table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS habits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  streak INTEGER DEFAULT 0,
  last_logged TEXT
)`);

// Root route to display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Habitflow API');
});

// Get all habits
app.get('/habits', (req, res) => {
  const sql = `SELECT * FROM habits`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ habits: rows });
  });
});

// Add other routes (POST, PUT, DELETE) here...

app.listen(port, () => {
  console.log(`Habitflow API is running at http://localhost:${port}`);
});

