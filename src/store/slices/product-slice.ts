import { apiSlice } from "@/store/slices/api-slice";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}
  export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product, void>({
            query: () => ({
                url: "https://fakestoreapi.com/products",
                method: "get",
            }),
        }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productApi;
 