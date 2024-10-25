import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import HabitManager from './components/HabitManager';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {currentPage === 'landing' && <LandingPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'habits' && <HabitManager />}
    </div>
  );
};

export default App;
