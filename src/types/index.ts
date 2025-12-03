// Types for API responses
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Common application types
export interface User {
  id: string;
  name: string;
  email: string;
}

// Product type
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Route params types
export interface PageParams {
  slug: string;
  id: string;
}
