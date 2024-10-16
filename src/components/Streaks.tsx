import React from 'react';
import { Flame } from 'lucide-react';

const Streaks: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Streaks</h1>

      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Current Streak</h2>
        <div className="flex items-center justify-center">
          <Flame className="text-red-500 w-12 h-12 mr-2" />
          <span className="text-4xl font-bold">7 Days</span>
        </div>
        <p className="mt-2 text-gray-600">Keep it up!</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Longest Streaks</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Morning Meditation</p>
              <p className="text-sm text-gray-600">30 days</p>
            </div>
            <Flame className="text-red-500" />
          </li>
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Evening Reading</p>
              <p className="text-sm text-gray-600">21 days</p>
            </div>
            <Flame className="text-red-500" />
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Streak History</h2>
        <ul className="space-y-4">
          <li>
            <p className="font-medium">Morning Meditation</p>
            <p className="text-sm text-gray-600">Start: May 1, 2023 | End: May 30, 2023 | Length: 30 days</p>
          </li>
          <li>
            <p className="font-medium">Evening Reading</p>
            <p className="text-sm text-gray-600">Start: April 10, 2023 | End: April 30, 2023 | Length: 21 days</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Streaks;
