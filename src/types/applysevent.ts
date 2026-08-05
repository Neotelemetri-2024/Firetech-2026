// Tipe kategori event yang tersedia di halaman Apply
export type Category =
  | "Hackathon"
  | "UI/UX"
  | "E-Football"
  | "Informatics Olympiad";

// Form data untuk masing-masing kategori event
export type HackathonFormData = {
  // Step 1
  namaTeam: string;
  namaKetua: string;
  asalSekolah: string;

  // Step 2
  anggota1: string;
  anggota2: string;
  anggota3: string;
  anggota4: string;

  ktm: File | null;
};

export type UiUxFormData = {
  // Step 1
  namaTeam: string;
  namaKetua: string;
  asalSekolah: string;
  portofolioUrl: string;

  // Step 2
  anggota1: string;
  anggota2: string;
  anggota3: string;
  anggota4: string;

  // Upload
  ktm: File | null;
};

export type EfootballFormData = {
  namaPemain: string;
  idGame: string;
  asalSekolah: string;
};

export type InformaticsOlympiadFormData = {
  // Step 1
  namaKetua: string;
  asalSekolah: string;

  // Step 2
  namaAnggota: string;
};

// Peta antara kategori dengan tipe form data-nya masing-masing
export type ApplyFormDataMap = {
  Hackathon: HackathonFormData;
  "UI/UX": UiUxFormData;
  "E-Football": EfootballFormData;
  "Informatics Olympiad": InformaticsOlympiadFormData;
};
