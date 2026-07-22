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
                  <div className="animated-border rounded-3xl md:rounded-4xl p-px">
                    <div
                      className={`relative overflow-hidden rounded-3xl md:rounded-4xl backdrop-blur-3xl transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-[1.03] ${
                        darkMode
                          ? "border border-white/10 bg-[#07111F]/80 group-hover:border-white/20"
                          : "border border-slate-200 bg-white/80 shadow-lg group-hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`absolute inset-x-0 top-0 h-24 bg-linear-to-b ${
                          darkMode
                            ? "from-white/10 to-transparent"
                            : "from-slate-100/80 to-transparent"
                        }`}
                      />
                      <div
                        className={`absolute inset-0 bg-linear-to-b ${item.glow} opacity-20`}
                      />
                      <div
                        className={`absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl ${
                          darkMode ? "bg-red-500/20" : "bg-blue-500/15"
                        }`}
                      />

                      {/* 
                        PERBAIKAN 3: Ukuran kotak (w dan h) dibuat responsive mengikuti ukuran layar.
                      */}
                      <div className="relative flex h-30 w-20 sm:h-40 sm:w-30 md:h-45 md:w-35 lg:h-55 lg:w-47.5 flex-col items-center justify-center">
                        <AnimatedDigit value={values[item.key]} />

                        <div className="mt-3 md:mt-5 h-px w-12 md:w-20 bg-linear-to-r from-transparent via-red-400 to-transparent transition-all duration-500 group-hover:w-16 md:group-hover:w-28" />

                        <span
                          className={`mt-3 md:mt-5 text-[9px] md:text-xs font-semibold uppercase tracking-[0.25em] md:tracking-[0.45em] transition-colors duration-300 ${
                            darkMode
                              ? "text-slate-400 group-hover:text-white"
                              : "text-slate-600 group-hover:text-slate-900"
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
                          darkMode ? "via-red-500/50" : "via-blue-500/50"
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
                            ? "bg-red-400 shadow-[0_0_18px_rgba(248,113,113,.9)]"
                            : "bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,.9)]"
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
