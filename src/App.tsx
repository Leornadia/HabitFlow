import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-orange-50 text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
