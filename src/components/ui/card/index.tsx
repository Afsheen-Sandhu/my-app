import React from "react";
import Image from "next/image";
import { Product } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Star, Tag, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import { selectCartItems } from "@/store/slices/cart-slice";
import { toast } from "react-toastify";

interface CardProps {
  product: Product;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ product, onClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleAddToCart = () => {
    const alreadyAdded = cartItems.some((item) => item.id === product.id);
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
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-base-100 to-base-200 border border-base-300 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-5 flex flex-col h-full group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-base-200 to-base-300 group-hover:shadow-md transition-shadow duration-300">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
        />
        {/* Cart Icon Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-primary hover:text-secondary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-base-content mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
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
          <span className="text-sm text-base-content/70 font-medium">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-200">
          ${product.price}
        </div>
      </div>
    </div>
  );
};
