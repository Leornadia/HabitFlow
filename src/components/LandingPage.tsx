import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import Header from './Header';

const LandingPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginForm) {
      // Add login logic here
      setCurrentPage('Dashboard');
    } else {
      // Add sign-up logic here
      alert('Sign-up functionality coming soon!');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img 
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photorealistic_3d_image_of_an_athletic_african_american_woman_in_sporty_attire_holding_a_smartphone_displaying_the_habitflow_logo_the_woman_is_smiling_confidently_facing_the_camera_in_a_dynamic_pose_that_suggests_-pFcnEp8rQllS307rr3AoLusmultXTs.jpeg" 
        alt="Woman using HabitFlow app" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full">
            <h1 className="text-4xl font-bold mb-4 text-white text-center">Welcome to HabitFlow</h1>
            <p className="text-xl mb-6 text-white text-center">Your companion to track and improve your habits.</p>
            
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'} shadow-lg`}>
              <h2 className="text-2xl font-semibold mb-6 text-center">{isLoginForm ? 'Log In' : 'Sign Up'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full flex justify-center items-center py-2 px-4 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  {isLoginForm ? <LogIn className="mr-2" size={18} /> : <UserPlus className="mr-2" size={18} />}
                  {isLoginForm ? 'Log In' : 'Sign Up'}
                </button>
              </form>
              <p className="mt-4 text-center">
                {isLoginForm ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLoginForm(!isLoginForm)} className="font-medium text-blue-500 hover:underline">
                  {isLoginForm ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
