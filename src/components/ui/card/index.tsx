import React from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  id: number;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  price,
  id,
  onClick,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick
    dispatch(addToCart({ id, title, price, image }));
  };

  return (
    <div
      className="bg-base rounded-xl shadow-md border border-base p-4 w-64 h-80 flex flex-col hover:shadow-lg cursor-pointer relative group"
      onClick={onClick}
    >
      <button
        onClick={handleAddToCart}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2"
        aria-label="Add to cart"
      >
        <ShoppingCart className="h-6 w-6" />
      </button>
      <div className="w-full aspect-square hover:transform hover:scale-105 transition-transform duration-300 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain rounded-lg"
          loading="lazy"
        />
      </div>
      <h3 className="text-md font-semibold mb-1 truncate w-full text-center text-base-foreground">
        {title}
      </h3>
      {/* <p className="text-xs text-muted-foreground mb-2 line-clamp-2 text-center">{description}</p> */}
      <div className="mt-auto flex justify-center">
        <span className="text-lg font-bold text-primary">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
