import type { ComponentType } from "react";
import type { ApplyFormDataMap, Category } from "../types/applysevent";
import HackathonForm from "../components/apply/hackathonform";
import UiUxForm from "../components/apply/uiuxform";
import EfootballForm from "../components/apply/efootballform";
//import InformaticsOlympiadForm from "../components/apply/informaticsolympiadform";

// Nilai awal form data untuk masing-masing kategori event
export const initialApplyFormData: ApplyFormDataMap = {
  Hackathon: {
    // Step 1
    namaTeam: "",
    namaKetua: "",
    asalInstitusi: "",

    // Step 2
    anggota1: "",
    anggota2: "",
    anggota3: "",
    anggota4: "",

    // Upload
    ktm: null,
    paymentProof: null,
  },

  "UI/UX": {
    namaPemain: "",
    asalInstitusi: "",
    ktm: null,
    paymentProof: null,
  },

  "E-Football": {
    namaPemain: "",
    asalInstitusi: "",
    paymentProof: null,
  },
};

type ApplyFormProps<C extends Category> = {
  step: number;
  formData: ApplyFormDataMap[C];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Registry: setiap kategori event punya label step & komponen form sendiri
export const applyFormConfig: {
  [C in Category]: {
    steps: string[];
    Component: ComponentType<ApplyFormProps<C>>;
  };
} = {
  Hackathon: {
    steps: ["Informasi Pribadi", "Tambah Anggota"],
    Component: HackathonForm,
  },
  "UI/UX": {
    steps: ["Informasi Peserta", "Pembayaran"],
    Component: UiUxForm,
  },
  "E-Football": {
    steps: ["Informasi Pribadi", "Pembayaran"],
    Component: EfootballForm,
  },
};
