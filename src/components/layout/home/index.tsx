import React, { useState } from 'react'
import { useGetProductsQuery } from '@/store/slices/product-slice'
import { CardGrid } from '@/components/layout/products'
import { useSelector } from 'react-redux'
import { selectSearchQuery } from '@/store/slices/search-slice'
import { FiltersSidebar, PriceSort } from '@/components/ui/sidebar'
import { ProductModal } from '@/components/ui/product'
import { toast } from 'react-toastify'

export const HomePage = () => {
  const { data, isLoading, error } = useGetProductsQuery()
  const searchQuery = useSelector(selectSearchQuery)
  const [priceSort, setPriceSort] = useState<PriceSort>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  let products = data || [];
  if (searchQuery && searchQuery.trim().length > 0) {
    const words = searchQuery.trim().split(/\s+/).map(w => w.toLowerCase())
    products = products.filter(product =>
      words.every(word => product.title.toLowerCase().includes(word))
    )
  }
  if (priceSort === 'low-to-high') {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (priceSort === 'high-to-low') {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start w-full px-2 md:px-0">
        <div className="w-full md:w-auto md:min-w-[250px]">
          <FiltersSidebar priceSort={priceSort} onPriceSortChange={setPriceSort} />
        </div>
        <div className="flex-1 w-full">
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium shadow hover:bg-primary/90 transition-colors"
            >
              + Add New Product
            </button>
          </div>
          <CardGrid products={products} />
        </div>
      </div>
      <ProductModal
        product={null}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode="add"
        onSubmit={() => {
          toast.success('Product submitted (demo only)');
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};