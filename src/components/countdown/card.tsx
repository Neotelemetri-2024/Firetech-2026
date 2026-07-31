import { motion } from "framer-motion";
import AnimatedDigit from "./animateddigit";
import { useTheme } from "../../context/themecontext";

interface Props {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Card({ days, hours, minutes, seconds }: Props) {
  const { darkMode } = useTheme();

  const countdown = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-full max-w-7xl px-6"
    >
      <div
        className={`relative overflow-hidden border backdrop-blur-xl ${
          darkMode
            ? "border-slate-300 bg-slate-100"
            : "border-white/15 bg-[#242B35]"
        }`}
        style={{
          clipPath:
            "polygon(0 22px,22px 0,calc(50% - 70px) 0,calc(50% - 40px) 26px,calc(50% + 40px) 26px,calc(50% + 70px) 0,calc(100% - 22px) 0,100% 22px,100% calc(100% - 22px),calc(100% - 22px) 100%,calc(50% + 70px) 100%,calc(50% + 40px) calc(100% - 26px),calc(50% - 40px) calc(100% - 26px),calc(50% - 70px) 100%,22px 100%,0 calc(100% - 22px))",
        }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-linear-to-br from-slate-50 via-slate-100 to-slate-200"
                : "bg-linear-to-br from-[#2A323D] via-[#242B35] to-[#1C232D]"
            }`}
          />

          <div className="absolute left-1/2 top-1/2 h-85 w-85 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/25 blur-[140px]" />

          <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-red-500/10 blur-[120px]" />
        </div>

        {/* Border Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-white/10" />

        {/* CONTENT */}
        <div className="relative z-10 px-5 py-10 md:px-8 md:py-16">
          {/* ================= MOBILE ================= */}
          <div
            className={`md:hidden rounded-3xl border p-4 ${
              darkMode
                ? "border-slate-300 bg-white/20"
                : "border-white/10 bg-black/10"
            } backdrop-blur-xl`}
          >
            <div className="grid grid-cols-2 gap-4">
              {countdown.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative overflow-hidden rounded-3xl border ${
                    darkMode
                      ? "border-slate-300 bg-white/60"
                      : "border-white/10 bg-white/4"
                  } h-38.75`}
                >
                  {/* Glow */}
                  <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-white/5" />

                  <div className="relative flex h-full flex-col items-center justify-center">
                    <AnimatedDigit value={item.value} />

                    <p
                      className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.35em] ${
                        darkMode ? "text-slate-700" : "text-slate-300"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-end justify-center gap-8">
            {countdown.map((item, index) => (
              <div key={item.label} className="flex items-end">
                <div className="text-center">
                  <AnimatedDigit value={item.value} />

                  <p
                    className={`mt-4 text-sm font-medium uppercase tracking-[0.3em] ${
                      darkMode ? "text-slate-700" : "text-slate-300"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>

                {index !== countdown.length - 1 && (
                  <div
                    className={`mb-10 px-5 text-7xl font-bold ${
                      darkMode ? "text-black" : "text-white"
                    }`}
                  >
                    :
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
