"use client";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/store/slices/cart-slice";
import Image from "next/image";

export default function CartPage() {
  const cartItems = useSelector(selectCartItems);

  if (!cartItems.length) {
    return <div className="p-8 text-center text-xl">Your cart is empty.</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={64}
              height={64}
              className="w-16 h-16 object-contain rounded"
            />
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
              </div>
              <div className="text-sm">Quantity: {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
