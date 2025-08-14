import React from 'react';
import { X, Ticket, Gift, Calendar, CheckCircle } from 'lucide-react';
import { RaffleTicket } from '../types';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: RaffleTicket | null;
  productTitle: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, ticket, productTitle }) => {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full relative overflow-hidden animate-ticket">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="bg-gradient-to-br from-gold to-yellow-400 p-8 text-primary relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="w-full h-full bg-repeat" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")` 
            }}></div>
          </div>
          <div className="relative z-10 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">You're In!</h2>
            <p className="text-sm opacity-90">Purchase confirmed + Raffle entry secured</p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-primary mb-2">{productTitle}</h3>
            <p className="text-gray-600 text-sm">Your digital download will arrive via email within 5 minutes</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-dashed border-gold border-opacity-30">
            <div className="flex items-center justify-center mb-4">
              <Ticket className="w-8 h-8 text-gold" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Your Raffle Ticket</p>
              <p className="text-2xl font-bold text-primary font-mono">{ticket.id}</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gold from-opacity-10 to-transparent rounded-lg">
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-gold mr-3" />
                <span className="font-semibold text-primary">Current Prize</span>
              </div>
              <span className="font-bold text-gold">{ticket.prize}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Draw Date</span>
              </div>
              <span className="font-semibold text-primary">{ticket.drawDate}</span>
            </div>
          </div>
          
          <div className="bg-primary text-white p-4 rounded-lg text-center">
            <p className="text-sm mb-2">🎯 <strong>45-Day Ecosystem Access</strong> Activated</p>
            <p className="text-xs opacity-90">You're now enrolled across our premium platforms</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-6 bg-gold text-primary py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;