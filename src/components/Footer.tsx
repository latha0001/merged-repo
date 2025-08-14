import React from 'react';
import { Gift, Shield, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-serif lowercase">thetop36</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Premium public domain knowledge meets exclusive prize draws. 
              Every purchase is an investment in your mind and your future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-gold">How It Works</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-gold" />
                Secure $7 purchase via Stripe
              </li>
              <li className="flex items-center">
                <Gift className="w-4 h-4 mr-2 text-gold" />
                Instant download + raffle entry
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gold" />
                45-day ecosystem access
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-gold">Current Prize Pool</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Cash Prize</span>
                <span className="font-bold">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Draw Odds</span>
                <span className="font-bold text-gold">1-in-100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Entries Today</span>
                <span className="font-bold">47/100</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 TheTop36. All knowledge is power. All entries are chances.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;