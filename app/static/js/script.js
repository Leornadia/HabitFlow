// toggle sidebar on mobile devices
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('aside');
  const toggleButton = document.querySelector('.toggle-button');

  toggleButton.addEventListener('click', function() {
    sidebar.classList.toggle('open');
  });
});

// add event listener to dashboard buttons
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.dashboard button');

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      // add your button logic here
    });
  });
});
