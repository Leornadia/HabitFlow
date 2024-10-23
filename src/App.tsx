import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import CheckIns from './components/CheckIns';
import Quotes from './components/Quotes';
import Streaks from './components/Streaks';
import Challenges from './components/Challenges';
import Habit from './components/Habit';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('LandingPage');
  const [username, setUsername] = useState('');

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard': return <Dashboard />;
      case 'Journal': return <Journal />;
      case 'Check-ins': return <CheckIns />;
      case 'Quotes': return <Quotes />;
      case 'Streaks': return <Streaks />;
      case 'Challenges': return <Challenges />;
      case 'Habit': return <Habit />;
      case 'LandingPage': return <LandingPage setCurrentPage={setCurrentPage} />;
      default: return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-peach-100 text-gray-900'}`}>
      {currentPage !== 'LandingPage' && (
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} username={username} />
      )}
      <div className="flex">
        {currentPage !== 'LandingPage' && <Sidebar setCurrentPage={setCurrentPage} />}
        <main className="flex-1 p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;

