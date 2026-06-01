import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import ThemeSwitcher from "./themeswitcher";
import { useTheme } from "../context/themecontext";
import FiretechLogo from "../assets/firetech.webp";

const navItems = ["Home", "About", "Event", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  const [showAos, setShowAos] = useState(true);
  const navigate = useNavigate();

  // Hilangkan data-aos setelah render pertama
  useLayoutEffect(() => {
    setShowAos(false);
  }, []);

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <>
      <header
        {...(showAos
          ? {
              "data-aos": "fade-down",
              "data-aos-duration": "900",
              "data-aos-easing": "ease-in-out",
            }
          : {})}
        className={`sticky top-6 z-50 mx-auto max-w-6xl rounded-2xl border-2 backdrop-blur-md transition-all duration-300 ${
          darkMode
            ? "bg-black border-white/80 shadow-pink-300/40"
            : "bg-white border-slate-200/80 shadow-indigo-300/40"
        }`}
      >
        <nav className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 w-32 shrink-0">
            <img
              src={FiretechLogo}
              alt="Firetech Logo"
              className="h-12 w-12 object-contain"
            />
            <span
              className={`text-lg font-extrabold tracking-wide ${darkMode ? "text-white" : "text-black"}`}
            >
              Firetech
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="mx-auto hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`group relative inline-flex rounded-full px-4 py-2 text-sm font-medium z-10 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  <span className="pointer-events-none absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 h-7 w-4/5 rounded-full bg-linear-to-r from-red-600 to-blue-600 opacity-0 scale-75 blur-[2px] shadow-lg transition-all duration-500 group-hover:opacity-40 group-hover:scale-100 group-hover:blur-0 z-0"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* User Icon */}
          <UserRound
            className={`ml-4 h-10 w-10 cursor-pointer rounded-full border p-2 shadow-md transition ${
              darkMode
                ? "bg-black text-white border-white/80 hover:bg-slate-800"
                : "bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          />

          {/* Mobile Hamburger */}
          <button
            className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full border p-2 shadow-md transition md:hidden ${
              darkMode
                ? "bg-black text-white border-white/80 hover:bg-slate-800"
                : "bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>

          {/* Login Button - Desktop */}
          <div className="hidden w-24 shrink-0 text-right md:block">
            <button
              type="button"
              onClick={handleLoginClick}
              className="rounded-full cursor-pointer bg-linear-to-r from-indigo-500 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 duration-300 hover:from-indigo-600 hover:to-pink-600 focus:ring-2 focus:ring-pink-300"
            >
              Login
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <ul
          className={`md:hidden absolute left-0 right-0 top-16 z-40 mx-4 rounded-xl border p-4 shadow-2xl transition-all duration-300 ${
            darkMode
              ? "bg-black border-white/20"
              : "bg-white/95 border-slate-200"
          } ${
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        >
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition ${
                  darkMode
                    ? "text-white hover:bg-slate-800"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
          {/* Login Button - Mobile */}
          <li className="mt-2">
            <button
              type="button"
              onClick={handleLoginClick}
              className="w-full rounded-full cursor-pointer bg-linear-to-r from-indigo-500 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 duration-300 hover:from-indigo-600 hover:to-pink-600 focus:ring-2 focus:ring-pink-300"
            >
              Login
            </button>
          </li>
        </ul>
      </header>

      <main className="px-4 py-10 min-h-screen">
        <section id="home" className="py-16"></section>
        <section id="about" className="py-16"></section>
        <section id="event" className="py-16"></section>
        <section id="contact" className="py-16"></section>
      </main>
    </>
  );
}
