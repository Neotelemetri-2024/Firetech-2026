import { useTheme } from "../../context/themecontext";

import Instagram from "../../assets/socialmedia/instagram.webp";
import Linkedin from "../../assets/socialmedia/linkedin.webp";
import Github from "../../assets/socialmedia/github.webp";
import Youtube from "../../assets/socialmedia/youtube.webp";
import TikTok from "../../assets/socialmedia/tiktok.webp";

import { Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  {
    src: Instagram,
    alt: "Instagram",
    href: "https://www.instagram.com/neotelemetri/",
    label: "Instagram",
  },
  {
    src: Linkedin,
    alt: "Linkedin",
    href: "https://www.linkedin.com/company/neotelemetri/",
    label: "LinkedIn",
  },
  {
    src: Github,
    alt: "Github",
    href: "https://github.com/Neotelemetri-2024",
    label: "GitHub",
  },
  {
    src: Youtube,
    alt: "Youtube",
    href: "https://youtube.com/@neotelemetri?si=kn0nRkzjQDjCvVuu",
    label: "YouTube",
  },
  {
    src: TikTok,
    alt: "TikTok",
    href: "https://www.tiktok.com/@neotelemetri",
    label: "TikTok",
  },
];

const contactInfo = {
  email: "neotelemetri.unand@gmail.com",
  phone1: "0898-8479-252 (Kevin)",
  phone2: "0895-6180-28352 (Azlin)",
  address: "Limau Manis, Kec. Pauh, Kota Padang, Sumatera Barat 25176",
};

export default function Connect() {
  const { darkMode } = useTheme();

  const accentColor = darkMode
    ? "text-red-700"
    : "text-blue-700";

  return (
    <div className="flex flex-col items-start gap-5">
      <span
        className={`text-sm font-bold uppercase tracking-widest ${
          darkMode ? "text-slate-300" : "text-slate-600"
        }`}
      >
        Connect With Us
      </span>

      <div className="flex flex-wrap gap-2.5">
        {socialLinks.map(({ src, alt, href, label }) => (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`group relative p-2.5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
              darkMode
                ? "border-slate-700 bg-slate-900 hover:bg-red-700 hover:border-red-600 hover:shadow-[0_0_20px_rgba(185,28,28,0.35),0_8px_25px_rgba(185,28,28,0.25)]"
                : "border-slate-200 bg-slate-50 hover:bg-blue-700 hover:border-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.35),0_8px_25px_rgba(37,99,235,0.25)]"
            }`}
          >
            <img
              src={src}
              alt={alt}
              className={`h-5 w-5 object-contain transition-all duration-200 group-hover:scale-110 ${
                darkMode ? "invert brightness-0" : ""
              }`}
            />
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-3 text-sm w-full">
        <div
          className={`flex items-start gap-2.5 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <Mail
            size={15}
            className={`${accentColor} mt-0.5 shrink-0`}
          />

          <span className="break-all">
            {contactInfo.email}
          </span>
        </div>

        <div
          className={`flex items-start gap-2.5 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <Phone
            size={15}
            className={`${accentColor} mt-0.5 shrink-0`}
          />

          <div>
            <div>{contactInfo.phone1}</div>
            <div>{contactInfo.phone2}</div>
          </div>
        </div>

        <div
          className={`flex items-start gap-2.5 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <MapPin
            size={15}
            className={`${accentColor} mt-0.5 shrink-0`}
          />

          <span className="leading-relaxed">
            {contactInfo.address}
          </span>
        </div>
      </div>
    </div>
  );
}