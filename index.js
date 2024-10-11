// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const morgan = require('morgan'); // Require morgan for logging

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(morgan('dev')); // Use morgan for logging HTTP requests

// Setup SQLite database
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

// Define your routes here (Add Habits, Get All Habits, etc.)
// ...

// Start the server
app.listen(port, () => {
  console.log(`Habitflow API is running at http://localhost:${port}`);
});

