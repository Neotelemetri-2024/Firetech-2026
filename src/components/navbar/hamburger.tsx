interface HamburgerProps {
  menuOpen: boolean;
  darkMode: boolean;
  onClick: () => void;
}

export default function Hamburger({
  menuOpen,
  darkMode,
  onClick,
}: HamburgerProps) {
  return (
    <button
      className={`ml-2 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] p-1.5 transition-all duration-300 md:hidden ${
        darkMode
          ? "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
          : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-white hover:text-indigo-600"
      }`}
      onClick={onClick}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
    >
      <div className="relative h-4 w-4">
        <span
          className={`absolute left-0 h-0.5 w-full rounded-full transition-all duration-300 ${
            darkMode ? "bg-white/80" : "bg-slate-600"
          } ${menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
        />

        <span
          className={`absolute left-0 h-0.5 w-full rounded-full transition-all duration-300 ${
            darkMode ? "bg-white/80" : "bg-slate-600"
          } ${
            menuOpen
              ? "top-1/2 -translate-y-1/2 -rotate-45"
              : "top-1/2 -translate-y-1/2"
          }`}
        />

        <span
          className={`absolute left-0 h-0.5 rounded-full transition-all duration-300 ${
            darkMode ? "bg-white/80" : "bg-slate-600"
          } ${
            menuOpen
              ? "bottom-1/2 translate-y-1/2 w-0 opacity-0"
              : "bottom-0 w-full"
          }`}
        />
      </div>
    </button>
  );
}
