import React from 'react';

const data = [
  { day: 'Sun', completed: 1 },
  { day: 'Mon', completed: 2 },
  { day: 'Tue', completed: 1 },
  { day: 'Wed', completed: 3 },
  { day: 'Thu', completed: 4 },
  { day: 'Fri', completed: 2 },
  { day: 'Sat', completed: 1 },
];

const ProgressChart: React.FC = () => {
  const maxCompleted = Math.max(...data.map(item => item.completed));

  return (
    <div className="w-full h-64 flex items-end justify-between">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="w-8 bg-blue-500" 
            style={{ 
              height: `${(item.completed / maxCompleted) * 100}%`,
            }}
          ></div>
          <span className="text-xs mt-1">{item.day}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressChart;
