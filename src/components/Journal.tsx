import React from 'react';
import { PlusCircle, Search } from 'lucide-react';

const Journal: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Journal</h1>

      <div className="flex justify-between items-center">
        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          <PlusCircle className="mr-2" />
          New Entry
        </button>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search entries..."
            className="px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 transition-colors">
            <Search />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Reflections on Mindfulness</h2>
          <p className="text-gray-600 mb-2">May 15, 2023</p>
          <p className="line-clamp-3">Today, I practiced mindfulness for 20 minutes. I noticed that my mind was particularly busy, but I managed to bring my focus back to my breath several times...</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Progress with Reading Habit</h2>
          <p className="text-gray-600 mb-2">May 14, 2023</p>
          <p className="line-clamp-3">I've been consistently reading for 30 minutes before bed for the past week. I'm noticing improvements in my sleep quality and a reduction in screen time...</p>
        </div>
      </div>
    </div>
  );
};

export default Journal;
