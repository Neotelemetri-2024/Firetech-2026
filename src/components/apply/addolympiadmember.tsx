import { UploadCloud } from "lucide-react";
import FormField from "./formfield";
import { useTheme } from "../../context/themecontext";

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
  const { darkMode } = useTheme();
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
      />

      {/* Upload KTM */}
      <div className="animate-scaleIn" style={{ animationDelay: "0.2s" }}>
        <label
          className={`mb-3 block font-semibold ${
            darkMode ? "text-slate-800" : "text-white"
          }`}
        >
          Upload KTM / Student Card
        </label>

        <label
          className={`
      group
      flex
      h-28
      w-full
      cursor-pointer
      flex-col
      items-center
      justify-center
      rounded-2xl
      border-2
      border-dashed
      transition-all
      duration-300

      ${
        darkMode
          ? "border-slate-300 bg-white hover:border-blue-600 hover:bg-blue-50"
          : "border-slate-700 bg-slate-900/40 hover:border-red-600 hover:bg-red-600/10"
      }
    `}
        >
          <input
            type="file"
            name="ktm"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={onChange}
          />

          <UploadCloud
            size={34}
            className={`mb-2 transition-all duration-300 group-hover:-translate-y-1 ${
              darkMode ? "text-blue-600" : "text-red-500"
            }`}
          />

          <span
            className={`text-sm font-medium ${
              darkMode ? "text-slate-700" : "text-slate-300"
            }`}
          >
            Click to upload KTM / Student Card
          </span>

          <span
            className={`mt-1 text-xs ${
              darkMode ? "text-slate-500" : "text-slate-500"
            }`}
          >
            JPG, PNG, PDF • Max 5 MB
          </span>
        </label>
      </div>
    </div>
  );
}
