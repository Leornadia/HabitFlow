import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Checkin: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Check-in</h1>

      <form className="card">
        <h2 className="text-2xl font-semibold mb-4">Today's Check-in</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Habit Name</label>
            <input type="text" className="w-full border rounded px-4 py-2" placeholder="Enter habit name" />
          </div>
          <div>
            <label className="block mb-2">Status</label>
            <div className="flex space-x-4">
              <button type="button" className="btn btn-primary flex items-center">
                <CheckCircle size={20} className="mr-2" />
                Completed
              </button>
              <button type="button" className="btn bg-gray-500 hover:bg-gray-600 flex items-center">
                <XCircle size={20} className="mr-2" />
                Not Completed
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-2">Notes</label>
            <textarea className="w-full border rounded px-4 py-2" rows={4} placeholder="Add any notes or comments"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Check-in</button>
        </div>
      </form>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Check-in History</h2>
        <ul className="space-y-4">
          {[
            { date: '2023-03-15', habit: 'Read 30 minutes', status: 'Completed' },
            { date: '2023-03-14', habit: 'Exercise', status: 'Not Completed' },
            { date: '2023-03-13', habit: 'Meditate', status: 'Completed' },
          ].map((checkin, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{checkin.habit}</span>
                <span className="text-sm text-gray-600 ml-2">({checkin.date})</span>
              </div>
              <span className={`px-2 py-1 rounded ${
                checkin.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}>
                {checkin.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Checkin;
