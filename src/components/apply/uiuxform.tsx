import type { UiUxFormData } from "../../types/applysevent";
import FormField from "./formfield";
import Payment from "./payment";

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
          label="Player Name"
          name="namaPemain"
          placeholder="Nama Pemain"
          value={formData.namaPemain}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
        />

        <FormField
          label="School/University of Origin"
          name="asalSekolah"
          placeholder="School/University of Origin"
          value={formData.asalSekolah}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
        />
      </div>
    );
  }

  if (step === 2) {
    return <Payment />;
  }

  if (step === 3) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <FormField
          label="Link Figma"
          name="portofolioUrl"
          placeholder="https://www.figma.com/..."
          value={formData.portofolioUrl}
          onChange={onChange}
          animationClass="animate-scaleIn"
          animationDelay="0.1s"
        />
      </div>
    );
  }

  return null;
}
