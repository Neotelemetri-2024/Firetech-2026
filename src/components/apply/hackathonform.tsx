import type { HackathonFormData } from "../../types/applysevent";
import FormField from "./formfield";
import Payment from "./payment";
import AddMember from "./addmember";

type HackathonFormProps = {
  step: number;
  formData: HackathonFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Form khusus kategori Hackathon: Personal Information -> Add Member -> Payment
export default function HackathonForm({
  step,
  formData,
  onChange,
}: HackathonFormProps) {
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
          label="Team Leader Name"
          name="namaKetua"
          placeholder="Full Name"
          value={formData.namaKetua}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
        />
        <FormField
          label="School/University of Origin"
          name="asalSekolah"
          placeholder="School/University of Origin"
          value={formData.asalSekolah}
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
