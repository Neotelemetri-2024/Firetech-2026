import { useTheme } from "../../context/themecontext";

// Reusable animated input field dipakai oleh semua form kategori event
type FormFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animationClass?: string;
  animationDelay?: string;
};

export default function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  animationClass = "animate-slideInLeft",
  animationDelay = "0s",
}: FormFieldProps) {
  const { darkMode } = useTheme();

  return (
    <div className={`group ${animationClass}`} style={{ animationDelay }}>
      {/* Label */}
      <label
        className={`mb-3 block text-sm font-semibold transition-all duration-300 group-focus-within:translate-x-1 ${
          darkMode
            ? "text-slate-600 group-hover:text-blue-600 "
            : "text-slate-300 group-hover:text-red-600 "
        }`}
      >
        {label}
      </label>

      <div className="relative overflow-hidden rounded-xl transition-transform duration-300 focus-within:scale-[1.02]">
        {/* Input */}
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`peer relative z-10 w-full rounded-xl border-2 px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-0 ${
            darkMode
              ? "border-slate-300 bg-white text-slate-800 placeholder-slate-400 hover:border-blue-600  focus:shadow-lg focus:shadow-blue-600/30"
              : "border-slate-700 bg-slate-800/50 text-slate-200 placeholder-slate-500 hover:border-red-600 hover:bg-slate-800/70  focus:shadow-lg focus:shadow-blue-600/30"
          }`}
        />

        {/* Hover Gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-xl
            bg-linear-to-r
            from-red-600/0
            via-purple-600/0
            to-blue-600/0
            transition-all
            duration-300
            group-hover:from-red-600/10
            group-hover:via-purple-600/15
            group-hover:to-blue-600/10
          "
        />

        {/* Bottom Line */}
        <span
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-0.5
            w-0
            -translate-x-1/2
            bg-linear-to-r
            from-red-600
            to-blue-600
            transition-all
            duration-500
            peer-focus:w-full
          "
        />
      </div>
    </div>
  );
}
