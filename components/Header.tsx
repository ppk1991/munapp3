
import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showMenu }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
      <h1 className="text-xl font-bold tracking-tight text-blue-600">{title}</h1>
      {showMenu && (
        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </header>
  );
};

export default Header;
