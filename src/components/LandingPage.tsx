import React, { useState } from 'react';

const LandingPage = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here
    setCurrentPage('Dashboard');
  };

  const handleSignUp = () => {
    // Add sign-up logic here
    alert('Sign-up functionality coming soon!');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">HabitFlow</div>
        <nav>
          <a href="#">FAQ</a>
          <a href="#">Help Desk</a>
        </nav>
      </header>
      <main className="main-content">
        <h1>Welcome to HabitFlow</h1>
        <p>Your companion to track and improve your habits.</p>
        <div className="buttons">
          <button onClick={handleLogin}>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </main>
      <footer>
        <p>Don't have an account? <a href="#">Sign Up</a></p>
      </footer>
    </div>
  );
};

export default LandingPage;

