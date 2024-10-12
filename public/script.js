// Handle Sign Up Form Submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert('Registration successful! Please log in.');
      window.location.href = '/login.html'; // Redirect to login page
    } else {
      alert('Error registering user.');
    }
  });
}

// Handle Login Form Submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); // Store JWT token
      window.location.href = '/dashboard.html'; // Redirect to dashboard
    } else {
      alert('Invalid login credentials');
    }
  });
}

// Handle Habit Form Submission
const addHabitForm = document.getElementById('addHabitForm');
if (addHabitForm) {
  addHabitForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const habitName = document.getElementById('habitName').value;
    const description = document.getElementById('description').value;

    const response = await fetch('/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify({ name: habitName, description }),
    });

    if (response.ok) {
      alert('Habit added successfully!');
      // Optionally refresh the list of habits
    } else {
      alert('Error adding habit.');
    }
  });
}

// Handle Logout
const logoutButton = document.getElementById('logout');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token'); // Clear JWT
    window.location.href = '/login.html'; // Redirect to login page
  });
}

