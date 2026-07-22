// Tipe kategori event yang tersedia di halaman Apply
export type Category = "Hackathon" | "UI/UX" | "efootball" | "Fast Typing";

// Form data untuk masing-masing kategori event
export type HackathonFormData = {
  namaTeam: string;
  namaKetua: string;
  asalSekolah: string;
};

export type UiUxFormData = {
  namaPeserta: string;
  asalSekolah: string;
  portofolioUrl: string;
};

export type EfootballFormData = {
  namaPemain: string;
  idGame: string;
  asalSekolah: string;
};

export type FastTypingFormData = {
  namaPeserta: string;
  asalSekolah: string;
};

// Peta antara kategori dengan tipe form data-nya masing-masing
export type ApplyFormDataMap = {
  Hackathon: HackathonFormData;
  "UI/UX": UiUxFormData;
  efootball: EfootballFormData;
  "Fast Typing": FastTypingFormData;
};

