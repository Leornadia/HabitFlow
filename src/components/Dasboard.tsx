import React from 'react';
import { PlusCircle, Edit } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to HabitFlow!</h1>
        <p className="text-xl mb-2">Track your habits and progress</p>
        <p className="text-xl">Reach your goals and improve your life</p>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Habits</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Morning Meditation</h3>
              <p className="text-sm text-gray-600">15 minutes of mindfulness</p>
            </div>
            <span className="px-2 py-1 bg-green-200 text-green-800 rounded">Active</span>
          </li>
          <li className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Evening Reading</h3>
              <p className="text-sm text-gray-600">Read for 30 minutes before bed</p>
            </div>
            <span className="px-2 py-1 bg-red-200 text-red-800 rounded">Inactive</span>
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Progress</h2>
        <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
          [Progress Chart Placeholder]
        </div>
        <p className="mt-4 text-center">You have completed 50% of your habits this week!</p>
      </section>

      <div className="flex justify-center space-x-4">
        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          <PlusCircle className="mr-2" />
          Add New Habit
        </button>
        <button className="flex items-center px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600 transition-colors">
          <Edit className="mr-2" />
          Edit Existing Habit
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
