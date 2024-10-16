import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Journal from './Journal';
import CheckIns from './CheckIns';
import Quotes from './Quotes';
import Streaks from './Streaks';
import Challenges from './Challenges';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Journal':
        return <Journal />;
      case 'Check-ins':
        return <CheckIns />;
      case 'Quotes':
        return <Quotes />;
      case 'Streaks':
        return <Streaks />;
      case 'Challenges':
        return <Challenges />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-peach-100 text-gray-900'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex">
        <Sidebar setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;

