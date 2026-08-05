import { useTheme } from "../../../context/themecontext";
import FiretechHero from "../../../assets/firetech.webp";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="relative w-full overflow-hidden top-6">
      {/* Glow Background */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        hidden
lg:block
absolute left-0 top-20 h-125 w-125 rounded-full bg-blue-600/20 blur-[200px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="
    hidden
    lg:block
    absolute
    bottom-20
    right-0
    h-125
    w-125
    rounded-full
    bg-cyan-500/20
    blur-[200px]
  "
      />

      <main className="mx-auto w-full max-w-[1700px] px-6 py-12 lg:px-10">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* ================= LEFT ================= */}
            <div
              className="
              relative
              z-10
              flex
              flex-col
              items-center
              text-center
              lg:block
              lg:text-left
              lg:translate-x-20
            "
            >
              {/* Logo hanya tampil di mobile */}
              <motion.div
                variants={itemVariants}
                className="mb-8 flex justify-center lg:hidden"
              >
                <motion.div animate={floatAnimation}>
                  <img
                    src={FiretechHero}
                    alt="Firetech Hero"
                    className="
                    w-72
                    max-w-full
                    object-contain
                    select-none
                  "
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1
                  className="
                  mt-8
                  text-6xl
                  font-black
                  uppercase
                  leading-[0.85]
                  tracking-[4px]
                  lg:text-8xl
                "
                >
                  <span className={darkMode ? "text-blue-700" : "text-red-700"}>
                    FIRE
                  </span>
                  <span className={darkMode ? "text-red-700" : "text-blue-700"}>
                    TECH
                  </span>
                </h1>
              </motion.div>

              {/* Accent Line */}
              <motion.div
                variants={itemVariants}
                className="relative mt-5 flex flex-col items-center lg:items-start"
              >
                <div
                  className={`
                    h-2
                    w-72
                    rounded-full
                    ${
                      darkMode
                        ? "bg-blue-500 shadow-cyan-500/30"
                        : "bg-red-600 shadow-blue-500/30"
                    }
                    shadow-lg
                  `}
                />

                <div
                  className={`
                    mt-2
                    h-2
                    w-48
                    rounded-full
                    ${
                      darkMode
                        ? "bg-red-500 shadow-blue-500/20"
                        : "bg-blue-600 shadow-red-500/20"
                    }
                    shadow-lg
                  `}
                />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className={`
                mt-6
                text-xl
                font-extrabold
                tracking-wide
                bg-linear-to-r
                ${darkMode ? "from-blue-700 to-red-700" : "from-red-700 to-blue-700"}
                bg-clip-text
                text-transparent
              `}
              >
                Harmonizing Tech And Humanity
              </motion.p>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className={`
                  mt-6
                  max-w-xl
                  text-center
                  lg:text-justify
                  text-base
                  leading-relaxed
                  lg:text-lg
                  ${darkMode ? "text-black" : "text-white"}
                `}
              >
                Firetech adalah kegiatan tahunan dari UKM Neo Telemetri
                Universitas Andalas yang bertujuan untuk mengembangkan bakat
                siswa dan mahasiswa di bidang teknologi informasi. Pada tahun
                ini Firetech mengangkat tema
                <span
                  className={`
                    font-semibold
                    ${darkMode ? "text-blue-700" : "text-red-700"}
                  `}
                >
                  {" "}
                  "Creating Solutions For Better Society"
                </span>
                , sebuah wadah bagi generasi muda untuk berinovasi,
                berkolaborasi, dan menciptakan solusi teknologi yang berdampak
                bagi masyarakat.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="
                mt-10
                flex
                flex-wrap
                justify-center
                gap-5
                lg:justify-start
              "
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    px-9
                    font-semibold
                    py-3.5
                    tracking-wider
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    cursor-pointer
                    ${
                      darkMode
                        ? "border-black bg-transparent text-black"
                        : "border-white/50 bg-transparent text-white"
                    }
                  `}
                >
                  <span className="relative z-10">Guidebook</span>
                  <div
                    className={`
                    absolute
                    inset-0
                    -translate-x-full
                    transition-transform
                    duration-500
                    group-hover:translate-x-0
                    ${darkMode ? "bg-black/10" : "bg-white/10"}
                  `}
                  />
                </motion.button>
              </motion.div>
            </div>

            {/* ================= RIGHT ================= */}
            <motion.div
              variants={itemVariants}
              className="
              relative
              hidden
              lg:flex
              justify-center
              lg:justify-end
              lg:-translate-x-24
            "
            >
              <motion.div animate={floatAnimation} className="relative p-3">
                <img
                  src={FiretechHero}
                  alt="Firetech Hero"
                  className="
                    h-auto
                    w-full
                    max-w-162.5
                    object-contain
                    select-none
                  "
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Dashboard;
