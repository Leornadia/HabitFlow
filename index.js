// Global variables to store JWT token after login
let token = '';

// Function to handle login
async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.status === 200) {
            token = data.token;
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadDashboard();
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

// Function to load user habits
async function loadHabits() {
    try {
        const res = await fetch('/habits', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        const data = await res.json();
        displayHabits(data.habits);
    } catch (error) {
        console.error('Error loading habits:', error);
    }
}

// Function to display habits
function displayHabits(habits) {
    const habitList = document.getElementById('habit-list');
    habitList.innerHTML = '';
    habits.forEach(habit => {
        const habitItem = document.createElement('li');
        habitItem.textContent = `${habit.name}: ${habit.description}`;
        habitList.appendChild(habitItem);
    });
}

// Function to add a new habit
async function addHabit(event) {
    event.preventDefault();

    const name = document.getElementById('habit-name').value;
    const description = document.getElementById('habit-description').value;

    try {
        const res = await fetch('/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ name, description })
        });

        const data = await res.json();
        if (res.status === 200) {
            loadHabits();
        } else {
            alert(data.error || 'Failed to add habit');
        }
    } catch (error) {
        console.error('Error adding habit:', error);
    }
}

// Function to load journal entries
async function loadJournalEntries() {
    try {
        const res = await fetch('/journal', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        const data = await res.json();
        displayJournalEntries(data.journal);
    } catch (error) {
        console.error('Error loading journal:', error);
    }
}

// Function to display journal entries
function displayJournalEntries(entries) {
    const journalList = document.getElementById('journal-list');
    journalList.innerHTML = '';
    entries.forEach(entry => {
        const journalItem = document.createElement('li');
        journalItem.textContent = `${entry.date}: ${entry.entry}`;
        journalList.appendChild(journalItem);
    });
}

// Function to add a new journal entry
async function addJournalEntry(event) {
    event.preventDefault();

    const entry = document.getElementById('journal-entry').value;

    try {
        const res = await fetch('/journal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ entry })
        });

        const data = await res.json();
        if (res.status === 200) {
            loadJournalEntries();
        } else {
            alert(data.error || 'Failed to add journal entry');
        }
    } catch (error) {
        console.error('Error adding journal entry:', error);
    }
}

// Function to handle check-ins (morning, afternoon, evening)
async function handleCheckIn(timeOfDay) {
    try {
        const res = await fetch('/checkin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ timeOfDay })
        });

        const data = await res.json();
        alert(data.message || `Checked in for ${timeOfDay}`);
    } catch (error) {
        console.error('Error checking in:', error);
    }
}

// Function to handle file upload (e.g. progress photo for habits)
async function uploadImage(event) {
    event.preventDefault();

    const formData = new FormData();
    const file = document.getElementById('image-upload').files[0];
    formData.append('image', file);

    try {
        const res = await fetch('/upload', {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: formData
        });

        const data = await res.json();
        alert(data.message || 'Image uploaded successfully');
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Function to load the dashboard (habits, journal, etc.)
function loadDashboard() {
    loadHabits();
    loadJournalEntries();
}

// Event listeners for form submissions
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('habit-form').addEventListener('submit', addHabit);
document.getElementById('journal-form').addEventListener('submit', addJournalEntry);
document.getElementById('image-upload-form').addEventListener('submit', uploadImage);

// Check-in buttons
document.getElementById('morning-checkin').addEventListener('click', () => handleCheckIn('morning'));
document.getElementById('afternoon-checkin').addEventListener('click', () => handleCheckIn('afternoon'));
document.getElementById('evening-checkin').addEventListener('click', () => handleCheckIn('evening'));

