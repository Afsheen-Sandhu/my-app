// src/services/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosBaseQuery } from "@/lib/services/AxiosBaseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: AxiosBaseQuery(),
  tagTypes: ["User", "Product", "Post"],
  endpoints: () => ({}),
});
