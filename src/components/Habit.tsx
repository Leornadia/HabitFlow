import React, { useState } from 'react';

const Habit = () => {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Inactive');

  const handleAddHabit = () => {
    // Add habit to the list
    alert(`Habit Added: ${habitName} - ${description}`);
  };

  return (
    <div className="habit-form">
      <h2>Add a New Habit</h2>
      <input 
        type="text" 
        placeholder="Habit Name" 
        value={habitName} 
        onChange={(e) => setHabitName(e.target.value)} 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button onClick={handleAddHabit}>Add Habit</button>
    </div>
  );
};

export default Habit;

