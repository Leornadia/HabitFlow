let token = null;

// Register (Sign Up)
function register() {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      // Registration successful, switch to login section
      document.getElementById('signup-section').style.display = 'none';
      document.getElementById('auth-section').style.display = 'block';
    } else {
      document.getElementById('signup-error').textContent = 'Error: ' + data.error;
    }
  });
}

// Login
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      token = data.token;
      document.getElementById('auth-section').style.display = 'none';
      document.getElementById('habit-section').style.display = 'block';
      fetchHabits();
    } else {
      document.getElementById('login-error').textContent = 'Invalid credentials';
    }
  });
}

// Fetch Habits
function fetchHabits() {
  fetch('/habits', {
    headers: { 'Authorization': token }
  })
  .then(response => response.json())
  .then(data => {
    const habitList = document.getElementById('habit-list');
    habitList.innerHTML = '';
    data.habits.forEach(habit => {
      const habitElement = document.createElement('p');
      habitElement.textContent = habit.name + ': ' + habit.description;
      habitList.appendChild(habitElement);
    });
  });
}

// Logout
function logout() {
  token = null;
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('habit-section').style.display = 'none';
}

