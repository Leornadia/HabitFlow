import React from 'react';

const Navbar = ({ darkMode, toggleDarkMode, username }) => (
  <nav className="navbar flex justify-between items-center">
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
    <div>
      <span>{username}</span>
      <button>Settings</button>
    </div>
  </nav>
);

export default Navbar;

