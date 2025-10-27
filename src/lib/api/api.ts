// src/services/api/api.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/lib/services/axiosBaseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // e.g., https://jsonplaceholder.typicode.com
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});
