import type { HackathonFormData } from "../../types/typesevent";
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
          label="Nama Team"
          name="namaTeam"
          placeholder="Nama Team"
          value={formData.namaTeam}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
        />
        <FormField
          label="Nama Ketua Team"
          name="namaKetua"
          placeholder="Nama Lengkap"
          value={formData.namaKetua}
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
    return <AddMember formData={formData} onChange={onChange} />;
  }

  return <Payment />;
}
