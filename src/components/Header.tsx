import React from 'react';
import { Bell, HelpCircle, Moon, Settings, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-brown-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/placeholder.svg?height=40&width=40" alt="HabitFlow Logo" className="mr-2 rounded-full" />
          <span className="text-2xl font-bold">HabitFlow</span>
        </div>
        <nav className="flex items-center space-x-4">
          <button className="p-2 rounded hover:bg-brown-600"><HelpCircle size={18} /></button>
          <button className="p-2 rounded hover:bg-brown-600"><Bell size={18} /></button>
          <button className="p-2 rounded hover:bg-brown-600"><Settings size={18} /></button>
          <button className="p-2 rounded hover:bg-brown-600" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
