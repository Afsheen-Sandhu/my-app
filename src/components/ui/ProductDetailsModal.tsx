"use client";

import React from "react";
import { Product } from "@/types/index";
import { Star, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import { selectCartItems } from "@/store/slices/cart-slice";
import { toast } from "react-toastify";
import { Modal } from "@/components/ui/modal/Modal";

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
  const cartItems = useSelector(selectCartItems);

  if (!product) return null;

  const handleAddToCart = () => {
    const alreadyAdded = cartItems.some(item => item.id === product.id);
    if (alreadyAdded) {
      toast.error("Already added to cart");
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    toast.success("Added to cart!");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-4 sm:space-y-6">
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

          {/* Rating */}
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
          </div>

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

          {/* Add to Cart Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
