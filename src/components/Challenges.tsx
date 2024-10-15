import React from 'react';
import { Trophy, PlusCircle } from 'lucide-react';

const Challenges: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Challenges</h1>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Current Challenges</h2>
        <ul className="space-y-4">
          {[
            { name: "30-Day Meditation", description: "Meditate for 10 minutes every day", start: "2023-03-01", end: "2023-03-30" },
            { name: "Read 5 Books", description: "Read 5 books in the next 2 months", start: "2023-03-15", end: "2023-05-15" },
          ].map((challenge, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{challenge.name}</h3>
                <p className="text-sm text-gray-600">{challenge.description}</p>
                <p className="text-xs text-gray-500">{challenge.start} to {challenge.end}</p>
              </div>
              <Trophy size={24} className="text-yellow-500" />
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-primary flex items-center mx-auto">
        <PlusCircle size={20} className="mr-2" />
        Create New Challenge
      </button>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Challenge History</h2>
        <ul className="space-y-4">
          {[
            { name: "Learn a New Language", description: "Complete 30 lessons in Duolingo", end: "2023-02-28", status: "Completed" },
            { name: "No Sugar Month", description: "Avoid added sugars for 30 days", end: "2023-01-31", status: "Failed" },
          ].map((challenge, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{challenge.name}</h3>
                <p className="text-sm text-gray-600">{challenge.description}</p>
                <p className="text-xs text-gray-500">Ended on: {challenge.end}</p>
              </div>
              <span className={`px-2 py-1 rounded ${
                challenge.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}>
                {challenge.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Challenges;
