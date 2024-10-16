import React from 'react';
import { Line } from 'react-chartjs-2';

const ProgressChart = () => {
  const data = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Habit Completion',
        data: [1, 2, 1, 3, 4, 2, 1],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>Progress</h2>
      <Line data={data} />
    </div>
  );
};

export default ProgressChart;

