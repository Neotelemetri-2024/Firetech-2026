import type { UiUxFormData } from "../../types/applysevent";
import FormField from "./formfield";
import Payment from "./payment";

type UiUxFormProps = {
  step: number;
  formData: UiUxFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Form UI/UX mengikuti definisi backend: satu peserta, KTM, dan bukti pembayaran.
export default function UiUxForm({ step, formData, onChange }: UiUxFormProps) {
  if (step === 1) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <FormField
          label="Nama Lengkap Peserta"
          name="namaPemain"
          placeholder="Nama Lengkap Peserta"
          value={formData.namaPemain}
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
          animationClass="animate-slideInRight"
          animationDelay="0.2s"
          required
          maxLength={150}
        />
        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-white">
            Kartu Tanda Mahasiswa (KTM)
          </label>
          <input
            type="file"
            name="ktm"
            accept="application/pdf"
            onChange={onChange}
            required
            className="block w-full rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:font-bold file:text-slate-900"
          />
          <p className="mt-2 text-xs text-white/70">PDF, maksimal 5 MB.</p>
        </div>
      </div>
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
