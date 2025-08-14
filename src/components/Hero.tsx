import React from 'react';
import { Sparkles, Target, Trophy } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-background to-white py-20 px-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-gold opacity-10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary opacity-5 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center bg-gold bg-opacity-10 text-primary px-6 py-2 rounded-full mb-8 border border-gold border-opacity-20">
          <Sparkles className="w-4 h-4 mr-2 text-gold" />
          <span className="text-sm font-semibold">Exclusive Digital Vault • Premium Knowledge • Instant Win</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-serif text-primary mb-6 leading-tight">
          <span className="block">Buy.</span>
          <span className="block text-gold">Read.</span>
          <span className="block">Win.</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Access rare public domain treasures for just <span className="font-bold text-gold">$7</span> each. 
          Every purchase unlocks premium knowledge <em>and</em> enters you to win 
          <span className="font-bold text-primary"> life-changing prizes</span>.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Curated Vault</h3>
            <p className="text-gray-600 text-sm">Hand-picked knowledge bombs worth thousands</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-semibold text-primary mb-2">1-in-100 Odds</h3>
            <p className="text-gray-600 text-sm">Real chances to win premium lifestyle prizes</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-semibold text-primary mb-2">45-Day Access</h3>
            <p className="text-gray-600 text-sm">Exclusive ecosystem membership included</p>
          </div>
        </div>
        
        <a 
          href="#vault" 
          className="inline-block bg-gold text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 animate-glow"
        >
          Enter the Vault →
        </a>
      </div>
    </section>
  );
};

export default Hero;