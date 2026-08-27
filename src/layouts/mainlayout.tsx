import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ArrowButton from "../components/button/arrow";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/themecontext";


import { motion, useScroll } from "framer-motion";

const darkGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

const lightGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(248, 113, 113, 0.35) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.35) 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
};

export default function MainLayout() {
  const { darkMode } = useTheme();
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 z-9999 h-1 origin-left ${
          darkMode
            ? "bg-linear-to-r from-red-600 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
            : "bg-linear-to-r from-blue-600 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
        }`}
        style={{
          scaleX: scrollYProgress,
        }}
      />
      {/* Fixed Background */}
      <div
        className="fixed inset-0 -z-10"
        style={darkMode ? lightGradientStyle : darkGradientStyle}
      />

      {/* Fixed Background decorations dengan blur gradient effects */}
      <div className="fixed inset-0 overflow-hidden isolate -z-10 pointer-events-none">
        {/* Cyan gradient blob - desktop only */}
        <div
          className="
      hidden
      lg:block
      absolute
      left-0
      top-0
      h-100
      w-100
      rounded-full
      bg-cyan-500/10
      blur-[160px]
    "
        />

        {/* Blue gradient blob - desktop only */}
        <div
          className="
      hidden
      lg:block
      absolute
      right-0
      bottom-0
      h-125
      w-125
      rounded-full
      bg-blue-500/10
      blur-[170px]
    "
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        className={`min-h-screen overflow-x-hidden flex flex-col transition-all duration-500 ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>

      <ArrowButton />
    </>
  );
}
