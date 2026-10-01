import type { Category } from "../types/applysevent";

// Field yang wajib diisi (key form data) untuk setiap step pada tiap kategori.
// Step index dimulai dari 1.
export const requiredFieldsConfig: Record<Category, Record<number, string[]>> = {
  Hackathon: {
    1: ["namaTeam", "namaKetua", "asalInstitusi"],
    2: ["anggota1", "anggota2", "ktm"],
    3: ["paymentProof"],
  },
  "UI/UX": {
    1: ["namaPemain", "asalInstitusi"],
    2: ["paymentProof"],
    //3: ["portofolioUrl"],
  },
  "E-Football": {
    1: ["namaPemain", "idGame", "asalInstitusi"],
    2: ["paymentProof"],
  },
  //"Informatics Olympiad": {
  //1: ["namaKetua", "asalSekolah"],
  //2: ["namaAnggota", "ktm"],
  //3: ["paymentProof"],
  //},
};

// Label ramah untuk setiap field, dipakai saat menyusun pesan notifikasi.
export const fieldLabels: Record<string, string> = {
  namaTeam: "Team Name",
  namaKetua: "Leader Name",
  asalInstitusi: "University of Origin",
  anggota1: "Member 1 Name",
  anggota2: "Member 2 Name",
  anggota3: "Member 3 Name",
  anggota4: "Member 4 Name",
  ktm: "Student ID Card (KTM)",
  namaPemain: "Player Name",
  idGame: "ID Game eFootball",
  portofolioUrl: "Link (Figma)",
  namaAnggota: "Member Name",

  paymentProof: "Payment Proof",
};

type FormValue = string | File | null;

// Ambil daftar field wajib yang belum diisi pada step tertentu.
export function getMissingFields(
  category: Category,
  step: number,
  formData: Record<string, FormValue>
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
  formData: Record<string, FormValue>
): boolean {
  return getMissingFields(category, step, formData).length === 0;
}
