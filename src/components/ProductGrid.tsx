import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

interface ProductGridProps {
  onPurchase: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onPurchase }) => {
  return (
    <section id="vault" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
            The Knowledge Vault
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each purchase is a <span className="font-bold text-gold">double win</span>: 
            Instant access to life-changing knowledge <em>plus</em> your ticket to premium prizes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onPurchase={onPurchase}
            />
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-gradient-to-r from-gold from-opacity-10 to-primary to-opacity-5 rounded-2xl border border-gold border-opacity-20">
          <div className="text-center">
            <h3 className="text-2xl font-serif text-primary mb-4">The 45-Day Advantage</h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Every purchase grants you <span className="font-bold">45 days of exclusive access</span> to our 
              ecosystem of aligned platforms, premium content, and winner-only communities. 
              Your journey starts with knowledge, but extends far beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;