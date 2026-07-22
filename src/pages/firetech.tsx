import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import FiretechLogo from "../assets/firetech.webp";
import { useTheme } from "../context/themecontext";
import ThemeSwitcher from "../components/themeswitcher";
import FiretechLogoBlack from "../assets/firetech1.webp";

const darkGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

const lightGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(248, 113, 113, 0.35) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.35) 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
};

export default function Firetech() {
  const [showAos, setShowAos] = useState(true);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShowAos(false);
    });

    return () => cancelAnimationFrame(frame);
  }, []);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleLogoClick = async () => {
    await controls.start({
      scale: [1, 1.3, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
    navigate("/dashboard");
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${
        darkMode ? "text-slate-900" : "text-white"
      }`}
      style={darkMode ? lightGradientStyle : darkGradientStyle}
    >
      {/* Fixed Background decorations dengan blur gradient effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Cyan gradient blob - top left */}
        <div className="absolute left-0 top-0 h-104 w-104 rounded-full bg-cyan-500/20 blur-[160px]" />

        {/* Blue gradient blob - bottom right */}
        <div className="absolute bottom-0 right-0 h-lg w-lg rounded-full bg-blue-500/20 blur-[170px]" />

        {/* Grid pattern overlay - subtle background texture */}
        <div
          className={`absolute inset-0 ${darkMode ? "opacity-[0.08]" : "opacity-[0.04]"}`}
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(rgba(15,23,42,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.25) 1px,transparent 1px)"
              : "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Logo with pulse */}
        <div data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
          <motion.button
            onClick={handleLogoClick}
            className="group relative mt-10 cursor-pointer border-0 bg-transparent p-0 outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Masuk ke halaman auth"
          >
            {/* Outer glow ring */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-2xl ${
                darkMode ? "bg-slate-900/10" : "bg-white/10"
              }`}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Pulse ring 1 */}
            <motion.div
              className={`absolute -inset-4 rounded-full border-2 ${
                darkMode ? "border-slate-700/30" : "border-white/20"
              }`}
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
            />
            {/* Pulse ring 2 */}
            <motion.div
              className={`absolute -inset-8 rounded-full border ${
                darkMode ? "border-slate-700/25" : "border-white/15"
              }`}
              animate={{
                scale: [1, 1.45, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
            {/* Pulse ring 3 */}
            <motion.div
              className={`absolute -inset-14 rounded-full border ${
                darkMode ? "border-slate-700/20" : "border-white/10"
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            />
            {/* Logo image */}
            <motion.img
              src={darkMode ? FiretechLogoBlack : FiretechLogo}
              alt="Firetech Logo"
              className="relative z-10 h-32 w-32 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] sm:h-40 sm:w-40 lg:h-48 lg:w-48"
              animate={controls}
            />
          </motion.button>
        </div>

        {/* Hint text */}
        <p
          className={`mt-8 text-xs sm:text-sm ${
            darkMode ? "text-slate-500" : "text-white/45"
          }`}
          {...(showAos
            ? {
                "data-aos": "fade-up",
                "data-aos-duration": "800",
                "data-aos-delay": "600",
              }
            : {})}
        >
          Klik logo untuk melanjutkan
        </p>
      </div>
    </div>
  );
}
