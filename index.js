const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Habit Tracker API');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

