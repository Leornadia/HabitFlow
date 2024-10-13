const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const db = require('./db'); // Assuming you have a db.js for database operations

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const upload = multer({ dest: 'public/uploads/' });

// Route for landing page
app.get('/landing', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landing.html'));
});

// Default route to redirect to landing page
app.get('/', (req, res) => {
    res.redirect('/landing');
});

// Routes for different pages
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/journal', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'journal.html'));
});

app.get('/challenges', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'challenges.html'));
});

app.get('/checkins', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'checkins.html'));
});

// Route for habits
app.get('/habits', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'habits.html'));
});

// Route for habit dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Add a new habit
app.post('/habits/add', (req, res) => {
    const { habitName, habitDescription } = req.body;
    db.addHabit({ name: habitName, description: habitDescription }); // Assuming you have this function in db.js
    res.redirect('/habits');
});

// Route to upload progress photos
app.post('/upload', upload.single('progressPhoto'), (req, res) => {
    const file = req.file;
    console.log(`Uploaded file: ${file.filename}`);
    res.redirect('/dashboard');
});

// Logout route
app.get('/logout', (req, res) => {
    res.redirect('/landing');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

