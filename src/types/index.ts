export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  formats: string[];
  price: number;
  image: string;
}

export interface RaffleTicket {
  id: string;
  purchaseId: string;
  createdAt: string;
  prize: string;
  drawDate: string;
}