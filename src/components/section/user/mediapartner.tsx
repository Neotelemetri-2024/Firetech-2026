// Import React hooks untuk lifecycle management dan DOM manipulation
import { useTheme } from "../../../context/themecontext";
import { motion } from "framer-motion";
import Call from "../../button/call";
import lombaTeknoLogo from "../../../assets/mediapartner/lombatekno.webp";
import lombaUiuxLogo from "../../../assets/mediapartner/lombauiux.webp";
import teknoEventCampusLogo from "../../../assets/mediapartner/teknoeventcampus.webp";
import logoTeknoEventLogo from "../../../assets/mediapartner/teknoevent.webp";

// Tipe data untuk media partner dengan property name dan logo
type MediaPartner = {
  name: string;
  logo: string;
};

// Data array media partner - berisi 4 media partner
const mediaPartners: MediaPartner[] = [
  {
    name: "Media Partner 1",
    logo: lombaTeknoLogo,
  },
  {
    name: "Media Partner 2",
    logo: lombaUiuxLogo,
  },
  {
    name: "Media Partner 3",
    logo: teknoEventCampusLogo,
  },
  {
    name: "Media Partner 4",
    logo: logoTeknoEventLogo,
  },
];

// Main component untuk menampilkan media partner dengan animasi
export default function MediaPartner() {
  const { darkMode } = useTheme();

  return (
    <section className="relative overflow-hidden py-18">
      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <div className="mx-auto mb-24 max-w-3xl text-center">
          {/* Heading */}
          <h2
            className={`text-5xl font-black font-orbitron md:text-6xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            OUR MEDIA PARTNER
          </h2>

          <div
            className={`mx-auto mt-4 h-1 w-32 rounded-full  ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />

          {/* Deskripsi section */}
          <p
            className={`mx-auto mt-7 max-w-3xl font-jakarta text-lg leading-8  ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Bersama mitra media kami, Firetech memperluas jangkauan inovasi,
            teknologi, dan kewirausahaan kepada audiens yang lebih luas.
          </p>
        </div>
        {/* ===== Media partner grid ===== */}
        <div className="mx-auto mb-24 grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4">
          {mediaPartners.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex min-h-40 items-center cursor-pointer justify-center rounded-2xl border border-white/10 p-6 sm:min-h-48 sm:p-8"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-20 max-w-full object-contain sm:h-24"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <Call
            phone="62895618028352"
            title="Jadilah Mitra Media Kami"
            subtitle="Bekerja sama dengan Firetech 2026 dan bantu gaungkan inovasi, teknologi, serta kewirausahaan."
          />
        </div>

        {/* ===== Note ===== */}
        <p
          className={`mt-2 text-center font-space text-sm italic ${
            darkMode ? "text-slate-500" : "text-slate-500"
          }`}
        >
          * Daftar mitra media akan segera hadir — daftar resminya akan
          diumumkan dalam waktu dekat.
        </p>
      </div>
    </section>
  );
}
