import type { FastTypingFormData } from "../../types/typesevent";
import FormField from "./formfield";
import Payment from "./payment";

type FastTypingFormProps = {
  step: number;
  formData: FastTypingFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Form khusus kategori Fast Typing: Personal Information -> Payment
export default function FastTypingForm({
  step,
  formData,
  onChange,
}: FastTypingFormProps) {
  if (step === 1) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <FormField
          label="Nama Peserta"
          name="namaPeserta"
          placeholder="Nama Lengkap"
          value={formData.namaPeserta}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
        />
        <FormField
          label="Asal Sekolah/Perguruan Tinggi"
          name="asalSekolah"
          placeholder="Asal Sekolah/Perguruan Tinggi"
          value={formData.asalSekolah}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
        />
      </div>
    );
  }

  return <Payment />;
}
