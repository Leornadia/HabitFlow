import React from 'react';

const Habits = () => {
  const habits = [
    { name: 'Morning Meditation', description: '15 minutes of mindfulness', status: 'Active' },
    { name: 'Evening Reading', description: 'Read for 30 minutes before bed', status: 'Inactive' }
  ];

  return (
    <div>
      <h2>Habits</h2>
      {habits.map((habit, index) => (
        <div key={index} className="habit">
          <h3>{habit.name}</h3>
          <p>{habit.description}</p>
          <p>Status: {habit.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Habits;

