// Import React hooks untuk lifecycle management dan DOM manipulation
import { useRef } from "react";
import { useTheme } from "../../../context/themecontext";
import { motion } from "framer-motion";
import { headingVariants } from "../../animations/headingvariants";

// Tipe data untuk media partner dengan property name dan logo
type MediaPartner = {
  name: string;
  logo: string;
};

// Data array media partner - berisi 4 media partner
const mediaPartners: MediaPartner[] = [
  {
    name: "Media Partner 1",
    logo: "/public/vite.svg",
  },
  {
    name: "Media Partner 2",
    logo: "/src/assets/event/fasttyping.webp",
  },
  {
    name: "Media Partner 3",
    logo: "/images/mediapartner3.png",
  },
  {
    name: "Media Partner 4",
    logo: "/images/mediapartner4.png",
  },
];

// Main component untuk menampilkan media partner dengan animasi
export default function MediaPartner() {
  // Reference ke section element untuk scroll trigger
  const sectionRef = useRef<HTMLElement>(null);
  const { darkMode } = useTheme();
  void mediaPartners; // media partner cards are temporarily commented out

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-18">
      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={headingVariants.title}
            className={`text-5xl font-black font-syncopate md:text-6xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            OUR MEDIA PARTNER
          </motion.h2>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-32 rounded-full  ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />

          {/* Deskripsi section */}
          <motion.p
            variants={headingVariants.subtitle}
            className={`mx-auto mt-7 max-w-3xl font-space text-lg leading-8  ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Together with our media partners, Firetech expands the reach of
            innovation, technology, and entrepreneurship to a wider audience.
          </motion.p>
        </motion.div>
        {/* ===== MEDIA PARTNER CARDS SECTION ===== */}
        {/* ===== Desktop Media Partner ===== */}

        <div className="hidden lg:block mp-marquee-wrapper relative mb-24 min-h-64 overflow-hidden">
          {/* <motion.div
            variants={headingVariants.marqueeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="mp-marquee-track flex w-max gap-12"
          >
            {[...mediaPartners, ...mediaPartners].map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                variants={headingVariants.marqueeItem}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                className="
          mp-card
          group
          relative
          w-64
          shrink-0
          overflow-hidden
          p-12
          cursor-pointer
          perspective-1000
        "
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="
            mp-logo
            relative
            z-20
            mx-auto
            h-24
            object-contain
            transition-all
            duration-500
            transform-3d
            group-hover:scale-110
          "
                />
              </motion.div>
            ))}
          </motion.div> */}

          {/* ===== Coming Soon Overlay - Desktop ===== */}
          <div className=" pointer-events-none absolute inset-0 z-30 flex items-center justify-center backdrop-blur-[2px]">
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

        {/* ===== Mobile Media Partner ===== */}
        <div className="relative min-h-48 lg:hidden">
          {/* <div className="grid grid-cols-2 gap-6">
            {mediaPartners.map((item) => (
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
          * Media partner lineup coming soon — the official list will be
          announced shortly.
        </motion.p>
      </div>
    </section>
  );
}
