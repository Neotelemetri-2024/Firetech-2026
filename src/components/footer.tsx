import { useTheme } from "../context/themecontext";
import Neotelemetri from "../assets/NeoTelemetri.webp";
import OurTeam from "./footer/ourteam";
import Connect from "./footer/connect";
import QuickLinks from "./footer/quicklink";
import Firetech from "../assets/firetech.webp";

import Instagram from "../assets/socialmedia/instagram.webp";
import Linkedin from "../assets/socialmedia/linkedin.webp";
import Github from "../assets/socialmedia/github.webp";
import Youtube from "../assets/socialmedia/youtube.webp";
import TikTok from "../assets/socialmedia/tiktok.webp";

export default function Footer() {
  const { darkMode } = useTheme();
  const accentColor = darkMode ? "text-blue-700" : "text-red-700";

  const socialLinks = [
    {
      src: Instagram,
      alt: "Instagram",
      href: "https://www.instagram.com/neotelemetri/",
    },
    {
      src: Linkedin,
      alt: "LinkedIn",
      href: "https://www.linkedin.com/company/neotelemetri/",
    },
    {
      src: Github,
      alt: "GitHub",
      href: "https://github.com/Neotelemetri-2024",
    },
    {
      src: Youtube,
      alt: "YouTube",
      href: "https://youtube.com/@neotelemetri",
    },
    {
      src: TikTok,
      alt: "TikTok",
      href: "https://www.tiktok.com/@neotelemetri",
    },
  ];
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
          <div className="flex flex-col items-start gap-3 md:gap-5">
            <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-start lg:gap-3">
              <img
                src={Firetech}
                alt="Firetech Logo"
                className="h-20 w-20 md:h-24 md:w-24 object-contain transition-all duration-500 hover:-translate-y-0.5 cursor-pointer"
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

            <div className="flex flex-col items-left lg:items-start gap-1">
              <p
                className={`text-sm leading-relaxed font-medium font-orbitrontransition-colors duration-500 ${accentColor}`}
              >
                Harmonizing Tech and Humanity
              </p>

              <div
                className={`h-px w-12 mt-1 ${
                  darkMode ? "bg-blue-700/50" : "bg-red-600/50"
                }`}
              />

              <div
                className={`text-xs leading-relaxed font-jakarta mt-2 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {/* Mobile */}
                <div className="md:hidden flex items-center gap-2">
                  <span>Universitas Andalas, Padang</span>
                </div>

                {/* Desktop */}
                <div className="hidden md:block">
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
              <div className="md:hidden mt-5">
                <div className="flex items-center gap-4">
                  {socialLinks.map(({ src, alt, href }) => (
                    <a
                      key={alt}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-300 hover:-translate-y-1"
                    >
                      <img
                        src={src}
                        alt={alt}
                        className={`h-5 w-5 object-contain ${
                          darkMode ? "" : "invert brightness-0"
                        }`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Only */}
          <div className="hidden md:block">
            <OurTeam />
          </div>

          <div className="hidden md:block">
            <QuickLinks />
          </div>

          <div className="hidden md:block">
            <Connect />
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-6 md:mt-12 pt-4 md:pt-6 border-t ${
            darkMode ? "border-slate-800" : "border-slate-200"
          } flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3`}
        >
          <p
            className={`text-xs font-medium text-left sm:text-left ${
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
