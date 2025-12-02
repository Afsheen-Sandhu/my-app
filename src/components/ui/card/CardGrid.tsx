import React from 'react';
import { Card } from './index';

interface Product {
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

interface CardGridProps {
  products: Product[];
}

export const CardGrid: React.FC<CardGridProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <Card
        key={product.id}
        image={product.image}
        title={product.title}
        description={product.description}
        price={product.price}
      />
    ))}
  </div>
);
