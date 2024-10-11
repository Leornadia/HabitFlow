const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./habits.db');

// Create habits table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      streak INTEGER DEFAULT 0,
      last_logged DATE
    )
  `);
});

module.exports = db;

