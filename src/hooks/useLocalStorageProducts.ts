import { useState, useEffect } from "react";
import { Product } from "@/types/index";

const STORAGE_KEY = "custom_products";
const INITIALIZED_KEY = "products_initialized";

export const useLocalStorageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        const isInitialized = localStorage.getItem(INITIALIZED_KEY);
        if (!isInitialized) {
          localStorage.setItem(INITIALIZED_KEY, "true");
        }
      }
    } catch {
      // Handle error silently or log to a service
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        console.error("Failed to save products to localStorage:", error);
      }
    }
  }, [products, isLoaded]);

  const addProduct = (productData: Omit<Product, "id" | "rating">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      rating: {
        rate: 5,
        count: 0,
      },
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (
    id: number,
    productData: Omit<Product, "id" | "rating">
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...productData } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoaded,
  };
};
