// Stripe integration utilities
export const createCheckoutSession = async (productId: string, productTitle: string) => {
  // For demo purposes, we'll simulate the Stripe checkout flow
  // In a real implementation, this would call your backend API
  
  try {
    // Directly simulate a successful purchase for demo purposes
    return await simulateSuccessfulPurchase(productId, productTitle);
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
};

// Simulate a successful purchase for demo purposes
const simulateSuccessfulPurchase = (productId: string, productTitle: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ticketId = generateTicketId();
      const ticket = {
        id: ticketId,
        purchaseId: `purchase_${Date.now()}`,
        createdAt: new Date().toISOString(),
        prize: '$5,000 Cash',
        drawDate: getNextDrawDate(),
      };
      
      resolve({ ticket, productTitle });
    }, 2000); // Simulate network delay
  });
};

const generateTicketId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getNextDrawDate = (): string => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return nextWeek.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};