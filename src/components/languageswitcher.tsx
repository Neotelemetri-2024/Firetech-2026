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

      {/* Tooltip */}
      <div
        className={`pointer-events-none absolute left-1/2 top-full z-9999 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-semibold shadow-lg transition-all duration-300 ${
          darkMode
            ? "bg-slate-900 text-white"
            : "bg-black/80 text-white backdrop-blur-md"
        } opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100`}
      >
        Change Language
        {/* Tooltip Arrow */}
        <div
          className={`absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 ${
            darkMode ? "bg-slate-900" : "bg-black/80"
          }`}
        />
      </div>
    </button>
  );
}
