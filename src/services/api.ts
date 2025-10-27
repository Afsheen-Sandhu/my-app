import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./CustomBaseQuery";

// ✅ Generic API slice using your custom axios base query
export const apiSlice = createApi({
  reducerPath: "api", // keep it general
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // your backend base URL
  }),
  tagTypes: ["User", "Product", "Post"], // optional: add your app tags
  endpoints: (builder) => ({
    // Example: Fetch a list of items (replace with your actual endpoint)
    getData: builder.query<unknown, string>({
      query: (endpoint) => ({
        url: `/${endpoint}`,
        method: "get",
      }),
    }),

    // Example: Post data to any endpoint
    postData: builder.mutation<unknown, { endpoint: string; body: unknown }>({
      query: ({ endpoint, body }) => ({
        url: `/${endpoint}`,
        method: "post",
        data: body,
      }),
    }),

    // Example: Update data
    updateData: builder.mutation<
      unknown,
      { endpoint: string; id: string | number; body: unknown }
    >({
      query: ({ endpoint, id, body }) => ({
        url: `/${endpoint}/${id}`,
        method: "put",
        data: body,
      }),
    }),

    // Example: Delete data
    deleteData: builder.mutation<
      unknown,
      { endpoint: string; id: string | number }
    >({
      query: ({ endpoint, id }) => ({
        url: `/${endpoint}/${id}`,
        method: "delete",
      }),
    }),
  }),
});

// ✅ Auto-generated hooks
export const {
  useGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
} = apiSlice;
