// Import React hooks untuk lifecycle management dan DOM manipulation
import { useTheme } from "../../../context/themecontext";
import { motion } from "framer-motion";
import Call from "../../button/call";
import baraLogo from "../../../assets/sponsor/Bara.webp";
import saynanaLogo from "../../../assets/sponsor/saynana.webp";

// Tipe data untuk sponsor dengan property name dan logo
type Sponsor = {
  name: string;
  logo: string;
};

// Data array sponsor - berisi 5 sponsor
const sponsors: Sponsor[] = [
  {
    name: "Sponsor 1",
    logo: baraLogo,
  },
  {
    name: "Sponsor 2",
    logo: saynanaLogo,
  },
];

// Main component untuk menampilkan sponsor dengan animasi
export default function Sponsor() {
  const { darkMode } = useTheme();

  return (
    <section className="relative overflow-hidden py-18">
      {/* Main content container1 */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <div className="sp-header mx-auto mb-24 max-w-3xl text-center">
          <div className="mb-8 text-center">
            <h2
              className={`
              text-5xl md:text-6xl
              font-black
              font-orbitron
              ${darkMode ? "text-black" : "text-white"}
              animate-[floating_5s_ease-in-out_infinite]
            `}
            >
              OUR SPONSOR
            </h2>

            <div
              className={`mx-auto mt-4 h-1 w-32 rounded-full  ${
                darkMode ? "bg-blue-700" : "bg-red-700"
              }`}
            />

            <p
              className={`mx-auto mt-7 max-w-3xl font-jakarta text-lg leading-8 ${darkMode ? "text-black" : "text-white"}`}
            >
              Didukung dengan bangga oleh para pemimpin industri, perusahaan
              inovatif, dan mitra berharga yang turut mewujudkan Firetech 2026.
            </p>
          </div>
        </div>
        {/* ===== Sponsor grid ===== */}
        <div className="mx-auto mb-24 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {sponsors.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="flex min-h-48 items-center cursor-pointer justify-center rounded-2xl border border-white/10 p-8"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-24 max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <Call
            phone="62895618028352"
            title="Jadilah Sponsor Kami"
            subtitle="Tertarik untuk mendukung Firetech 2026? Ayo diskusikan peluang sponsor dengan tim kami."
          />
        </div>

        {/* ===== Note ===== */}
        <p
          className={`mt-2 text-center font-space text-sm italic ${
            darkMode ? "text-slate-500" : "text-slate-500"
          }`}
        >
          * Daftar sponsor akan segera hadir — daftar resminya akan diumumkan
          dalam waktu dekat.
        </p>
      </div>
    </section>
  );
}
