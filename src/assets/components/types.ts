//types used across components
export type Product = {
  id: number;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
};

export type ApiResponse = {
  products: Product[];
};
