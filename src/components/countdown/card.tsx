import AnimatedDigit from "./animateddigit";
import { motion } from "framer-motion";
import { useTheme } from "../../context/themecontext";

interface Props {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const countdownItems = [
  {
    key: "days",
    label: "Days",
    color: "red",
    glow: "from-red-500/30 via-red-500/10 to-transparent",
  },
  {
    key: "hours",
    label: "Hours",
    color: "amber",
    glow: "from-amber-500/30 via-amber-500/10 to-transparent",
  },
  {
    key: "minutes",
    label: "Minutes",
    color: "cyan",
    glow: "from-cyan-500/30 via-cyan-500/10 to-transparent",
  },
  {
    key: "seconds",
    label: "Seconds",
    color: "blue",
    glow: "from-blue-500/30 via-blue-500/10 to-transparent",
  },
] as const;

export default function Card({ days, hours, minutes, seconds }: Props) {
  const { darkMode } = useTheme();
  const values = {
    days,
    hours,
    minutes,
    seconds,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-7xl"
    >
      {/* Main Card */}
      <div className="relative">
        {/* 
          PERBAIKAN 1: overflow-x-auto dihapus, diganti w-full dengan padding yang menyesuaikan layar
        */}
        <div className="relative px-2 py-10 md:px-6 md:py-16 w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3,
                },
              },
            }}
            className="mx-auto flex w-full flex-nowrap items-center justify-center gap-2 md:gap-4 lg:gap-0"
          >
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.key}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                    scale: 0.8,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                    },
                  },
                }}
                className="flex items-center"
              >
                <div className="group relative cursor-pointer">
                  <div
                    className={`absolute -inset-4 rounded-[36px] bg-linear-to-br ${item.glow} opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100`}
                  />
                  <div className="rounded-3xl md:rounded-4xl p-px">
                    <div
                      className={`relative overflow-hidden rounded-3xl md:rounded-4xl backdrop-blur-3xl transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-[1.03] ${
                        darkMode
                          ? "border border-slate-200 bg-linear-to-br from-white via-slate-50 to-slate-100 shadow-lg group-hover:border-slate-300"
                          : "border border-white/10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.45)] group-hover:border-white/20"
                      }`}
                    >
                      {/* Top Overlay */}
                      <div
                        className={`absolute inset-x-0 top-0 h-28 bg-linear-to-b ${
                          darkMode
                            ? "from-white/70 via-red-100/30 to-transparent"
                            : "from-black/80 via-red-950/20 to-transparent"
                        }`}
                      />

                      {/* Main Background Gradient */}
                      <div
                        className={`absolute inset-0 ${
                          darkMode
                            ? "bg-linear-to-br from-red-600/15 via-transparent to-blue-600/15"
                            : "bg-linear-to-br from-red-500/10 via-transparent to-blue-500/10"
                        }`}
                      />

                      {/* Blue Glow */}
                      <div
                        className={`absolute -top-10 -right-10 h-36 w-36 rounded-full blur-3xl ${
                          darkMode ? "bg-blue-600/30" : "bg-blue-500/20"
                        }`}
                      />

                      {/* Red Glow */}
                      <div
                        className={`absolute -bottom-10 -left-10 h-36 w-36 rounded-full blur-3xl ${
                          darkMode ? "bg-blue-500/20" : "bg-red-500/20"
                        }`}
                      />

                      {/* Center Glow */}
                      <div
                        className={`absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-[80px] ${
                          darkMode
                            ? "bg-linear-to-r from-red-500/30 to-blue-500/30"
                            : "bg-linear-to-r from-red-600/40 to-blue-600/40"
                        }`}
                      />

                      {/* Shine */}
                      <div
                        className={`absolute -left-24 top-0 h-full w-16 rotate-12 bg-linear-to-r transition-all duration-700 group-hover:left-[120%] ${
                          darkMode
                            ? "from-transparent via-slate-900/10 to-transparent"
                            : "from-transparent via-white/15 to-transparent"
                        }`}
                      />
                      {/* 
                        PERBAIKAN 3: Ukuran kotak (w dan h) dibuat responsive mengikuti ukuran layar.
                      */}
                      <div className="relative flex h-16 w-12 sm:h-28 sm:w-24 md:h-45 md:w-35 lg:h-55 lg:w-47.5 flex-col items-center justify-center">
                        <AnimatedDigit value={values[item.key]} />

                        <div
                          className={`mt-2 sm:mt-3 md:mt-5 h-px w-10 sm:w-12 md:w-20 bg-linear-to-r from-transparent 
                            to-transparent transition-all duration-500 group-hover:w-14 sm:group-hover:w-16 md:group-hover:w-28 ${
                              darkMode ? "via-blue-600" : "via-red-600"
                            }`}
                        />

                        <span
                          className={`mt-2 sm:mt-3 md:mt-5 text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.45em] transition-colors duration-300 ${
                            darkMode ? "text-black" : "text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 
                  PERBAIKAN 4: Lebar konektor (garis titik) ikut dikecilkan di layar yang lebih sempit
                */}
                {index !== countdownItems.length - 1 && (
                  <div className="hidden sm:flex items-center px-1 md:px-2 lg:px-5">
                    <div className="relative flex items-center">
                      <div
                        className={`h-px w-8 md:w-12 lg:w-20 bg-linear-to-r from-transparent ${
                          darkMode ? "via-blue-600" : "via-red-600"
                        } to-transparent`}
                      />
                      <motion.span
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${
                          darkMode
                            ? "bg-blue-600 shadow-[0_0_18px_rgba(248,113,113,.9)]"
                            : "bg-red-600 shadow-[0_0_18px_rgba(59,130,246,.9)]"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
