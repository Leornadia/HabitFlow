import React from 'react';
import { Heart } from 'lucide-react';

const Quotes: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Quotes</h1>

      <div className="card text-center">
        <h2 className="text-2xl font-semibold mb-4">Quote of the Day</h2>
        <blockquote className="text-xl italic">
          "The secret of getting ahead is getting started."
        </blockquote>
        <p className="mt-2 text-gray-600">- Mark Twain</p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Quotes Library</h2>
        <ul className="space-y-4">
          {[
            { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
          ].map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="italic">"{item.quote}"</p>
                <p className="text-sm text-gray-600">- {item.author}</p>
              </div>
              <button className="text-red-500 hover:text-red-600">
                <Heart size={24} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Favorite Quotes</h2>
        <ul className="space-y-4">
          {[
            { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
            { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
          ].map((item, index) => (
            <li key={index}>
              <p className="italic">"{item.quote}"</p>
              <p className="text-sm text-gray-600">- {item.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quotes;
