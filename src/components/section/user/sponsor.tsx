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

            <motion.p
              variants={headingVariants.subtitle}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className={`mx-auto mt-7 max-w-3xl font-space text-lg leading-8 ${
                darkMode ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Proudly supported by industry leaders, innovative companies, and
              valued partners who help make Firetech 2026 possible.
            </motion.p>
          </div>
        </div>
        {/* ===== SPONSOR CARDS SECTION ===== */}
        <div className="sp-marquee-wrapper relative mb-24 overflow-hidden">
          <motion.div
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
          </motion.div>
        </div>{" "}
      </div>
    </section>
  );
}
