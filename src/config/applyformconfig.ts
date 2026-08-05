import type { ComponentType } from "react";
import type { ApplyFormDataMap, Category } from "../types/applysevent";
import HackathonForm from "../components/apply/hackathonform";
import UiUxForm from "../components/apply/uiuxform";
import EfootballForm from "../components/apply/efootballform";
import InformaticsOlympiadForm from "../components/apply/informaticsolympiadform";

// Nilai awal form data untuk masing-masing kategori event
export const initialApplyFormData: ApplyFormDataMap = {
  Hackathon: {
    // Step 1
    namaTeam: "",
    namaKetua: "",
    asalSekolah: "",

    // Step 2
    anggota1: "",
    anggota2: "",
    anggota3: "",
    anggota4: "",

    // Upload
    ktm: null,
  },

  "UI/UX": {
    // Step 1
    namaTeam: "",
    namaKetua: "",
    asalSekolah: "",
    portofolioUrl: "",

    // Step 2
    anggota1: "",
    anggota2: "",
    anggota3: "",
    anggota4: "",

    // Upload
    ktm: null,
  },

  "E-Football": {
    namaPemain: "",
    idGame: "",
    asalSekolah: "",
  },

  "Informatics Olympiad": {
    //Step 1
    namaKetua: "",
    asalSekolah: "",

    //Step 2
    namaAnggota: "",
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
    steps: ["Personal Information", "Add Member", "Payment"],
    Component: HackathonForm,
  },
  "UI/UX": {
    steps: ["Personal Information", "Add Member", "Payment"],
    Component: UiUxForm,
  },
  "E-Football": {
    steps: ["Personal Information", "Payment"],
    Component: EfootballForm,
  },

  "Informatics Olympiad": {
    steps: ["Personal Information", "Add Member", "Payment"],
    Component: InformaticsOlympiadForm,
  },
};
