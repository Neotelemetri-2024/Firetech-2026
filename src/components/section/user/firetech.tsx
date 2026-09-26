import { motion } from "framer-motion";
import {
  Network,
  Lightbulb,
  GraduationCap,
  Award,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "../../../context/themecontext";
import { headingVariants } from "../../animations/headingvariants";
import About from "../../../assets/about.webp";

type OverviewCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const overviewCards: OverviewCard[] = [
  {
    id: "01",
    icon: Network,
    title: "National Technology Hub",
    description:
      "Mempertemukan mahasiswa berbakat dari beragam latar belakang untuk bertukar gagasan, menampilkan kreativitas, dan membangun solusi inovatif berbasis teknologi.",
  },
  {
    id: "02",
    icon: Lightbulb,
    title: "Impact-Driven Innovation",
    description:
      "Mendorong peserta untuk mengembangkan teknologi yang tidak hanya menyelesaikan masalah tetapi juga menciptakan manfaat yang bermakna dan berkelanjutan bagi masyarakat.",
  },
  {
    id: "03",
    icon: GraduationCap,
    title: "Growth & Development",
    description:
      "Menyediakan kesempatan bagi peserta untuk memperkuat keahlian teknis, berpikir kritis, kepemimpinan, dan kerja tim melalui tantangan praktis.",
  },
  {
    id: "04",
    icon: Award,
    title: "Competitive Experience",
    description:
      "Menampilkan lima kategori kompetisi dinamis yang menginspirasi peserta untuk menunjukkan bakat mereka, menghadapi batas-batas, dan mencapai keunggulan.",
  },
];

export default function Firetech() {
  const { darkMode } = useTheme();

  return (
    <section className="relative overflow-hidden py-18">
      {/* Ambient glow blobs (dark mode only) */}
      {darkMode && (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full bg-cyan-500/20 blur-[200px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-blue-600/20 blur-[200px]"
          />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ===== Heading ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.h2
            variants={headingVariants.title}
            className={`text-5xl font-black font-orbitron md:text-6xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            WHAT IS FIRETECH
          </motion.h2>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-32 rounded-full ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />

          <motion.p
            variants={headingVariants.subtitle}
            className={`mx-auto mt-7 max-w-3xl font-jakarta  text-lg leading-8 ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Platform kolaboratif bagi pelajar untuk berinovasi, berjejaring, dan
            menciptakan dampak melalui teknologi.
          </motion.p>
        </motion.div>

        {/* ===== Overview ===== */}
        <motion.div
          variants={headingVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left: About Image */}
          <motion.div
            variants={headingVariants.card}
            className="order-1 relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="group relative"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-3xl blur-3xl transition-all duration-500 ${
                  darkMode ? "bg-blue-700/20" : "bg-red-700/20"
                }`}
              />

              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl ${
                  darkMode
                    ? "border-blue-700/20 bg-white"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <img
                  src={About}
                  alt="About Firetech"
                  className="h-65 w-85 object-cover transition-all duration-700 group-hover:scale-105 sm:h-80 sm:w-112.5 lg:h-90 lg:w-130"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: description */}
          <motion.div
            variants={headingVariants.subtitle}
            className="order-2 text-center lg:text-right"
          >
            <p
              className={`font-orbitron text-2xl font-bold ${
                darkMode ? "text-blue-700" : "text-red-700"
              }`}
            >
              HARMONIZING TECH AND HUMANITY
            </p>

            <div
              className={`mx-auto mt-4 h-1 w-24 rounded-full lg:ml-auto lg:mr-0 ${
                darkMode ? "bg-blue-700" : "bg-red-700"
              }`}
            />

            <p
              className={`mx-auto mt-7 max-w-xl font-jakarta text-lg leading-8 lg:mx-0 ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              Firetech adalah acara teknologi unggulan yang digagas oleh UKM Neo
              Telemetri, Universitas Andalas yang
              dirancang untuk memberdayakan mahasiswa melalui inovasi,
              kompetisi, dan pengalaman belajar kolaboratif.
            </p>

            <p
              className={`mx-auto mt-4 max-w-xl font-jakarta text-lg leading-8 lg:mx-0 ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              Melalui tema{" "}
              <span
                className={`font-semibold font-jakarta ${
                  darkMode ? "text-blue-700" : "text-red-700"
                }`}
              >
                "Creating Solutions For Better Society"
              </span>
              , Firetech 2026 menginspirasi para peserta untuk mengubah gagasan
              menjadi inovasi yang berdampak, serta mendorong lahirnya solusi
              yang berkontribusi pada masa depan yang lebih terhubung, inklusif,
              dan berkelanjutan.
            </p>
          </motion.div>
        </motion.div>

        {/* ===== Cards ===== */}
        <motion.div
          variants={headingVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-20  grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {overviewCards.map((card) => (
            <motion.div
              key={card.id}
              variants={headingVariants.card}
              className={`group relative overflow-hidden cursor-pointer rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-2 ${
                darkMode
                  ? "border-slate-200 bg-white hover:border-blue-700"
                  : "border-white/10 bg-white/5 hover:border-red-700"
              }`}
            >
              {/* Header */}
              <div className="relative flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                    darkMode
                      ? "bg-blue-700/10 text-blue-700"
                      : "bg-red-700/10 text-red-700"
                  }`}
                >
                  <card.icon className="h-7 w-7" />
                </div>

                <div>
                  <h3
                    className={`mt-1 text-lg font-semibold font-orbitron tracking-tight ${
                      darkMode ? "text-black" : "text-white"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p
                className={`relative mt-5 font-jakarta text-sm leading-7 ${
                  darkMode ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
