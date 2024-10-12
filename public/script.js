// Handle Sign-up Form Submission
document.getElementById('signup-form')?.addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await response.json();

  if (response.ok) {
    alert('User registered successfully!');
    window.location.href = 'login.html'; // Redirect to login
  } else {
    alert(data.error || 'Failed to register');
  }
});

// Handle Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.token); // Store JWT token
    window.location.href = 'dashboard.html'; // Redirect to dashboard
  } else {
    alert(data.error || 'Invalid login credentials');
  }
});

