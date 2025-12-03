"use client";

import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "@/store/slices/cart-slice";

export function Header() {
  const totalItems = useSelector(selectCartTotalItems);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold sm:inline-block">My App</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/docs"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 justify-end items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
