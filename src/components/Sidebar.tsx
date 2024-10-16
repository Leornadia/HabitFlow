import React from 'react';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentPage }) => {
  const menuItems = ['Dashboard', 'Journal', 'Check-ins', 'Quotes', 'Streaks', 'Challenges'];

  return (
    <aside className="w-64 bg-brown-100 h-screen p-4 flex flex-col">
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item} className="mb-2">
              <button
                onClick={() => setCurrentPage(item)}
                className="w-full text-left p-2 rounded hover:bg-brown-200 transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className="flex items-center p-2 rounded hover:bg-brown-200 transition-colors">
        <LogOut className="mr-2" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
