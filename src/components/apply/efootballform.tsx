import type { EfootballFormData } from "../../types/typesevent";
import FormField from "./formfield";
import PlaceholderStep from "./placeholderstep";

type EfootballFormProps = {
  step: number;
  formData: EfootballFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Form khusus kategori efootball: Personal Information -> Add Partner -> Payment
export default function EfootballForm({
  step,
  formData,
  onChange,
}: EfootballFormProps) {
  if (step === 1) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <FormField
          label="Nama Pemain"
          name="namaPemain"
          placeholder="Nama Lengkap"
          value={formData.namaPemain}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
        />
        <FormField
          label="ID Game efootball"
          name="idGame"
          placeholder="Contoh: 123456789"
          value={formData.idGame}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
        />
        <FormField
          label="Asal Sekolah/Perguruan Tinggi"
          name="asalSekolah"
          placeholder="Asal Sekolah/Perguruan Tinggi"
          value={formData.asalSekolah}
          onChange={onChange}
          animationClass="animate-scaleIn"
          animationDelay="0.3s"
        />
      </div>
    );
  }

  if (step === 2) {
    return (
      <PlaceholderStep message="Form untuk menambahkan partner akan ditampilkan di sini" />
    );
  }

  return <PlaceholderStep message="Form pembayaran akan ditampilkan di sini" />;
}
