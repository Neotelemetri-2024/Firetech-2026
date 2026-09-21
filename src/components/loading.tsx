import { motion } from "framer-motion";
import { useState } from "react";
import logo from "../assets/firetech.webp";

const FIRE_COLORS = ["#fde047", "#facc15", "#fb923c", "#f97316", "#ef4444"];

const pickColor = () =>
  FIRE_COLORS[Math.floor(Math.random() * FIRE_COLORS.length)];

// Data generator dipanggil hanya sekali (lazy init) → Math.random aman dari render

function createEmbers() {
  return Array.from({ length: 28 }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 160,
    color: pickColor(),
  }));
}

function createSmoke() {
  return Array.from({ length: 6 }, (_, id) => ({
    id,
    left: 8 + Math.random() * 84,
    size: 140 + Math.random() * 200,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    drift: (Math.random() - 0.5) * 140,
  }));
}

export default function Loading() {
  const [embers] = useState(createEmbers);
  const [smoke] = useState(createSmoke);

  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        y: "-100%",
      }}
      transition={{
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="
      fixed inset-0 z-9999 overflow-hidden
      shadow-[0_30px_80px_rgba(0,0,0,0.35)]
    "
      style={{
        background: `
      radial-gradient(
        circle at 30% 20%,
        rgba(185, 28, 28, 0.6) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 80%,
        rgba(29, 78, 216, 0.6) 0%,
        transparent 50%
      ),
      linear-gradient(
        180deg,
        #0f172a 0%,
        #1e293b 100%
      )
    `,
      }}
    >
      {/* ===== Bottom fire glow (bara api) ===== */}
      <motion.div
        className="absolute bottom-[-30%] left-1/2 h-[70vh] w-[140vw] -translate-x-1/2 rounded-[50%] blur-[110px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(249,115,22,0.55) 0%, rgba(220,38,38,0.25) 40%, transparent 70%)",
        }}
        animate={{
          opacity: [0.7, 1, 0.75, 0.95, 0.7],
          scale: [1, 1.06, 0.98, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===== Smoke plumes ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {smoke.map((s) => (
          <motion.div
            key={s.id}
            className="absolute bottom-0 rounded-full bg-stone-300/12 blur-3xl"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              marginLeft: -s.size / 2,
            }}
            animate={{
              y: [0, -520],
              x: [0, s.drift, s.drift / 2],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.6, 2.2],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* ===== Continuous embers ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {embers.map((e) => (
          <motion.span
            key={e.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              backgroundColor: e.color,
              boxShadow: `0 0 12px 2px ${e.color}`,
            }}
            animate={{
              y: [0, -640],
              x: [0, e.drift, 0],
              opacity: [0, 1, 0.6, 0],
              scale: [1, 0.3],
            }}
            transition={{
              duration: e.duration,
              repeat: Infinity,
              delay: e.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* ===== Center content ===== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6">
        {/* Logo + lidah api */}
        <div className="relative flex items-center justify-center">
          {/* Logo (wrapper untuk blur-in agar tidak menimpa drop-shadow) */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              y: [0, -6, 0],
            }}
            exit={{
              opacity: 0,
              scale: 1.25,
              filter: "blur(12px)",
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.6 },
              filter: { duration: 0.6 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative"
          >
            <img
              src={logo}
              alt="Firetech"
              className="w-28"
              style={{ filter: "drop-shadow(0 0 24px rgba(249,115,22,0.8))" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
