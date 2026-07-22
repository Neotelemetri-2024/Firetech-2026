import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FilterProps {
  options: string[];
  selected: string | null;
  placeholder?: string;
  variant?: "dropdown" | "buttons";
  onSelect: (value: string) => void;
}

export default function Filter({
  options,
  selected,
  placeholder = "Filter",
  variant = "dropdown",
  onSelect,
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "dropdown") return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [variant]);

  /* ===========================
      BUTTON STYLE
     =========================== */
  if (variant === "buttons") {
    return (
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((option) => {
          const isActive = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`
                flex items-center justify-between
                rounded-2xl border
                px-4 py-4
                text-left text-sm font-black
                transition-all duration-200
                hover:-translate-y-0.5
                cursor-pointer
                ${
                  isActive
                    ? "border-white/30 bg-white/15 text-white"
                    : "border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <span>{option}</span>

              {isActive && <Check className="h-4 w-4 text-emerald-400" />}
            </button>
          );
        })}
      </div>
    );
  }

  /* ===========================
  DROPDOWN STYLE
     =========================== */
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-4 py-2 text-sm font-black text-white/85 transition hover:-translate-y-0.5 cursor-pointer"
      >
        <span>{selected ?? placeholder}</span>

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-60">
          <div className="overflow-hidden rounded-2xl border-2 border-white/30 bg-[#1a1a2e] shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="max-h-64 overflow-y-auto py-1">
              {options.map((option) => {
                const isActive = selected === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onSelect(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-bold transition cursor-pointer
                      ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <span>{option}</span>

                    {isActive && (
                      <Check className="h-4 w-4 text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
