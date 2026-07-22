import type { UiUxFormData } from "../../types/typesevent";
import FormField from "./formfield";
import PlaceholderStep from "./placeholderstep";

type UiUxFormProps = {
  step: number;
  formData: UiUxFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Form khusus kategori UI/UX: Personal Information -> Upload Portfolio -> Payment
export default function UiUxForm({ step, formData, onChange }: UiUxFormProps) {
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
        <FormField
          label="Link Portofolio"
          name="portofolioUrl"
          placeholder="https://..."
          value={formData.portofolioUrl}
          onChange={onChange}
          animationClass="animate-scaleIn"
          animationDelay="0.3s"
        />
      </div>
    );
  }

  if (step === 2) {
    return (
      <PlaceholderStep message="Form upload desain/portofolio akan ditampilkan di sini" />
    );
  }

  return <PlaceholderStep message="Form pembayaran akan ditampilkan di sini" />;
}
