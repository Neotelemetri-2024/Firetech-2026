import FiretechLogo from "../../assets/firetech.webp";

interface NavbarBrandProps {
  darkMode: boolean;
}

export default function NavbarBrand({ darkMode }: NavbarBrandProps) {
  return (
    <div className="flex items-center gap-0.5 w-26 md:w-32 shrink-0">
      <div className="relative">
        <img
          src={FiretechLogo}
          alt="Firetech Logo"
          className="h-10 w-10 object-contain transition-transform duration-300 hover:scale-110 hover:rotate-[-8deg] cursor-pointer"
        />
        {/* Logo glow effect */}
        <div
          className={`absolute inset-0 rounded-full blur-md -z-10 transition-opacity duration-300 opacity-0 hover:opacity-100 ${
            darkMode ? "bg-blue-700" : "bg-red-600"
          }`}
        />
      </div>
      <span
        className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
          darkMode ? "text-blue-600" : "text-red-700"
        }`}
      >
        Fire
        <span
          className={`transition-colors duration-300 ${
            darkMode ? "text-red-700" : "text-blue-600"
          }`}
        >
          tech
        </span>
      </span>
    </div>
  );
}
