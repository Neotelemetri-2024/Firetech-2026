import { useTheme } from "../../context/themecontext";
import ThemeSwitcher from "../../components/themeswitcher";
import FiretechLogo from "../../assets/firetech.webp";
import FiretechLogoWhite from "../../assets/firetechwhite.webp";
import { motion } from "framer-motion";

const darkGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

const lightGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(248, 113, 113, 0.35) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.35) 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
};

export default function Auth() {
  const { darkMode } = useTheme();

  return (
    <div
      style={darkMode ? lightGradientStyle : darkGradientStyle}
      className="
    relative
    min-h-screen
    overflow-hidden
    text-white
  "
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

      {/* Theme Switcher */}
      <div
        data-aos="fade-down"
        data-aos-duration="600"
        data-aos-delay="200"
        className="absolute top-6 right-6 z-50"
      >
        <ThemeSwitcher />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8">
        {/* Left Side */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="fade-up"
            data-aos-delay="300"
            className={`mb-3 text-5xl font-semibold ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Welcome To
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            data-aos="fade-right"
            data-aos-delay="500"
            data-aos-duration="1000"
            className="mb-10 text-3xl font-black tracking-tight"
          >
            <span className={`${darkMode ? "text-red-700" : "text-blue-700"}`}>
              FIRE
            </span>

            <span className={`${darkMode ? "text-blue-700" : "text-red-700"}`}>
              TECH
            </span>

            <span
              className="
      ml-3
      bg-linear-to-r
      from-red-700
      to-blue-700
      bg-clip-text
      text-transparent
    "
            >
              2026
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "backOut" }}
            data-aos="zoom-in"
            data-aos-delay="700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              className={`
    group
    flex
    items-center
    justify-center
    gap-3
    rounded-xl
    border
    px-8
    py-2
    text-xl
    font-bold
    transition-all
    duration-300
    cursor-pointer
    hover:-translate-y-0.5

    ${
      darkMode
        ? `
          border-slate-300/60
          bg-white
          text-slate-800
          shadow-[0_0_20px_rgba(0,0,0,0.12)]
          hover:shadow-[0_0_30px_rgba(0,0,0,0.18)]
        `
        : `
          border-white/30
          bg-linear-to-r
          from-sky-700
          to-indigo-800
          text-white
          shadow-[0_0_20px_rgba(59,130,246,0.4)]
          hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]
        `
    }
  `}
            >
              Login dengan Google
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <svg width="28" height="28" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2c-2.1 1.6-4.7 2.4-7.3 2.4-5.2 0-9.6-3.3-11.1-8l-6.5 5C9.7 39.6 16.3 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.5-6.3 6.8l6.3 5.2C39.3 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"
                  />
                </svg>
              </motion.span>
            </button>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center right-12">
          <motion.img
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: [0, -8, 0] }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: "easeOut",
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.08,
            }}
            src={darkMode ? FiretechLogoWhite : FiretechLogo}
            alt="Firetech"
            className="
            cursor-pointer
              w-100
              object-contain
              drop-shadow-[0_0_50px_rgba(59,130,246,0.35)]
            "
          />
        </div>
      </div>
    </div>
  );
}
