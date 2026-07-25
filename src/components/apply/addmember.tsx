import FormField from "./formfield";

type AddMemberProps = {
  formData: {
    anggota1: string;
    anggota2: string;
    anggota3: string;
    anggota4: string;
    ktm?: File | null;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AddMember({ formData, onChange }: AddMemberProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <FormField
        label="Nama Anggota 1"
        name="anggota1"
        placeholder="Nama Lengkap"
        value={formData.anggota1}
        onChange={onChange}
        animationClass="animate-slideInLeft"
        animationDelay="0.1s"
      />

      <FormField
        label="Nama Anggota 2"
        name="anggota2"
        placeholder="Nama Lengkap"
        value={formData.anggota2}
        onChange={onChange}
        animationClass="animate-slideInRight"
        animationDelay="0.2s"
      />

      <FormField
        label="Nama Anggota 3"
        name="anggota3"
        placeholder="Nama Lengkap"
        value={formData.anggota3}
        onChange={onChange}
        animationClass="animate-slideInLeft"
        animationDelay="0.3s"
      />

      <FormField
        label="Nama Anggota 4"
        name="anggota4"
        placeholder="Nama Lengkap"
        value={formData.anggota4}
        onChange={onChange}
        animationClass="animate-slideInRight"
        animationDelay="0.4s"
      />

      {/* Upload KTM */}
      <div className="animate-scaleIn" style={{ animationDelay: "0.5s" }}>
        <label className="mb-3 block font-medium">
          Upload KTM/Kartu Pelajar
        </label>

        <label
          className="
            flex
            h-24
            w-full
            cursor-pointer
            items-center
            justify-center
            rounded-xl
            border-2
            border-dashed
            border-slate-400
            transition-all
            duration-300
            hover:border-blue-600
            hover:bg-blue-600/5
          "
        >
          <input
            type="file"
            name="ktm"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={onChange}
          />

          <span className="text-sm text-slate-500">
            Click to upload KTM / Student Card
          </span>
        </label>
      </div>
    </div>
  );
}
