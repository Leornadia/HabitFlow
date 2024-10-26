import React from 'react';
import { Moon, Sun, LogOut } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, isLoggedIn, onLogout }) => {
  return (
    <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-orange-800'} text-white`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">HabitFlow</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-orange-700">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </li>
            {isLoggedIn && (
              <li>
                <button onClick={onLogout} className="flex items-center space-x-2 p-2 rounded hover:bg-orange-700">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
