import { useTheme } from "../../context/themecontext";
import { Laptop, Palette, Gamepad2, Keyboard, BrainCircuit } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Event", id: "event" },
  { label: "FAQ", id: "faq" },
  { label: "Timeline", id: "timeline" },
];

const eventItems = [
  {
    name: "Hackathon",
    icon: Laptop,
  },
  {
    name: "UI/UX Competition",
    icon: Palette,
  },
  {
    name: "E-Football",
    icon: Gamepad2,
  },
  {
    name: "Informatics Olympiad",
    icon: BrainCircuit,
  },
  {
    name: "Fast Typing ",
    icon: Keyboard,
  },
];

export default function QuickLinks() {
  const { darkMode } = useTheme();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
      <span
        className={`text-sm font-bold uppercase tracking-widest ${
          darkMode ? "text-slate-600" : "text-slate-300"
        }`}
      >
        Quick Links
      </span>

      <ul className="flex flex-wrap justify-center lg:justify-start gap-2.5">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleScroll(item.id)}
              className={`inline-block px-4 py-2 text-xs font-bold cursor-pointer rounded-full border-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none ${
                darkMode
                  ? "border-slate-300 text-slate-700 bg-slate-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.35),0_8px_20px_rgba(37,99,235,0.25)]"
                  : "border-slate-600 text-slate-300 bg-slate-900 hover:bg-red-700 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(185,28,28,0.35),0_8px_20px_rgba(185,28,28,0.25)]"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="w-full">
        <h4
          className={`text-sm font-bold uppercase tracking-widest mb-3.5 ${
            darkMode ? "text-slate-600" : "text-slate-300"
          }`}
        >
          Events
        </h4>

        <div className="flex flex-col items-center lg:items-start gap-2.5">
          {eventItems.map((event) => {
            const Icon = event.icon;

            return (
              <div
                key={event.name}
                className={`flex items-center justify-center lg:justify-start gap-3 transition-all duration-300 hover:translate-x-1 ${
                  darkMode
                    ? "text-slate-500 hover:text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon size={15} className="shrink-0" />

                <span className="text-sm">{event.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
