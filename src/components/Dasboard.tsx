import React, { useState } from 'react';
import { PlusCircle, Edit, BarChart2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [habits, setHabits] = useState([
    { name: 'Read 30 minutes', description: 'Daily habit to improve focus', status: 'active' },
    { name: 'Exercise', description: 'Stay fit and healthy', status: 'active' },
    { name: 'Meditate', description: 'Reduce stress and improve mindfulness', status: 'inactive' },
  ]);

  return (
    <div className="space-y-8">
      <section className="text-center bg-light-peach rounded-lg p-8 shadow-md">
        <h1 className="text-4xl font-bold mb-4">Welcome to HabitFlow!</h1>
        <p className="text-xl mb-2">Track your habits and progress</p>
        <p className="text-lg">Reach your goals and improve your life</p>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4">Your Habits</h2>
        <ul className="space-y-4">
          {habits.map((habit, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{habit.name}</h3>
                <p className="text-sm text-gray-600">{habit.description}</p>
              </div>
              <span className={`px-2 py-1 rounded ${
                habit.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}>
                {habit.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4">Progress</h2>
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <BarChart2 size={48} className="text-red-500" />
        </div>
        <p className="mt-4 text-center">You have completed 50% of your habits this week!</p>
      </section>

      <div className="flex justify-center space-x-4">
        <button className="btn btn-primary flex items-center" onClick={() => alert('Add new habit functionality to be implemented')}>
          <PlusCircle size={20} className="mr-2" />
          Add New Habit
        </button>
        <button className="btn btn-primary flex items-center" onClick={() => alert('Edit habit functionality to be implemented')}>
          <Edit size={20} className="mr-2" />
          Edit Existing Habit
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
