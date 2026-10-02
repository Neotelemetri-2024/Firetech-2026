import api from "./api";

/** Batas maksimal `limit` yang diizinkan backend per halaman. */
const PAGE_LIMIT = 100;

/**
 * Mengambil seluruh halaman dari endpoint berpaginasi milik backend.
 *
 * Tanpa ini, daftar admin hanya berisi halaman pertama (20 baris) — padahal
 * halaman admin menggabungkan beberapa daftar di sisi klien, sehingga data yang
 * terpotong membuat pendaftar tampil tanpa pendaftaran dan bukti pembayarannya.
 *
 * @param url endpoint daftar, mis. `/admin/registrations`
 * @param key nama properti daftar di dalam `data`, mis. `registrations`
 */
export async function fetchAllPages<T>(url: string, key: string): Promise<T[]> {
  const items: T[] = [];

  let page = 1;
  let totalPages = 1;

  do {
    const response = await api.get(url, {
      params: { page, limit: PAGE_LIMIT },
    });

    const data = response.data.data;

    items.push(...(data[key] as T[]));
    totalPages = data.pagination.totalPages;
    page += 1;
  } while (page <= totalPages);

  return items;
}
