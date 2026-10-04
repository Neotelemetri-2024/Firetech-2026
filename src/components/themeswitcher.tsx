import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/themecontext";

export default function ThemeSwitcher() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className={`group relative ml-4 grid h-10 w-10 place-items-center rounded-full border cursor-pointer p-2 shadow-md transition-all duration-300 hover:-translate-y-0.5 md:ml-6 ${
        darkMode
          ? "border-white/80 bg-white text-black"
          : "bg-black border-white/80 text-white"
      }`}
      aria-label="Toggle theme"
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <Moon className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-12" strokeWidth={1.8} />
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.8} />
      )}
    </button>
  );
}
