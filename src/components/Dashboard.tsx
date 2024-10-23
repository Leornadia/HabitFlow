import React, { useState } from 'react';
import { Bell, HelpCircle, LogOut, Moon, Settings, Sun, User } from 'lucide-react';
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ProgressChart from './ProgressChart';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you'd apply the dark mode styles here
  };

  return (
    <div className={`flex h-screen bg-peach-100 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-brown-200 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-red-600 mb-10">HabitFlow</h1>
        <nav className="flex-grow">
          <ul className="space-y-4">
            <li><Button variant="ghost" className="w-full justify-start">Dashboard</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Journal</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Check-in</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Quotes</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Streaks</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Challenges</Button></li>
          </ul>
        </nav>
        <Button variant="ghost" className="mt-auto w-full justify-start"><LogOut className="mr-2" size={18} />Logout</Button>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-8 overflow-auto">
        {/* Top navigation */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost"><HelpCircle size={18} /></Button>
            <Button variant="ghost"><User size={18} /></Button>
            <Button variant="ghost"><Settings size={18} /></Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost"><Bell size={18} /></Button>
            <Button variant="ghost" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </header>

        {/* Hero section */}
        <section className="hero bg-brown-100 text-center p-6 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to HabitFlow, Leornadia!</h1>
          <p className="text-xl">Track your habits and progress. Reach your goals and improve your life.</p>
        </section>

        {/* Dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Morning Meditation - Active</li>
                <li>Daily Exercise - Active</li>
                <li>Reading - Inactive</li>
              </ul>
              <Button className="mt-4">Add new habit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressChart />
              <p className="mt-4">You have completed 50% of your habits this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Journal</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>2023-05-01: Reflections on my progress</li>
                <li>2023-04-28: Overcoming challenges</li>
              </ul>
              <Button className="mt-4">New journal entry</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>30-day Meditation Challenge</li>
                <li>Read 5 books in a month</li>
              </ul>
              <Button className="mt-4">Start new challenge</Button>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <a href="#" className="link mr-4">About</a>
          <a href="#" className="link">Legal Documents</a>
        </footer>
      </main>
    </div>
  );
}
