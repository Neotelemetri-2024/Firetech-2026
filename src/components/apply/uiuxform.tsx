import type { UiUxFormData } from "../../types/applysevent";
import AddMember from "./addmember";
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
          label="Nama Peserta"
          name="namaPemain"
          placeholder="Nama Peserta"
          value={formData.namaPemain}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
          required
        />

        <FormField
          label="Universitas / Institusi Asal"
          name="asalInstitusi"
          placeholder="Universitas / Institusi Asal"
          value={formData.asalInstitusi}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
          required
        />
      </div>
    );
  }

  if (step === 2) {
    return (
      <AddMember
        formData={formData}
        maxAdditionalMembers={2}
        requiredAdditionalMembers={1}
        onChange={onChange}
      />
    );
  }

  return (
    <Payment
      amount={50000}
      paymentProof={formData.paymentProof}
      onChange={onChange}
    />
  );
}
