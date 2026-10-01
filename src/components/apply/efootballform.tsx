import type { EfootballFormData } from "../../types/applysevent";
import FormField from "./formfield";
import Payment from "./payment";

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
          label="Player Name"
          name="namaPemain"
          placeholder="Full Name"
          value={formData.namaPemain}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.1s"
          required
        />
        <FormField
          label="ID Game efootball"
          name="idGame"
          placeholder="ex: 123456789"
          value={formData.idGame}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
          required
        /> 
        <FormField
          label="School/University of Origin"
          name="asalInstitusi"
          placeholder="School/University of Origin"
          value={formData.asalInstitusi}
          onChange={onChange}
          animationClass="animate-scaleIn"
          animationDelay="0.3s"
          required
        />
      </div>
    );
  }

  return <Payment paymentProof={formData.paymentProof} onChange={onChange} />;
}
