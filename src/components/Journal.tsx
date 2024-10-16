import React, { useState } from 'react';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  const addEntry = () => {
    setEntries([...entries, { ...newEntry, date: new Date().toLocaleDateString() }]);
    setNewEntry({ title: '', content: '' });
  };

  return (
    <div>
      <h2>Journal</h2>
      <div className="new-entry">
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <div className="entries">
        {entries.map((entry, index) => (
          <div key={index} className="entry">
            <h3>{entry.title}</h3>
            <p>{entry.date}</p>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;

