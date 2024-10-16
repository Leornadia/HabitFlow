import React, { useState } from 'react';

const CheckIns = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [newCheckIn, setNewCheckIn] = useState({ name: '', status: '', notes: '' });

  const addCheckIn = () => {
    setCheckIns([...checkIns, { ...newCheckIn, date: new Date().toLocaleDateString() }]);
    setNewCheckIn({ name: '', status: '', notes: '' });
  };

  return (
    <div>
      <h2>Check-Ins</h2>
      <div className="new-checkin">
        <input
          type="text"
          placeholder="Habit Name"
          value={newCheckIn.name}
          onChange={(e) => setNewCheckIn({ ...newCheckIn, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={newCheckIn.status}
          onChange={(e) => setNewCheckIn({ ...newCheckIn, status: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          value={newCheckIn.notes}
          onChange={(e) => setNewCheckIn({ ...newCheckIn, notes: e.target.value })}
        />
        <button onClick={addCheckIn}>Add Check-In</button>
      </div>
      <div className="checkins">
        {checkIns.map((checkIn, index) => (
          <div key={index} className="checkin">
            <h3>{checkIn.name}</h3>
            <p>{checkIn.date}</p>
            <p>Status: {checkIn.status}</p>
            <p>Notes: {checkIn.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckIns;

