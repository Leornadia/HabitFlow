const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to serve static files (CSS, HTML files)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes to serve different HTML files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/journal.html', (req, res) => {
    res.sendFile(__dirname + '/views/journal.html');
});

app.get('/challenges.html', (req, res) => {
    res.sendFile(__dirname + '/views/challenges.html');
});

app.get('/checkins.html', (req, res) => {
    res.sendFile(__dirname + '/views/checkins.html');
});

app.get('/logout', (req, res) => {
    // Simulate logout and redirect to the homepage
    res.redirect('/');
});

// Handle form submissions for adding habits
app.post('/add-habit', (req, res) => {
    const { habit_name, habit_description } = req.body;
    console.log(`Habit added: ${habit_name}, Description: ${habit_description}`);
    res.redirect('/');
});

// Handle check-ins (for demo)
app.post('/checkins', (req, res) => {
    console.log('User checked in!');
    res.redirect('/checkins.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

