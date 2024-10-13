// Handle form submission for adding habits
document.getElementById('add-habit-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const habitName = document.getElementById('habit-name').value;
    const habitDescription = document.getElementById('habit-description').value;

    alert(`New habit added: ${habitName} - ${habitDescription}`);
});

// Handle file upload
document.getElementById('upload-photo-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/upload-progress-photo', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('upload-result').innerText = 'Photo uploaded successfully!';
        } else {
            document.getElementById('upload-result').innerText = 'Photo upload failed.';
        }
    });
});

// Interactive Habit Dashboard with Chart.js
var ctx1 = document.getElementById('habitCompletionChart').getContext('2d');
var habitCompletionChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Exercise', 'Reading', 'Meditation'],
        datasets: [{
            label: 'Completion Rate',
            data: [75, 60, 90],
            backgroundColor: ['#D2B48C', '#FFE5B4', '#FF6347'],
            borderColor: ['#D2B48C', '#FFE5B4', '#FF6347'],
            borderWidth: 1
        }]
    }
});

