import React from 'react';
import { Heart } from 'lucide-react';

const Quotes: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Quotes</h1>

      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Quote of the Day</h2>
        <blockquote className="text-xl italic">
          "The secret of getting ahead is getting started."
        </blockquote>
        <p className="mt-2 text-gray-600">- Mark Twain</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Quotes Library</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <div>
              <p className="italic">"The only way to do great work is to love what you do."</p>
              <p className="text-sm text-gray-600">- Steve Jobs</p>
            </div>
            <button className="text-red-500 hover:text-red-600">
              <Heart />
            </button>
          </li>
          <li className="flex justify-between items-center">
            <div>
              <p className="italic">"Believe you can and you're halfway there."</p>
              <p className="text-sm text-gray-600">- Theodore Roosevelt</p>
            </div>
            <button className="text-red-500 hover:text-red-600">
              <Heart />
            </button>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Favorite Quotes</h2>
        <ul className="space-y-4">
          <li>
            <p className="italic">"The future belongs to those who believe in the beauty of their dreams."</p>
            <p className="text-sm text-gray-600">- Eleanor Roosevelt</p>
          </li>
          <li>
            <p className="italic">"Success is not final, failure is not fatal: it is the courage to continue that counts."</p>
            <p className="text-sm text-gray-600">- Winston Churchill</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Quotes;
