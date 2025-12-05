import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsSearchOpen,
  closeSearch,
  setQuery,
} from "@/store/slices/search-slice";
import { useGetProductsQuery } from "@/store/slices/product-slice";
import { Input } from "@/components/ui/input/Input";
import { X } from "lucide-react";

export const SearchOverlay = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsSearchOpen);
  const { data, isLoading } = useGetProductsQuery();
  const [queryValue, setQueryValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setQueryValue("");
    dispatch(closeSearch());
  }, [dispatch]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQueryValue(value);
    dispatch(setQuery(value));
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      setTimeout(() => inputRef.current?.focus(), 20);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  // Close on Enter key while focusing the input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-32">
      <div
        ref={containerRef}
        className="bg-base-100 text-base-content rounded-xl shadow-lg max-w-2xl w-full p-6 min-h-[100px] relative border border-base-300"
      >
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 p-2 rounded-full hover:bg-base-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 text-base-content"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>
        <Input
          ref={inputRef}
          value={queryValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Search products by title..."
          className="mb-2"
          aria-label="Search products"
        />
      </div>
    </div>
  );
};
