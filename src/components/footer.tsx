import { useTheme } from "../context/themecontext";
import Neotelemetri from "../assets/neotelemetri.webp";
import OurTeam from "./footer/ourteam";
import Connect from "./footer/connect";
import QuickLinks from "./footer/quicklink";
import Firetech from "../assets/firetech.webp";

export default function Footer() {
  const { darkMode } = useTheme();
  const accentColor = darkMode ? "text-blue-700" : "text-red-700";
  return (
    <footer
      className={`relative w-full overflow-hidden border ${
        darkMode ? "bg-white border-blue-700" : "bg-black border-red-600"
      }`}
    >
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 w-full h-1 flex">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-full ${
              darkMode
                ? "bg-linear-to-r from-blue-700 to-blue-400"
                : "bg-linear-to-r from-red-700 to-red-400"
            }`}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex items-center gap-3">
              <img
                src={Firetech}
                alt="Firetech Logo"
                className="h-24 w-24 object-contain transition-all duration-500 hover:-translate-y-0.5 cursor-pointer"
              />

              <span
                className="text-3xl font-black tracking-tight"
                style={{
                  textShadow: darkMode
                    ? "3px 3px 0 #ffffff"
                    : "3px 3px 0 #000000",
                }}
              >
                <span
                  className={`transition-colors duration-500 ${
                    darkMode ? "text-blue-700" : "text-red-700"
                  }`}
                >
                  Fire
                </span>

                <span
                  className={`transition-colors duration-500 ${
                    darkMode ? "text-red-700" : "text-blue-700"
                  }`}
                >
                  tech
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <p
                className={`text-sm leading-relaxed font-medium transition-colors duration-500 ${accentColor}`}
              >
                Harmonizing Tech and Humanity
              </p>

              <div
                className={`h-px w-12 mt-1 ${
                  darkMode ? "bg-blue-700/50" : "bg-red-600/50"
                }`}
              />

              <div
                className={`text-xs leading-relaxed mt-2 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Neo Telemetri, Lt. 2,
                <br />
                Gedung Pusat Kegiatan Mahasiswa,
                <br />
                Universitas Andalas,
                <br />
                Kota Padang, Sumatera Barat,
                <br />
                Indonesia.
              </div>
            </div>
          </div>

          {/* Our Team */}
          <OurTeam />

          {/* Quick Links + Events */}
          <QuickLinks />

          {/* Connect with us */}
          <Connect />
        </div>

        {/* Divider */}
        <div
          className={`mt-12 pt-6 border-t ${
            darkMode ? "border-slate-800" : "border-slate-200"
          } flex flex-col sm:flex-row items-center justify-between gap-4`}
        >
          <p
            className={`text-xs font-medium ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            &copy; {new Date().getFullYear()} Firetech. All rights reserved.
          </p>

          <a
            href="https://neotelemetri.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:-translate-y-0.5"
          >
            <span
              className={`text-xs font-semibold ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Made by
            </span>

            <img
              src={Neotelemetri}
              alt="Neotelemetri"
              className="h-6 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
