import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Habits from './Habits';
import ProgressChart from './ProgressChart';

const Dashboard = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6">
      <Navbar />
      <section className="hero bg-light-brown text-center p-6">
        <h1>Welcome to HabitFlow!</h1>
        <p>Track your habit and progress. Reach your goals and improve your life.</p>
      </section>
      <section className="habits mt-6">
        <Habits />
      </section>
      <section className="progress mt-6">
        <ProgressChart />
        <p className="mt-4 text-center">You have completed 50% of your habits this week!</p>
      </section>
      <div className="cta-buttons mt-6 flex justify-center">
        <button className="bg-red-500 text-white p-2 m-2">Add a new habit</button>
        <button className="bg-peach-500 text-white p-2 m-2">Edit existing habit</button>
      </div>
    </div>
  </div>
);

export default Dashboard;

