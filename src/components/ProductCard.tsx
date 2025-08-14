import React from 'react';
import { FileText, Download, Ticket } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPurchase: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:border-gold hover:border-opacity-30">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-gold text-primary px-3 py-1 rounded-full text-xs font-bold">
          {product.category}
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2">
          <Ticket className="w-4 h-4 text-gold" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-xl text-primary mb-2 group-hover:text-gold transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              {product.pages} pages
            </div>
            <div className="flex items-center">
              <Download className="w-3 h-3 mr-1" />
              {product.formats.join(', ')}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            ${product.price}
            <span className="text-sm text-gray-500 font-normal ml-1">+ Raffle Entry</span>
          </div>
          <button
            onClick={() => onPurchase(product.id)}
            className="bg-gold text-primary px-6 py-3 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Buy & Enter Draw
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;