import React, { useState } from "react";
import { useGetProductsQuery } from "@/store/slices/product-slice";
import { CardGrid } from "@/components/layout/products";
import { useSelector } from "react-redux";
import { selectSearchQuery } from "@/store/slices/search-slice";
import { FiltersSidebar, PriceSort } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useLocalStorageProducts } from "@/hooks/useLocalStorageProducts";
import { ProductModal } from "@/components/ui/product";

export const HomePage = () => {
  const { data } = useGetProductsQuery();
  const searchQuery = useSelector(selectSearchQuery);
  const [priceSort, setPriceSort] = useState<PriceSort>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { products: localProducts, addProduct } = useLocalStorageProducts();

  let products = [...(data || []), ...localProducts];

  if (searchQuery && searchQuery.trim().length > 0) {
    const words = searchQuery
      .trim()
      .split(/\s+/)
      .map((w) => w.toLowerCase());
    products = products.filter((product) =>
      words.every((word) => product.title.toLowerCase().includes(word))
    );
  }

  if (priceSort === "low-to-high") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (priceSort === "high-to-low") {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="w-full bg-background text-foreground">
      <div className="container mx-auto px-2 md:px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="w-full md:w-auto md:sticky md:top-24">
            <FiltersSidebar
              priceSort={priceSort}
              onPriceSortChange={setPriceSort}
            />
          </div>
          <div className="flex-1 w-full min-w-0">
            <div className="flex justify-end mb-6">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add New Product
              </Button>
            </div>
            <CardGrid products={products} />
          </div>
        </div>
      </div>
      <ProductModal
        product={null}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode="add"
        onSubmit={(productData) => {
          addProduct(productData);
          toast.success("Product added successfully!");
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};
