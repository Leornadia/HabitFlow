import React, { useState } from 'react';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');

  const addQuote = () => {
    setQuotes([...quotes, newQuote]);
    setNewQuote('');
  };

  return (
    <div>
      <h2>Quotes</h2>
      <div className="new-quote">
        <textarea
          placeholder="Add a new quote"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <button onClick={addQuote}>Add Quote</button>
      </div>
      <div className="quote-list">
        {quotes.map((quote, index) => (
          <div key={index} className="quote">
            <p>{quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;

