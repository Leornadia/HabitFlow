import React, { useState } from 'react';

interface Habit {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const HabitManager: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { name: 'Morning Meditation', description: '15 minutes of mindfulness', status: 'Active' },
    { name: 'Evening Reading', description: 'Read for 30 minutes before bed', status: 'Inactive' }
  ]);

  const [newHabit, setNewHabit] = useState<Habit>({
    name: '',
    description: '',
    status: 'Inactive'
  });

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

  return (
    <div className="habit-manager">
      <h2 className="text-2xl font-bold mb-4">Habit Manager</h2>
      
      <div className="habit-form mb-8">
        <h3 className="text-xl font-semibold mb-2">Add a New Habit</h3>
        <input
          type="text"
          name="name"
          placeholder="Habit Name"
          value={newHabit.name}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newHabit.description}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <select 
          name="status"
          value={newHabit.status} 
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button 
          onClick={handleAddHabit}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Habit
        </button>
      </div>

      <div className="habits-list">
        <h3 className="text-xl font-semibold mb-2">Your Habits</h3>
        {habits.map((habit, index) => (
          <div key={index} className="habit bg-white p-4 mb-4 rounded shadow">
            <h4 className="text-lg font-semibold">{habit.name}</h4>
            <p className="text-gray-600">{habit.description}</p>
            <p className={`mt-2 ${habit.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {habit.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitManager;
