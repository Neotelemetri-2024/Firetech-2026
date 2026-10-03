import type { HackathonFormData } from "../../types/applysevent";
import FormField from "./formfield";
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
          label="Nama Tim"
          name="namaTeam"
          placeholder="Team Name"
          value={formData.namaTeam}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
          required
        />
        <FormField
          label="Nama Ketua Tim"
          name="namaKetua"
          placeholder="Nama Ketua Tim"
          value={formData.namaKetua}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
          required
        />
        <FormField
          label="Universitas / Institusi Asal"
          name="asalInstitusi"
          placeholder="University of Origin"
          value={formData.asalInstitusi}
          onChange={onChange}
          animationClass="animate-scaleIn"
          animationDelay="0.3s"
          required
        />
      </div>
    );
  }

  if (step === 2) {
    return <AddMember formData={formData} onChange={onChange} />;
  }
}
