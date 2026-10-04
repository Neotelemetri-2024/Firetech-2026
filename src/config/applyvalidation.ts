import type { Category } from "../types/applysevent";

// Field yang wajib diisi (key form data) untuk setiap step pada tiap kategori.
// Step index dimulai dari 1.
export const requiredFieldsConfig: Record<
  Category,
  Record<number, string[]>
> = {
  Hackathon: {
    1: ["namaTeam", "namaKetua", "asalInstitusi"],
    2: ["anggota1", "anggota2", "anggota3", "ktm"],
  },
  "UI/UX": {
    1: ["namaTeam", "namaKetua", "asalInstitusi"],
    2: ["anggota1", "ktm"],
    3: ["paymentProof"],
  },
  "E-Football": {
    1: ["namaPemain", "asalInstitusi"],
    2: ["paymentProof"],
  },
};

// Label ramah untuk setiap field, dipakai saat menyusun pesan notifikasi.
export const fieldLabels: Record<string, string> = {
  namaTeam: "Nama Tim",
  namaKetua: "Nama Ketua Tim",
  asalInstitusi: "Universitas / Institusi Asal",
  anggota1: "Nama Anggota 1",
  anggota2: "Nama Anggota 2",
  anggota3: "Nama Anggota 3",
  anggota4: "Nama Anggota 4",
  ktm: "Kartu Identitas Mahasiswa (KTM)",
  namaPemain: "Nama Pemain",
  portofolioUrl: "Link (Figma)",
  namaAnggota: "Name Anggota",

  paymentProof: "Payment Proof",
};

type FormValue = string | File | null;

// Ambil daftar field wajib yang belum diisi pada step tertentu.
export function getMissingFields(
  category: Category,
  step: number,
  formData: Record<string, FormValue>,
): string[] {
  const requiredFields = requiredFieldsConfig[category][step] ?? [];

  return requiredFields.filter((field) => {
    const value = formData[field];
    if (typeof value === "string") return value.trim() === "";
    if (value instanceof File) return false; // File sudah terupload
    return value === null || value === undefined;
  });
}

// Cek apakah semua field wajib pada step tertentu sudah terisi.
export function validateStep(
  category: Category,
  step: number,
  formData: Record<string, FormValue>,
): boolean {
  return getMissingFields(category, step, formData).length === 0;
}
