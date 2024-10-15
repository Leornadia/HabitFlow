import React from 'react';
import { PlusCircle, Search } from 'lucide-react';

const Journal: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Journal</h1>

      <div className="flex justify-between items-center">
        <button className="btn btn-primary flex items-center">
          <PlusCircle size={20} className="mr-2" />
          New Entry
        </button>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search entries..."
            className="border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-r">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { date: '2023-03-15', title: 'Productive Day', content: 'Today was incredibly productive...' },
          { date: '2023-03-14', title: 'New Habit Formed', content: 'I successfully formed a new habit of...' },
          { date: '2023-03-13', title: 'Overcoming Challenges', content: 'I faced some challenges today but...' },
        ].map((entry, index) => (
          <div key={index} className="card">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{entry.title}</h3>
              <span className="text-sm text-gray-600">{entry.date}</span>
            </div>
            <p className="text-gray-700">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
