import React from 'react';

const Navbar = ({ darkMode, toggleDarkMode }) => (
  <nav className="navbar">
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  </nav>
);

export default Navbar;

