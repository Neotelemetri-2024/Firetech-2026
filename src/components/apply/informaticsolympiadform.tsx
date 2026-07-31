import type { InformaticsOlympiadFormData } from "../../types/typesevent";
import FormField from "./formfield";
import Payment from "./payment";
import AddMemberOlyimpiad from "./addolympiadmember";

type InformaticsOlympiadProps = {
  step: number;
  formData: InformaticsOlympiadFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InformaticsOlympiadForm({
  step,
  formData,
  onChange,
}: InformaticsOlympiadProps) {
  if (step === 1) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <FormField
          label="Leader Name"
          name="namaKetua"
          placeholder="Leader Name"
          value={formData.namaKetua}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
        />
        <FormField
          label="Institution Name"
          name="asalSekolah"
          placeholder="Institution Name"
          value={formData.asalSekolah}
          onChange={onChange}
          animationClass="animate-scaleIn"
          animationDelay="0.3s"
        />
        <FormField
          label="Member Name"
          name="namaKetua"
          placeholder="Member Name"
          value={formData.namaAnggota}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
        />
      </div>
    );
  }

  if (step === 2) {
    return <AddMemberOlyimpiad formData={formData} onChange={onChange} />;
  }

  return <Payment />;
}
