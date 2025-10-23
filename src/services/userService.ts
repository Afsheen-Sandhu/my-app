import { API_BASE_URL } from "@/constants";
import { ApiResponse, User } from "@/types";

export const userService = {
  async getUser(id: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
