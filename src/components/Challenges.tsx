import React from 'react';
import { PlusCircle, Trophy } from 'lucide-react';

const Challenges: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Challenges</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Challenges</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">30-Day Meditation Challenge</p>
              <p className="text-sm text-gray-600">Meditate for 10 minutes daily</p>
              <p className="text-sm text-gray-600">Start: May 1, 2023 | End: May 30, 2023</p>
            </div>
            <Trophy className="text-yellow-500" />
          </li>
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Read 5 Books in a Month</p>
              <p className="text-sm text-gray-600">Complete 5 books by the end of the month</p>
              <p className="text-sm text-gray-600">Start: May 1, 2023 | End: May 31, 2023</p>
            </div>
            <Trophy className="text-yellow-500" />
          </li>
        </ul>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          <PlusCircle className="mr-2" />
          Create New Challenge
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Challenge History</h2>
        <ul className="space-y-4">
          <li>
            <p className="font-medium">7-Day Gratitude Journal</p>
            <p className="text-sm text-gray-600">Write 3 things you're grateful for each day</p>
            <p className="text-sm text-gray-600">April 1, 2023 - April 7, 2023</p>
            <p className="text-sm font-medium text-green-600">Completed</p>
          </li>
          <li>
            <p className="font-medium">14-Day No Sugar Challenge</p>
            <p className="text-sm text-gray-600">Avoid added sugars for two weeks</p>
            <p className="text-sm text-gray-600">March 15, 2023 - March 28, 2023</p>
            <p className="text-sm font-medium text-red-600">Incomplete</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Challenges;
