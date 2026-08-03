import { Languages } from "lucide-react";
import { useTheme } from "../context/themecontext";

export default function LanguageSwitcher() {
  const { darkMode } = useTheme();

  return (
    <button
      type="button"
      aria-label="Change Language"
      className={`group relative h-10 w-10 cursor-pointer rounded-full border p-2 shadow-md transition-all duration-300 hover:-translate-y-0.5  ${
        darkMode
          ? "bg-white border-slate-300 text-black hover:bg-slate-100"
          : "bg-black border-white/80 text-white hover:bg-neutral-900"
      }`}
    >
      {/* Icon */}
      <Languages
        className="h-6 w-6 transition-transform duration-300 "
        strokeWidth={2}
      />
    </button>
  );
}
