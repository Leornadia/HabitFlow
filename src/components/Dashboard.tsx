import React, { useState } from 'react';
import { Home, FileText, CreditCard, User, Clock, HelpCircle, LogOut, Bell, Settings, ChevronDown, Plus, Moon } from 'lucide-react';
import CheckIns from './CheckIns';
import Challenges from './Challenges';
import Journal from './Journal';
import Quotes from './Quotes';
import Streaks from './Streaks';

interface Habit {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [habits, setHabits] = useState<Habit[]>([
    { name: 'Morning Meditation', description: '15 minutes of mindfulness', status: 'Active' },
    { name: 'Daily Exercise', description: '30 minutes of cardio', status: 'Active' },
    { name: 'Reading', description: 'Read for 30 minutes before bed', status: 'Inactive' },
  ]);

  const [newHabit, setNewHabit] = useState<Habit>({
    name: '',
    description: '',
    status: 'Inactive'
  });

  const sidebarItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Journal', icon: FileText },
    { name: 'Check-ins', icon: Clock },
    { name: 'Quotes', icon: FileText },
    { name: 'Streaks', icon: CreditCard },
    { name: 'Challenges', icon: User },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewHabit(prev => ({ ...prev, [name]: value }));
  };

  const handleAddHabit = () => {
    if (newHabit.name && newHabit.description) {
      setHabits(prev => [...prev, newHabit]);
      setNewHabit({ name: '', description: '', status: 'Inactive' });
    } else {
      alert('Please fill in both name and description');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
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
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to HabitFlow, Leornadia!</h1>
            <p className="text-lg text-gray-600 mb-8">Track your habits and progress. Reach your goals and improve your life.</p>
            
            {/* Habit Manager Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Habit Manager</h2>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-4">Add a New Habit</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Habit Name"
                  value={newHabit.name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newHabit.description}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                <select
                  name="status"
                  value={newHabit.status}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button
                  onClick={handleAddHabit}
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                >
                  <Plus className="mr-2" /> Add Habit
                </button>
              </div>

              <h3 className="text-xl font-semibold mb-4">Your Habits</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {habits.map((habit, index) => (
                  <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-lg font-medium text-gray-900">{habit.name}</h4>
                      <p className="mt-1 text-sm text-gray-600">{habit.description}</p>
                      <p className={`mt-2 ${habit.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        Status: {habit.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-orange-50">
      {/* Sidebar */}
      <div className="w-64 bg-orange-100 shadow-md flex flex-col h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-red-600">HabitFlow</h1>
        </div>
        <nav className="mt-6 flex-grow">
          {sidebarItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-6 py-3 text-gray-700 ${
                activeTab === item.name ? 'bg-orange-200 border-r-4 border-red-600' : 'hover:bg-orange-200'
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
        <div className="p-4">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 bg-orange-200 rounded hover:bg-orange-300"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-orange-800 text-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <HelpCircle className="h-5 w-5 cursor-pointer" />
              <User className="h-5 w-5 cursor-pointer" />
              <Settings className="h-5 w-5 cursor-pointer" />
              <Bell className="h-5 w-5 cursor-pointer" />
              <div className="flex items-center">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">L</span>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {renderContent()}
          </div>
        </main>

        <footer className="bg-orange-100">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-gray-500">
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-900">About</a>
              <a href="#" className="hover:text-gray-900">Legal Documents</a>
            </div>
            <div>© 2024 HabitFlow. All Rights Reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
