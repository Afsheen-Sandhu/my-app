import axiosInstance from "@/lib/axios/axios";
import { ApiResponse, User } from "@/types";

export const userService = {
  async getUser(id: string): Promise<ApiResponse<User>> {
    return axiosInstance.get(`/users/${id}`);
  },

  async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    return axiosInstance.put(`/users/${id}`, data);
  },

  async createUser(data: Omit<User, "id">): Promise<ApiResponse<User>> {
    return axiosInstance.post("/users", data);
  },

  async deleteUser(id: string): Promise<void> {
    return axiosInstance.delete(`/users/${id}`);
  },

  async listUsers(): Promise<ApiResponse<User[]>> {
    return axiosInstance.get("/users");
  },
};
