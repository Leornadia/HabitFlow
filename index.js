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

// Create a new habit
app.post('/habits', (req, res) => {
  const { name, description } = req.body;
  const sql = `INSERT INTO habits (name, description) VALUES (?, ?)`;

  db.run(sql, [name, description], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID, name, description });
  });
});

// Log a habit (increment streak)
app.put('/habits/:id/log', (req, res) => {
  const id = req.params.id;
  const today = new Date().toISOString().split('T')[0]; // Get current date

  const sql = `
    UPDATE habits
    SET streak = streak + 1, last_logged = ?
    WHERE id = ? AND (last_logged IS NULL OR last_logged <> ?)
  `;

  db.run(sql, [today, id, today], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Habit logged successfully!' });
  });
});

// Delete a habit
app.delete('/habits/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM habits WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Habit deleted successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Habitflow API is running at http://localhost:${port}`);
});

