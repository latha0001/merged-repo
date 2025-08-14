import React from 'react';
import { Gift } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-4 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-gold opacity-10"></div>
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-serif lowercase tracking-tight">thetop36</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <span className="bg-gold text-primary px-3 py-1 rounded-full font-semibold">
            Live Draw: 100 Entries
          </span>
          <span className="text-gold font-medium">Current Prize: $5,000 Cash</span>
        </div>
      </div>
    </header>
  );
};

export default Header;