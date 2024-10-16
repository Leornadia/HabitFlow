import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const CheckIns: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Check-ins</h1>

      <form className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Today's Check-in</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Habit Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Enter habit name" />
          </div>
          <div>
            <label className="block mb-2">Status</label>
            <div className="flex space-x-4">
              <button type="button" className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                <CheckCircle className="mr-2" />
                Completed
              </button>
              <button type="button" className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                <XCircle className="mr-2" />
                Not Completed
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-2">Notes</label>
            <textarea className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500" rows={4} placeholder="Add any notes or comments"></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600 transition-colors">Submit Check-in</button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Check-in History</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Morning Meditation</p>
              <p className="text-sm text-gray-600">May 15, 2023</p>
            </div>
            <span className="px-2 py-1 bg-green-200 text-green-800 rounded">Completed</span>
          </li>
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Evening Reading</p>
              <p className="text-sm text-gray-600">May 14, 2023</p>
            </div>
            <span className="px-2 py-1 bg-red-200 text-red-800 rounded">Not Completed</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CheckIns;
