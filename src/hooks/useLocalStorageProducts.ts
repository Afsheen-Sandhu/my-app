import { useState, useEffect } from 'react';
import { Product } from '@/types/index';

const STORAGE_KEY = 'custom_products';
const INITIALIZED_KEY = 'products_initialized';

export const useLocalStorageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // Check if this is the first time initialization is needed
        const isInitialized = localStorage.getItem(INITIALIZED_KEY);
        if (!isInitialized) {
          localStorage.setItem(INITIALIZED_KEY, 'true');
        }
      }
    } catch (error) {
      console.error('Failed to load products from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        console.error('Failed to save products to localStorage:', error);
      }
    }
  }, [products, isLoaded]);

  const addProduct = (productData: Omit<Product, 'id' | 'rating'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(), // Use timestamp as unique ID
      rating: {
        rate: 5,
        count: 0,
      },
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: number, productData: Omit<Product, 'id' | 'rating'>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, ...productData }
          : product
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
