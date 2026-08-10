// Import React hooks untuk lifecycle management dan DOM manipulation
import { useTheme } from "../../../context/themecontext";
import { motion } from "framer-motion";
import { headingVariants } from "../../animations/headingvariants";

// Tipe data untuk sponsor dengan property name dan logo
type Sponsor = {
  name: string;
  logo: string;
};

// Data array sponsor - berisi 5 sponsor
const sponsors: Sponsor[] = [
  {
    name: "Sponsor 1",
    logo: "/public/vite.svg",
  },
  {
    name: "Sponsor 2",
    logo: "/public/tabaringpov.webp",
  },
  {
    name: "Sponsor 3",
    logo: "/images/sponsor3.png",
  },
  {
    name: "Sponsor 4",
    logo: "/images/sponsor4.png",
  },
  {
    name: "Sponsor 5",
    logo: "/images/sponsor5.png",
  },
];

// Main component untuk menampilkan sponsor dengan animasi
export default function Sponsor() {
  const { darkMode } = useTheme();
  void sponsors; // sponsor cards are temporarily commented out

  return (
    <section className="relative overflow-hidden py-18">
      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <div className="sp-header mx-auto mb-24 max-w-3xl text-center">
          <div className="mb-8 text-center">
            <motion.h2
              variants={headingVariants.title}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className={`
        text-5xl md:text-6xl
        font-black
        font-syncopate
        ${darkMode ? "text-black" : "text-white"}
        animate-[floating_5s_ease-in-out_infinite]
      `}
            >
              OUR SPONSOR
            </motion.h2>

            <motion.div
              custom={2}
              variants={headingVariants}
              className={`mx-auto mt-4 h-1 w-32 rounded-full  ${
                darkMode ? "bg-blue-700" : "bg-red-700"
              }`}
            />

            <motion.p
              variants={headingVariants.subtitle}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className={`mx-auto mt-7 max-w-3xl font-space text-lg leading-8 ${darkMode ? "text-slate-600" : "text-slate-400"}`}
            >
              Proudly supported by industry leaders, innovative companies, and
              valued partners who help make Firetech 2026 possible.
            </motion.p>
          </div>
        </div>
        {/* ===== SPONSOR CARDS SECTION ===== */}
        {/* ===== Desktop Sponsor ===== */}

        <div className="hidden lg:block sp-marquee-wrapper relative mb-24 min-h-64 overflow-hidden">
          {/* <motion.div
            variants={headingVariants.marqueeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
            }}
            className="sp-marquee-track flex w-max gap-8"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...sponsors, ...sponsors].map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                variants={headingVariants.marqueeItem}
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="
          sp-card
          group
          relative
          w-64
          shrink-0
          overflow-hidden
          p-8
          cursor-pointer
          perspective-1000
        "
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="
            sp-logo
            relative
            z-20
            mx-auto
            h-24
            object-contain
          "
                />
              </motion.div>
            ))}
          </motion.div> */}

          {/* ===== Coming Soon Overlay - Desktop ===== */}
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center backdrop-blur-[2px]">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`inline-flex items-center gap-3 rounded-full border-2 border-dashed px-8 py-4 font-syncopate text-2xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.25)] sm:px-10 sm:py-5 sm:text-3xl ${
                darkMode
                  ? "border-blue-700 bg-white/80 text-blue-700"
                  : "border-red-700 bg-black/70 text-red-700"
              }`}
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-current" />
              </span>
              Coming Soon
            </motion.div>
          </div>
        </div>

        {/* ===== Mobile Sponsor ===== */}
        <div className="relative min-h-48 lg:hidden">
          {/* <div className="grid grid-cols-2 gap-6">
            {sponsors.map((item) => (
              <div
                key={item.name}
                className="
        flex
        items-center
        justify-center
        rounded-2xl
        border
        border-white/10
        p-6
      "
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-16 object-contain"
                />
              </div>
            ))}
          </div> */}

          {/* ===== Coming Soon Overlay - Mobile ===== */}
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center rounded-2xl backdrop-blur-[2px] ">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`inline-flex items-center gap-2 rounded-full border-2 border-dashed px-5 py-3 font-syncopate text-base font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${
                darkMode
                  ? "border-blue-700 bg-white/80 text-blue-700"
                  : "border-red-700 bg-black/70 text-red-700"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
              </span>
              Coming Soon
            </motion.div>
          </div>
        </div>

        {/* ===== Note ===== */}
        <motion.p
          variants={headingVariants.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.3,
          }}
          className={`mt-2 text-center font-space text-sm italic ${
            darkMode ? "text-slate-500" : "text-slate-500"
          }`}
        >
          * Sponsor lineup coming soon — the official list will be announced
          shortly.
        </motion.p>
      </div>
    </section>
  );
}
