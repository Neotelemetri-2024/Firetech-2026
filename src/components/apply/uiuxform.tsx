import type { UiUxFormData } from "../../types/applysevent";
import FormField from "./formfield";
import Payment from "./payment";
import AddMember from "./addmember";

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
          label="Team Name"
          name="namaTeam"
          placeholder="Team Name"
          value={formData.namaTeam}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
        />
        <FormField
          label="School/University of Origin"
          name="asalSekolah"
          placeholder="School/University of Origina"
          value={formData.asalSekolah}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
        />
        <FormField
          label="Link Figma"
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
    return <AddMember formData={formData} onChange={onChange} />;
  }

  return <Payment />;
}
