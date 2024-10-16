import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar bg-light-brown h-screen w-1/6 p-4">
    <Link to="/dashboard" className="block my-4">Dashboard</Link>
    <Link to="/journal" className="block my-4">Journal</Link>
    <Link to="/check-ins" className="block my-4">Check-ins</Link>
    <Link to="/quotes" className="block my-4">Quotes</Link>
    <Link to="/streaks" className="block my-4">Streaks</Link>
    <Link to="/challenges" className="block my-4">Challenges</Link>
    <Link to="/" className="block my-4 text-red-500">Logout</Link>
  </div>
);

export default Sidebar;

