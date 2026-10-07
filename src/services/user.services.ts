// services/user.services.ts

import { fetchAllPages } from "./pagination";
import api from "./api";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  whatsapp?: string | null;
  phoneNumber?: string | null;
  whatsappNumber?: string | null;
  phone_number?: string | null;
  whatsapp_number?: string | null;
  profile?: { phone?: string | null; whatsapp?: string | null } | null;
  role: string;
  createdAt: string;
  updatedAt?: string;
  totalRegistrations: number;
}

export const getUsers = (): Promise<AdminUser[]> =>
  fetchAllPages<AdminUser>("/admin/users", "users");

const PHONE_FIELD_PATTERN = /phone|whats?app|mobile|telephone|telp|telepon|no\s*[_-]?\s*hp|cell/i;

const isPhoneNumber = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
};

/** Cari nomor pada berbagai nama field dan objek profil yang mungkin dibungkus backend. */
export const findPhoneNumber = (...sources: unknown[]): string => {
  const seen = new Set<object>();
  const scan = (value: unknown, depth: number): string => {
    if (!value || typeof value !== "object" || depth > 6 || seen.has(value)) {
      return "";
    }
    seen.add(value);

    const entries = Array.isArray(value)
      ? value.map((item, index) => [String(index), item] as const)
      : Object.entries(value as Record<string, unknown>);

    for (const [key, item] of entries) {
      if (PHONE_FIELD_PATTERN.test(key) && isPhoneNumber(item)) return item;
    }
    for (const [, item] of entries) {
      const result = scan(item, depth + 1);
      if (result) return result;
    }
    return "";
  };

  for (const source of sources) {
    const result = scan(source, 0);
    if (result) return result;
  }
  return "";
};

export const getUserById = async (userId: number): Promise<AdminUser> => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data.data;
};
