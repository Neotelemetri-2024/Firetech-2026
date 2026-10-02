// services/user.services.ts

import api from "./api";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  totalRegistrations: number;
}

export const getUsers = async (): Promise<AdminUser[]> => {
  const response = await api.get("/admin/users");

  return response.data.data.users;
};
