// Add event listeners to buttons
document.addEventListener("DOMContentLoaded", function () {
  const addHabitButton = document.querySelector(".add-habit-button");
  const editHabitButton = document.querySelector(".edit-habit-button");
  const newEntryButton = document.querySelector(".new-entry-button");
  const favouriteQuotesButton = document.querySelector(".favourite-quotes-button");
  const newChallengeButton = document.querySelector(".new-challenge-button");
  const logoutButton = document.querySelector(".logout-button");

  addHabitButton.addEventListener("click", function () {
    // Add new habit logic here
    console.log("Add new habit button clicked");
  });

  editHabitButton.addEventListener("click", function () {
    // Edit habit logic here
    console.log("Edit habit button clicked");
  });

  newEntryButton.addEventListener("click", function () {
    // Create new journal entry logic here
    console.log("New journal entry button clicked");
  });

  favouriteQuotesButton.addEventListener("click", function () {
    // Save favourite quotes logic here
    console.log("Favourite quotes button clicked");
  });

  newChallengeButton.addEventListener("click", function () {
    // Create new challenge logic here
    console.log("New challenge button clicked");
  });

  logoutButton.addEventListener("click", function () {
    // Logout logic here
    console.log("Logout button clicked");
  });
});

// Add event listeners to forms
document.addEventListener("DOMContentLoaded", function () {
  const checkinForm = document.querySelector(".checkin-form");
  const searchFilterForm = document.querySelector(".search-filter-form");

  checkinForm.addEventListener("submit", function (event) {
    // Checkin form submission logic here
    console.log("Checkin form submitted");
    event.preventDefault();
  });

  searchFilterForm.addEventListener("submit", function (event) {
    // Search filter form submission logic here
    console.log("Search filter form submitted");
    event.preventDefault();
  });
});

// Add event listeners to dropdown menus
document.addEventListener("DOMContentLoaded", function () {
  const settingsDropdown = document.querySelector(".settings-dropdown");
  const darkModeLink = document.querySelector(".settings-link.dark-mode");
  const lightModeLink = document.querySelector(".settings-link.light-mode");

  settingsDropdown.addEventListener("click", function () {
    // Toggle settings dropdown menu
    console.log("Settings dropdown menu toggled");
  });

  darkModeLink.addEventListener("click", function () {
    // Switch to dark mode logic here
    console.log("Dark mode link clicked");
  });

  lightModeLink.addEventListener("click", function () {
    // Switch to light mode logic here
    console.log("Light mode link clicked");
  });
});

// Add event listeners to quotes section
document.addEventListener("DOMContentLoaded", function () {
  const quotesLibraryList = document.querySelector(".quotes-library-list");
  const quoteText = document.querySelector(".quote-text");

  quotesLibraryList.addEventListener("click", function (event) {
    // Quote library list item click logic here
    console.log("Quote library list item clicked");
  });

  quoteText.addEventListener("click", function () {
    // Quote text click logic here
    console.log("Quote text clicked");
  });
});

// Add event listeners to streaks section
document.addEventListener("DOMContentLoaded", function () {
  const streaksHistoryList = document.querySelector(".streaks-history-list");
  const streakLength = document.querySelector(".streak-length");

  streaksHistoryList.addEventListener("click", function (event) {
    // Streaks history list item click logic here
    console.log("Streaks history list item clicked");
  });

  streakLength.addEventListener("click", function () {
    // Streak length click logic here
    console.log("Streak length clicked");
  });
});

// Add event listeners to challenges section
document.addEventListener("DOMContentLoaded", function () {
  const currentChallengesList = document.querySelector(".current-challenges-list");
  const challengeName = document.querySelector(".challenge-name");

  currentChallengesList.addEventListener("click", function (event) {
    // Current challenges list item click logic here
    console.log("Current challenges list item clicked");
  });

  challengeName.addEventListener("click", function () {
    // Challenge name click logic here
    console.log("Challenge name clicked");
  });
});
