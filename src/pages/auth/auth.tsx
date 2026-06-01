import { useTheme } from "../../context/themecontext";
import FormLogin from "../../components/auth/formLogin";
import FormRegister from "../../components/auth/formRegister";
import ThemeSwitcher from "../../components/themeswitcher";
import FiretechLogo from "../../assets/firetech.webp";
import FiretechLogoWhite from "../../assets/firetechwhite.webp";

export default function Auth() {
  const { darkMode } = useTheme();

  const shellStyles = darkMode
    ? "bg-slate-950 text-white"
    : "bg-slate-50 text-slate-900";

  return (
    <div className={`relative min-h-screen overflow-hidden ${shellStyles}`}>
      {/* Theme Switcher Button */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeSwitcher />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        {/* Firetech Logo - Centered between forms */}
        <img
          src={darkMode ? FiretechLogoWhite : FiretechLogo}
          alt="Firetech"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-124 h-224 object-contain opacity-50 pointer-events-none"
        />
        <div className="w-full">
          <div className="grid gap-6 lg:grid-cols-2">
            <FormLogin />
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}
