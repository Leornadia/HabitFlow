const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize SQLite database (using in-memory for now, you can switch to persistent)
const db = new sqlite3.Database('./habitflow.db'); // Save to habitflow.db file instead of memory

// Create necessary tables (users and habits)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      streak INTEGER DEFAULT 0,
      last_logged TEXT,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

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

// Routes
// Serve the signup page as the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve the login page
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the dashboard page
app.get('/dashboard.html', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// User registration route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [username, email, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User registered successfully!' });
  });
});

// User login route
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

// Route to create a new habit
app.post('/habits', authenticateToken, (req, res) => {
  const { name, description } = req.body;
  const sql = `INSERT INTO habits (name, description, user_id) VALUES (?, ?, ?)`;

  db.run(sql, [name, description, req.user.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, name, description });
  });
});

// Route to get all habits for the logged-in user
app.get('/habits', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM habits WHERE user_id = ?`;

  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ habits: rows });
  });
});

// Route to log out
app.post('/logout', (req, res) => {
  // Invalidate the token (if you're storing tokens on the client, you can remove it there)
  res.json({ message: 'Logged out successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

