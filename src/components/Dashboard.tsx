import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import Header from './Header';

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-peach-100 text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 p-6 ${darkMode ? 'bg-gray-800' : 'bg-brown-200'}`}>
          <nav>
            <ul className="space-y-4">
              <li><button className="w-full text-left px-4 py-2 rounded hover:bg-opacity-20 hover:bg-white">Dashboard</button></li>
              <li><button className="w-full text-left px-4 py-2 rounded hover:bg-opacity-20 hover:bg-white">Journal</button></li>
              <li><button className="w-full text-left px-4 py-2 rounded hover:bg-opacity-20 hover:bg-white">Check-ins</button></li>
              <li><button className="w-full text-left px-4 py-2 rounded hover:bg-opacity-20 hover:bg-white">Quotes</button></li>
              <li><button className="w-full text-left px-4 py-2 rounded hover:bg-opacity-20 hover:bg-white">Streaks</button></li>
              <li><button className="w-full text-left px-4 py-2 rounded hover:bg-opacity-20 hover:bg-white">Challenges</button></li>
            </ul>
          </nav>
          <button className="mt-auto w-full text-left px-4 py-2 rounded hover:bg-opacity-20 hover:bg-white flex items-center">
            <LogOut className="mr-2" size={18} />Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-8">
          <section className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-brown-100'}`}>
            <h1 className="text-3xl font-bold mb-4">Welcome to HabitFlow, Leornadia!</h1>
            <p className="text-xl">Track your habits and progress. Reach your goals and improve your life.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Habits</h2>
              <ul className="space-y-2">
                <li>Morning Meditation - Active</li>
                <li>Daily Exercise - Active</li>
                <li>Reading - Inactive</li>
              </ul>
              <button className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>Add new habit</button>
            </div>

            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Progress</h2>
              <img src="/placeholder.svg?height=200&width=300" alt="Progress Chart" className="w-full h-40 object-cover rounded mb-4" />
              <p>You have completed 50% of your habits this week</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
