// services/user.services.ts

import { fetchAllPages } from "./pagination";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  totalRegistrations: number;
}

export const getUsers = (): Promise<AdminUser[]> =>
  fetchAllPages<AdminUser>("/admin/users", "users");
