import type { ComponentType } from "react";
import type { ApplyFormDataMap, Category } from "../types/typesevent";
import HackathonForm from "../components/apply/hackathonform";
import UiUxForm from "../components/apply/uiuxform";
import EfootballForm from "../components/apply/efootballform";
import FastTypingForm from "../components/apply/fasttypingform";

// Nilai awal form data untuk masing-masing kategori event
export const initialApplyFormData: ApplyFormDataMap = {
  Hackathon: { namaTeam: "", namaKetua: "", asalSekolah: "" },
  "UI/UX": { namaPeserta: "", asalSekolah: "", portofolioUrl: "" },
  efootball: { namaPemain: "", idGame: "", asalSekolah: "" },
  "Fast Typing": { namaPeserta: "", asalSekolah: "" },
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
    steps: ["Personal Information", "Upload Portfolio", "Payment"],
    Component: UiUxForm,
  },
  efootball: {
    steps: ["Personal Information", "Add Partner", "Payment"],
    Component: EfootballForm,
  },
  "Fast Typing": {
    steps: ["Personal Information", "Payment"],
    Component: FastTypingForm,
  },
};
