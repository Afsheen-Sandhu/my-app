import axiosInstance from "@/lib/axios/AxiosInstance";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";

// ✅ Define a generic type for error responses
interface AxiosBaseQueryError {
  status?: number;
  data?: unknown;
  message?: string;
}

// ✅ Updated version that accepts baseUrl argument
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = {} // optional parameter
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl ? `${baseUrl}${url}` : url, // prepend baseUrl if provided
        method,
        data,
        params,
      });

      // ✅ axiosInstance interceptor already returns response.data
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        },
      };
    }
  };
