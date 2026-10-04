// services/user.services.ts

import { fetchAllPages } from "./pagination";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  whatsapp?: string | null;
  phoneNumber?: string | null;
  whatsappNumber?: string | null;
  phone_number?: string | null;
  whatsapp_number?: string | null;
  profile?: {
    phone?: string | null;
    whatsapp?: string | null;
    phoneNumber?: string | null;
    whatsappNumber?: string | null;
    phone_number?: string | null;
    whatsapp_number?: string | null;
  } | null;
  role: string;
  createdAt: string;
  totalRegistrations: number;
}

export const getUsers = (): Promise<AdminUser[]> =>
  fetchAllPages<AdminUser>("/admin/users", "users");
