import FormField from "./formfield";
import FileUpload from "../ui/fileupload";

type AddMemberProps = {
  maxAdditionalMembers?: 2 | 4;
  requiredAdditionalMembers?: 1 | 2 | 3;
  formData: {
    anggota1: string;
    anggota2: string;
    anggota3: string;
    anggota4: string;
    ktm?: File | null;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AddMember({
  formData,
  maxAdditionalMembers = 4,
  requiredAdditionalMembers = 2,
  onChange,
}: AddMemberProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <FormField
        label="Name Anggota 1"
        name="anggota1"
        placeholder="Full Name"
        value={formData.anggota1}
        onChange={onChange}
        animationClass="animate-slideInLeft"
        animationDelay="0.1s"
        required
      />

      <FormField
        label="Name Anggota 2"
        name="anggota2"
        placeholder="Full Name"
        value={formData.anggota2}
        onChange={onChange}
        animationClass="animate-slideInRight"
        animationDelay="0.2s"
        required={requiredAdditionalMembers >= 2}
      />

      {maxAdditionalMembers === 4 && (
        <>
        <FormField
          label="Name Anggota 3"
          name="anggota3"
          placeholder="Full Name"
          value={formData.anggota3}
          onChange={onChange}
          animationClass="animate-slideInLeft"
          animationDelay="0.3s"
          required={requiredAdditionalMembers >= 3}
        />

        <FormField
          label="Name Anggota 4"
          name="anggota4"
          placeholder="Full Name"
          value={formData.anggota4}
          onChange={onChange}
          animationClass="animate-slideInRight"
          animationDelay="0.4s"
        />
        </>
      )}

      {/* Upload KTM */}
      <FileUpload
        label="Unggah Kartu Identitas Mahasiswa (KTM)"
        name="ktm"
        file={formData.ktm ?? null}
        note="Mohon gabungkan kartu KTM seluruh anggota tim menjadi satu file."
        required
        onChange={onChange}
        onDelete={() =>
          onChange({
            target: {
              name: "ktm",
              type: "file",
              files: null,
              value: "",
            },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />
    </div>
  );
}
