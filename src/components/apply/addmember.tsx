import FormField from "./formfield";
import FileUpload from "../ui/fileupload";

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
        label="Member 1 Name"
        name="anggota1"
        placeholder="Full Name"
        value={formData.anggota1}
        onChange={onChange}
        animationClass="animate-slideInLeft"
        animationDelay="0.1s"
        required
      />

      <FormField
        label="Member 2 Name"
        name="anggota2"
        placeholder="Full Name"
        value={formData.anggota2}
        onChange={onChange}
        animationClass="animate-slideInRight"
        animationDelay="0.2s"
        required
      />

      <FormField
        label="Member 3 Name"
        name="anggota3"
        placeholder="Full Name"
        value={formData.anggota3}
        onChange={onChange}
        animationClass="animate-slideInLeft"
        animationDelay="0.3s"
      />

      <FormField
        label="Member 4 Name"
        name="anggota4"
        placeholder="Full Name"
        value={formData.anggota4}
        onChange={onChange}
        animationClass="animate-slideInRight"
        animationDelay="0.4s"
      />

      {/* Upload KTM */}
      <FileUpload
        label="Upload Student ID Card"
        name="ktm"
        file={formData.ktm ?? null}
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
