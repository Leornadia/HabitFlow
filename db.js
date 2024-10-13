const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./habitflow.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY, name TEXT, description TEXT)");
});

// Function to add a habit
function addHabit(habit) {
    const stmt = db.prepare("INSERT INTO habits (name, description) VALUES (?, ?)");
    stmt.run(habit.name, habit.description);
    stmt.finalize();
}

// Function to retrieve habits
function getHabits(callback) {
    db.all("SELECT * FROM habits", [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

module.exports = { addHabit, getHabits };

