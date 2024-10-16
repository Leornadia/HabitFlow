import React from 'react';

const Sidebar = ({ setCurrentPage }) => (
  <div className="sidebar">
    <button onClick={() => setCurrentPage('Dashboard')}>Dashboard</button>
    <button onClick={() => setCurrentPage('Journal')}>Journal</button>
    <button onClick={() => setCurrentPage('Check-ins')}>Check-ins</button>
    <button onClick={() => setCurrentPage('Quotes')}>Quotes</button>
    <button onClick={() => setCurrentPage('Streaks')}>Streaks</button>
    <button onClick={() => setCurrentPage('Challenges')}>Challenges</button>
    <div className="mt-auto">
      <button>Help</button>
      <button>Logout</button>
    </div>
  </div>
);

export default Sidebar;

