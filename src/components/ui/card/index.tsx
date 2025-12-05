import React from "react";
import Image from "next/image";
import { Product } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface CardProps {
  product: Product;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ product, onClick }) => {
  return (
    <div className="bg-base-100 border border-base-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-base-200">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-base-content mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.rate)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-base-content/30"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-base-content/70">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-primary mb-4">
          ${product.price}
        </div>

        {/* Category */}
        <div className="text-sm text-base-content/70 mb-4">
          {product.category}
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="primary"
        size="sm"
        onClick={onClick}
        className="w-full mt-auto"
      >
        View Details
      </Button>
    </div>
  );
};
