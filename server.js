const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Session setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Database setup
const db = new sqlite3.Database('./habitflow.db');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.redirect('/landing');
});

// Landing page route
app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'landing.html'));
});

// Home route
app.get('/home', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Journal route
app.get('/journal', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'journal.html'));
});

// Check-ins route
app.get('/checkins', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'checkins.html'));
});

// Challenges route
app.get('/challenges', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'challenges.html'));
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Habits route
app.get('/habits', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'habits.html'));
});

// Upload progress photos
app.post('/upload', upload.single('progressPhoto'), (req, res) => {
  if (!req.session.user) return res.status(401).send('Login required');
  const file = req.file;
  console.log(`Uploaded file: ${file.filename}`);
  res.redirect('/dashboard');
});

// Handle login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return res.status(500).send('Error logging in');
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }
    req.session.user = user;
    res.redirect('/home');
  });
});

// Handle signup
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).send('Error signing up');
      res.redirect('/login');
  });
});

// Insights route
app.get('/insights', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'insights.html'));
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

