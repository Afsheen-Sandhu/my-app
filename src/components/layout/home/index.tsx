import React from 'react'
import { useGetProductsQuery } from '@/store/slices/product-slice'
import { CardGrid } from '@/components/ui/card/CardGrid'
import { useSelector } from 'react-redux'
import { selectSearchQuery } from '@/store/slices/search-slice'

export const HomePage = () => {
  const { data, isLoading, error } = useGetProductsQuery()
  const searchQuery = useSelector(selectSearchQuery)

  let products = data || [];
  if (searchQuery && searchQuery.trim().length > 0) {
    const words = searchQuery.trim().split(/\s+/).map(w => w.toLowerCase())
    products = products.filter(product =>
      words.every(word => product.title.toLowerCase().includes(word))
    )
  }

  return (
    <div>
      {products && <CardGrid products={products} />}
    </div>
  );
};