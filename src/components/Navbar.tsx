import React from 'react';
import { Sun, Moon, HelpCircle, Settings, User } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, username }) => {
  return (
    <nav className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-light-peach'}`}>
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">HabitFlow</h1>
        <button className="btn" onClick={toggleDarkMode} title="Toggle dark mode">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="btn" title="Help">
          <HelpCircle size={20} />
        </button>
        <button className="btn" title="Settings">
          <Settings size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <User size={20} />
          <span className="font-semibold">{username}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
