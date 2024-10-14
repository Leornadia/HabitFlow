document.getElementById('settings-icon').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Change active state for menu items
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    // Load the content dynamically based on the clicked item
    const target = item.getAttribute('data-target');
    loadContent(target);
  });
});

function loadContent(page) {
  const contentContainer = document.getElementById('content-container');
  // Simulate loading page content dynamically
  contentContainer.innerHTML = `<h2>${page.charAt(0).toUpperCase() + page.slice(1)}</h2><p>Content for the ${page} page goes here.</p>`;
}

