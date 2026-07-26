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
        <motion.div
          variants={headingVariants.marqueeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="hidden lg:block mp-marquee-wrapper relative mb-24 overflow-hidden"
        >
          <div className="mp-marquee-track flex w-max gap-12">
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
          </div>
        </motion.div>
        {/* ===== Mobile Media Partner ===== */}

        <div className="grid grid-cols-2 gap-6 lg:hidden">
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
        </div>
      </div>
    </section>
  );
}
