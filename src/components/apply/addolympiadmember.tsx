import FileUpload from "../ui/fileupload";
import FormField from "./formfield";

type AddOlympiadMemberProps = {
  formData: {
    namaAnggota: string;
    ktm?: File | null;
  };

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AddOlympiadMember({
  formData,
  onChange,
}: AddOlympiadMemberProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <FormField
        label="Member Name"
        name="namaAnggota"
        placeholder="Full Name"
        value={formData.namaAnggota}
        onChange={onChange}
        animationClass="animate-slideInLeft"
        animationDelay="0.1s"
        required
      />

      {/* Upload KTM */}
      <div className="animate-scaleIn" style={{ animationDelay: "0.2s" }}>
        <FileUpload
          label="Upload KTM / Student Card"
          name="ktm"
          file={formData.ktm ?? null}
          previewSize="sm"
          required
          accept=".jpg,.jpeg,.png,.pdf"
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
    </div>
  );
}
