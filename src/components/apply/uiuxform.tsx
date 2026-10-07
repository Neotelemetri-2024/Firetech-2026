import type { UiUxFormData } from "../../types/applysevent";
import FormField from "./formfield";
import AddMember from "./addmember";
import Payment from "./payment";
import type { RegistrationFile } from "../../services/registration.services";

type UiUxFormProps = {
  step: number;
  formData: UiUxFormData;
  existingFiles?: RegistrationFile[];
  registrationId?: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UiUxForm({
  step,
  formData,
  existingFiles,
  registrationId,
  onChange,
}: UiUxFormProps) {
  if (step === 1) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <FormField
          label="Nama Tim"
          name="namaTeam"
          placeholder="Nama Tim"
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
          maxLength={100}
        />
        <FormField
          label="Universitas / Institusi Asal"
          name="asalInstitusi"
          placeholder="Universitas / Institusi Asal"
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

  if (step === 2) {
    return (
      <div className="space-y-5">
        <p className="text-sm text-white/75">
          Tim harus terdiri dari 2–3 orang termasuk ketua. Isi minimal 1 dan
          maksimal 2 anggota tambahan.
        </p>
        <AddMember
          formData={formData}
          existingFiles={existingFiles}
          registrationId={registrationId}
          maxAdditionalMembers={2}
          requiredAdditionalMembers={1}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <Payment
      amount={50000}
      paymentProof={formData.paymentProof}
      existingFiles={existingFiles}
      registrationId={registrationId}
      onChange={onChange}
    />
  );
}
