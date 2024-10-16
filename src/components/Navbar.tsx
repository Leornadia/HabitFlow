import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-light-peach p-4 flex justify-between items-center">
    <div>
      <Link to="/dashboard" className="m-2">Dashboard</Link>
      <Link to="/journal" className="m-2">Journal</Link>
      <Link to="/check-ins" className="m-2">Check-ins</Link>
      <Link to="/quotes" className="m-2">Quotes</Link>
      <Link to="/streaks" className="m-2">Streaks</Link>
      <Link to="/challenges" className="m-2">Challenges</Link>
    </div>
    <div>
      <span className="m-2">Leornadia</span>
      <button className="m-2">Help</button>
      <button className="m-2">Settings</button>
    </div>
  </nav>
);

export default Navbar;

