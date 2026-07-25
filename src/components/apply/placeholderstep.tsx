import { useTheme } from "../../context/themecontext";

// Placeholder step yang dipakai untuk step yang kontennya belum tersedia
// (misalnya: Add Member, Upload Portfolio, Add Partner, dll)
type PlaceholderStepProps = {
  message: string;
};

export default function PlaceholderStep({ message }: PlaceholderStepProps) {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div
        className={`rounded-xl border-2 border-dashed py-12 text-center transition-all duration-300 group ${
          darkMode
            ? "border-slate-700 bg-slate-800/30 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
            : "border-slate-300 bg-slate-100/50 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20"
        }`}
      >
        <div>
          <p
            className={`transition-colors duration-300 ${
              darkMode
                ? "text-black group-hover:text-blue-600"
                : "text-white group-hover:text-red-600"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
