import React from 'react';
import { Layout, Book, CheckSquare, Quote, Zap, Trophy, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'dashboard', icon: Layout, label: 'Dashboard' },
    { name: 'journal', icon: Book, label: 'Journal' },
    { name: 'checkin', icon: CheckSquare, label: 'Check-in' },
    { name: 'quotes', icon: Quote, label: 'Quotes' },
    { name: 'streaks', icon: Zap, label: 'Streaks' },
    { name: 'challenges', icon: Trophy, label: 'Challenges' },
  ];

  return (
    <aside className="w-64 bg-white h-screen p-4 flex flex-col justify-between">
      <div>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center space-x-2 p-2 w-full text-left mb-2 rounded ${
              activeTab === tab.name ? 'bg-light-peach text-red' : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <tab.icon size={20} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <button className="flex items-center space-x-2 p-2 w-full text-left rounded hover:bg-gray-100">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
