"use client";

import { ThemeToggle } from "@/components/ui/theme";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "@/store/slices/cart-slice";
import { useDispatch } from "react-redux";
import { openSearch } from "@/store/slices/search-slice";
import { Search } from "lucide-react";
import { SearchOverlay } from "@/components/ui/search";

export function Header() {
  const totalItems = useSelector(selectCartTotalItems);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-12 sm:h-14 items-center px-2 sm:px-4">
        <div className="mr-2 sm:mr-4 flex flex-col sm:flex-row">
          <Link
            className="mr-3 sm:mr-6 flex items-center space-x-2 py-1"
            href="/"
          >
            <span className="font-bold text-sm sm:text-base text-primary">
              My App
            </span>
          </Link>
          <nav className="hidden sm:flex items-center space-x-4 md:space-x-6 text-xs md:text-sm font-medium">
            <Link
              href="#"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 justify-end items-center space-x-1 sm:space-x-4">
          <Link
            href="/cart"
            className="relative p-1.5 sm:p-2 rounded-full hover:bg-base-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-base-content" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white  rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold text-xs">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => dispatch(openSearch())}
            className="relative p-1.5 sm:p-2 rounded-full hover:bg-base-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Search"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-base-content" />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <SearchOverlay />
    </header>
  );
}
