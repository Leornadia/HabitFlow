import React from 'react';
import { Sun, Moon, HelpCircle, User, Settings } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, setCurrentPage }) => {
  return (
    <nav className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-brown-200'}`}>
      <div className="flex items-center space-x-4">
        <HelpCircle className="cursor-pointer" onClick={() => setCurrentPage('Help')} />
        <User className="cursor-pointer" onClick={() => setCurrentPage('Profile')} />
        <Settings className="cursor-pointer" onClick={() => setCurrentPage('Settings')} />
      </div>
      <h1 className="text-2xl font-bold">HabitFlow</h1>
      <button onClick={toggleDarkMode} className="p-2 rounded-full">
        {darkMode ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
};

export default Navbar;
