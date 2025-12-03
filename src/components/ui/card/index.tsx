import React from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import { selectCartItems } from "@/store/slices/cart-slice";
import { toast } from "react-toastify";

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  id: number;
  category?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  price,
  id,
  category,
  onClick,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick
    const alreadyAdded = cartItems.some((item) => item.id === id);
    if (alreadyAdded) {
      toast.error("Already added to cart");
      return;
    }
    dispatch(addToCart({ id, title, price, image }));
    toast.success("Added to cart!");
  };

  return (
    <div
      className="bg-base rounded-lg sm:rounded-xl shadow-md border border-base p-3 sm:p-4 w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[420px] flex flex-col hover:shadow-lg cursor-pointer relative group transition-all duration-300"
      onClick={onClick}
    >
      <button
        onClick={handleAddToCart}
        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 bg-base-100 border border-base-300 rounded-full p-1 sm:p-1.5 shadow hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 group/cart-btn z-10 text-base-content"
        aria-label="Add to cart"
        tabIndex={0}
      >
        <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>
      <div className="w-full aspect-square hover:transform hover:scale-105 transition-transform duration-300 rounded-md sm:rounded-lg mb-2 sm:mb-3 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain rounded-md sm:rounded-lg"
          loading="lazy"
        />
      </div>
      <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1 w-full text-center text-base-foreground line-clamp-2">
        {title}
      </h3>
      {category && (
        <p className="text-xs text-muted-foreground mb-2 text-center capitalize">
          {category}
        </p>
      )}
      <div className="mt-auto flex justify-center">
        <span className="text-base sm:text-lg font-bold text-primary">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
