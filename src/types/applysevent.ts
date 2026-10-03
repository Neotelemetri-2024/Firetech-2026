// Tipe kategori event yang tersedia di halaman Apply
export type Category = "Hackathon" | "UI/UX" | "E-Football";
//| "Informatics Olympiad";

// Form data untuk masing-masing kategori event
export type HackathonFormData = {
  // Step 1
  namaTeam: string;
  namaKetua: string;
  asalInstitusi: string;

  // Step 2
  anggota1: string;
  anggota2: string;
  anggota3: string;
  anggota4: string;

  ktm: File | null;
  paymentProof: File | null;
};

export type UiUxFormData = {
  // Peserta tunggal, sesuai registration form UI/UX pada backend.
  namaPemain: string;
  asalInstitusi: string;
  ktm: File | null;
  paymentProof: File | null;
};

export type EfootballFormData = {
  namaPemain: string;
  asalInstitusi: string;
  paymentProof: File | null;
};

// Peta antara kategori dengan tipe form data-nya masing-masing
export type ApplyFormDataMap = {
  Hackathon: HackathonFormData;
  "UI/UX": UiUxFormData;
  "E-Football": EfootballFormData;
  //"Informatics Olympiad": InformaticsOlympiadFormData;
};
