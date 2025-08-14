//HEAD
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import SuccessModal from './components/SuccessModal';
import Footer from './components/Footer';
import { createCheckoutSession } from './utils/stripe';
import { RaffleTicket } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [raffleTicket, setRaffleTicket] = useState<RaffleTicket | null>(null);
  const [purchasedProduct, setPurchasedProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (productId: string) => {
    setIsLoading(true);
    
    try {
      // Find the product title
      const product = products.find(p => p.id === productId);
      const productTitle = product?.title || 'Unknown Product';
      
      // Create checkout session and process payment
      const result = await createCheckoutSession(productId, productTitle) as any;
      
      // Show success modal with ticket
      setRaffleTicket(result.ticket);
      setPurchasedProduct(result.productTitle);
      setIsModalOpen(true);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRaffleTicket(null);
    setPurchasedProduct('');
  };

  // Import products here to avoid import issues
  const products = [
    {
      id: 'art-of-war',
      title: 'The Art of War',
      description: 'Ancient military strategy & business tactics that built empires',
      category: 'Strategy',
      pages: 96,
      formats: ['PDF', 'EPUB'],
      price: 7,
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    // ... other products would be imported from data file
  ];

  return (
    <div className="min-h-screen bg-background">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-primary font-semibold">Processing your purchase...</p>
            <p className="text-gray-600 text-sm mt-2">Securing your raffle entry</p>
          </div>
        </div>
      )}
      
      <Header />
      <Hero />
      <ProductGrid onPurchase={handlePurchase} />
      <Footer />
      
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ticket={raffleTicket}
        productTitle={purchasedProduct}
      />
    </div>
  );
}

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import OptOut from "./pages/OptOut";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/optout" element={<OptOut />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
//mod3/main
