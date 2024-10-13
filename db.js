const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./habitflow.db');

db.serialize(() => {
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
            streak INTEGER DEFAULT 0,
            last_logged TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);

    // Create Journals table
    db.run(`
        CREATE TABLE IF NOT EXISTS journals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            entry TEXT,
            date TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);

    // Create Check-ins table
    db.run(`
        CREATE TABLE IF NOT EXISTS checkins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            habit_id INTEGER,
            checkin_date TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (habit_id) REFERENCES habits (id)
        )
    `);
});

module.exports = db;

