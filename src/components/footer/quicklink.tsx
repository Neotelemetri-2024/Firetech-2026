import { useTheme } from "../../context/themecontext";
import { Laptop, Palette, Gamepad2, Bot, Keyboard } from "lucide-react";

const navItems = ["Home", "About", "Event", "Contact"];

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
    name: "E-Sport Competition",
    icon: Gamepad2,
  },
  {
    name: "Line Follower",
    icon: Bot,
  },
  {
    name: "Fast Typing Competition",
    icon: Keyboard,
  },
];

export default function QuickLinks() {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col items-start gap-5">
      <span
        className={`text-sm font-bold uppercase tracking-widest ${
          darkMode ? "text-slate-300" : "text-slate-600"
        }`}
      >
        Quick Links
      </span>

      <ul className="flex flex-wrap gap-2.5">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className={`inline-block px-4 py-2 text-xs font-bold rounded-full border-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none ${
                darkMode
                  ? "border-slate-600 text-slate-300 bg-slate-900 hover:bg-red-700 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(185,28,28,0.35),0_8px_20px_rgba(185,28,28,0.25)]"
                  : "border-slate-300 text-slate-700 bg-slate-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.35),0_8px_20px_rgba(37,99,235,0.25)]"
              }`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="w-full">
        <h4
          className={`text-sm font-bold uppercase tracking-widest mb-3.5 ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Events
        </h4>

        <div className="flex flex-col gap-2.5">
          {eventItems.map((event) => {
            const Icon = event.icon;

            return (
              <div
                key={event.name}
                className={`flex items-center gap-3 transition-all duration-300 hover:translate-x-1 ${
                  darkMode
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
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
