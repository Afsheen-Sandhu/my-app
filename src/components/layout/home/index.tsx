import React from 'react'
import { useGetProductsQuery } from '@/store/slices/product-slice'
import { CardGrid } from '@/components/ui/card/CardGrid'

export const HomePage = () => {
  const { data, isLoading, error } = useGetProductsQuery()
  return (
    <div>
      {data && <CardGrid products={data} />}
    </div>
  );
};