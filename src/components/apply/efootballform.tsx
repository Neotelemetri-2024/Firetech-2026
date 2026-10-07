import type { EfootballFormData } from "../../types/applysevent";
import FormField from "./formfield";
import Payment from "./payment";
import type { RegistrationFile } from "../../services/registration.services";

type EfootballFormProps = {
  step: number;
  formData: EfootballFormData;
  existingFiles?: RegistrationFile[];
  registrationId?: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// E-Football backend menerima satu peserta, tanpa KTM, dan mewajibkan bukti pembayaran.
export default function EfootballForm({
  step,
  formData,
  existingFiles,
  registrationId,
  onChange,
}: EfootballFormProps) {
  if (step === 1) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <FormField
          label="Nama Lengkap Peserta"
          name="namaPemain"
          placeholder="Nama Lengkap Peserta"
          value={formData.namaPemain}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
          required
          maxLength={100}
        />
        <FormField
          label="Sekolah / Universitas"
          name="asalInstitusi"
          placeholder="Nama Sekolah / Universitas"
          value={formData.asalInstitusi}
          onChange={onChange}
          animationClass="animate-scaleIn"
          animationDelay="0.3s"
          required
          maxLength={150}
        />
      </div>
    );
  }

  return (
    <Payment
      amount={25000}
      paymentProof={formData.paymentProof}
      existingFiles={existingFiles}
      registrationId={registrationId}
      onChange={onChange}
    />
  );
}
