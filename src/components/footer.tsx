import { useTheme } from "../context/themecontext";
import Instagram from "../assets/socialmedia/instagram.webp";
import Linkedin from "../assets/socialmedia/linkedin.webp";
import Github from "../assets/socialmedia/github.webp";
import Youtube from "../assets/socialmedia/youtube.webp";
import TikTok from "../assets/socialmedia/tiktok.webp";

const navItems = ["Home", "About", "Event", "Contact"];

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`w-full border-t py-8 mt-16 ${
        darkMode ? "bg-black border-slate-700" : "bg-white border-slate-200"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 px-4">
        {/* Logo */}
        <div className="shrink-0 flex items-center">
          <span
            className={`text-2xl font-extrabold ${darkMode ? "text-white" : "text-black"}`}
          >
            Firetech
          </span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center">
          <span
            className={`font-semibold mb-2 ${darkMode ? "text-slate-200" : "text-slate-700"}`}
          >
            Quick Links
          </span>
          <ul className="flex flex-col md:flex-row gap-2 md:gap-6">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`transition ${
                    darkMode
                      ? "text-slate-300 hover:text-pink-400"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex gap-4">
          {[
            {
              src: Instagram,
              alt: "Instagram",
              href: "https://www.instagram.com/neotelemetri/",
            },
            {
              src: Linkedin,
              alt: "Linkedin",
              href: "https://www.linkedin.com/company/neotelemetri/",
            },
            {
              src: Github,
              alt: "Github",
              href: "https://github.com/Neotelemetri-2024",
            },
            {
              src: Youtube,
              alt: "Youtube",
              href: "https://youtube.com/@neotelemetri?si=kn0nRkzjQDjCvVuu",
            },
            {
              src: TikTok,
              alt: "TikTok",
              href: "https://www.tiktok.com/@neotelemetri",
            },
          ].map(({ src, alt, href }) => (
            <a
              key={alt}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={alt}
              className="hover:opacity-80"
            >
              <img
                src={src}
                alt={alt}
                className={`h-6 w-6 object-contain ${darkMode ? "invert brightness-50" : ""}`}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
