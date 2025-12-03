"use client";

import React from "react";
import { Product } from "@/types/index";
import { X, Star, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full max-h-[90vh] bg-white/90 rounded-2xl shadow-2xl  overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 btn btn-circle btn-ghost btn-sm"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto md:overflow-y-visible max-h-[90vh] md:max-h-none">
          {/* Product Image */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative w-full max-w-sm sm:max-w-md h-64 sm:h-80 rounded-xl overflow-hidden bg-base-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Category */}
            <div className="text-center">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-2xl font-light text-center text-base-content leading-tight px-2">
              {product.title}
            </h2>

            {/* Rating
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-base-content/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-base-content/70">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div> */}

            {/* Price */}
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <div className="max-w-lg mx-auto px-2">
              <p className="text-primary leading-relaxed text-center text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg w-full sm:w-auto sm:px-8"
              >
                Add to Cart
              </button>
              <button className="btn btn-outline btn-lg w-full sm:w-auto sm:px-8">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
