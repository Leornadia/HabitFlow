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

