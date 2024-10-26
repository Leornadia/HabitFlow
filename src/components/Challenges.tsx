import React, { useState } from 'react';
import { PlusCircle, Trophy } from 'lucide-react';

interface Challenge {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Current' | 'Completed' | 'Incomplete';
}

const initialChallenges: Challenge[] = [
  {
    name: '30-Day Meditation Challenge',
    description: 'Meditate for 10 minutes daily',
    startDate: '2023-05-01',
    endDate: '2023-05-30',
    status: 'Current',
  },
  {
    name: 'Read 5 Books in a Month',
    description: 'Complete 5 books by the end of the month',
    startDate: '2023-05-01',
    endDate: '2023-05-31',
    status: 'Current',
  },
];

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);

  const [newChallenge, setNewChallenge] = useState<Challenge>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Current',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewChallenge(prev => ({ ...prev, [name]: value }));
  };

  const handleAddChallenge = () => {
    if (newChallenge.name && newChallenge.description && newChallenge.startDate && newChallenge.endDate) {
      setChallenges(prev => [...prev, newChallenge]);
      setNewChallenge({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Current',
      });
      setShowNewChallengeForm(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Challenges</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Challenges</h2>
        <ul className="space-y-4">
          {challenges.map((challenge, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{challenge.name}</p>
                <p className="text-sm text-gray-600">{challenge.description}</p>
                <p className="text-sm text-gray-600">Start: {challenge.startDate} | End: {challenge.endDate}</p>
              </div>
              <Trophy className="text-yellow-500" />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowNewChallengeForm(true)}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <PlusCircle className="mr-2" />
          Create New Challenge
        </button>
      </div>

      {showNewChallengeForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Create New Challenge</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddChallenge(); }} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Challenge Name"
              value={newChallenge.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Challenge Description"
              value={newChallenge.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={newChallenge.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={newChallenge.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Challenge
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Challenges;
