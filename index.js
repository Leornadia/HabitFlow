const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));

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

// Add your other routes here...

app.listen(port, () => {
  console.log(`Habitflow API is running at http://localhost:${port}`);
});

