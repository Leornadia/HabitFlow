import React from 'react';
import { Zap } from 'lucide-react';

const Streaks: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Streaks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Current Streak</h2>
          <div className="flex items-center justify-center space-x-4">
            <Zap size={48} className="text-yellow-500" />
            <span className="text-4xl font-bold">7 days</span>
          </div>
          <p className="text-center mt-4">Keep it up! You're on a roll!</p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Longest Streak</h2>
          <div className="flex items-center justify-center space-x-4">
            <Zap size={48} className="text-yellow-500" />
            <span className="text-4xl font-bold">21 days</span>
          </div>
          <p className="text-center mt-4">Your personal best!</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Streak History</h2>
        <ul className="space-y-4">
          {[
            { start: '2023-02-01', end: '2023-02-21', length: 21 },
            { start: '2023-01-15', end: '2023-01-30', length: 16 },
            { start: '2023-01-01', end: '2023-01-10', length: 10 },
          ].map((streak, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{streak.start} to {streak.end}</span>
              </div>
              <span className="flex items-center">
                <Zap size={20} className="text-yellow-500 mr-2" />
                {streak.length} days
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Streaks;
