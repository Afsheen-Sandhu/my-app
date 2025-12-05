import React from "react";
import { Product } from "@/types/index";
import { Card } from "@/components/ui/card";

interface CardGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({
  products,
  onProductClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          product={product}
          onClick={() => onProductClick?.(product)}
        />
      ))}
    </div>
  );
};
