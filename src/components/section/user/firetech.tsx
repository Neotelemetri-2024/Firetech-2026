import { motion } from "framer-motion";
import {
  Network,
  Lightbulb,
  GraduationCap,
  Award,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "../../../context/themecontext";
import { headingVariants } from "../../animations/headingvariants";
import FiretechLogo from "../../../assets/firetech.webp";

type OverviewCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const overviewCards: OverviewCard[] = [
  {
    id: "01",
    icon: Network,
    title: "National Technology Hub",
    description:
      "Bringing together talented students from diverse backgrounds to exchange ideas, showcase creativity, and build innovative technology-driven solutions.",
  },
  {
    id: "02",
    icon: Lightbulb,
    title: "Impact-Driven Innovation",
    description:
      "Encouraging participants to develop technology that not only solves problems but also creates meaningful and lasting benefits for society.",
  },
  {
    id: "03",
    icon: GraduationCap,
    title: "Growth & Development",
    description:
      "Providing opportunities for participants to strengthen technical expertise, critical thinking, leadership, and teamwork through practical challenges.",
  },
  {
    id: "04",
    icon: Award,
    title: "Competitive Experience",
    description:
      "Featuring five dynamic competition categories that inspire participants to demonstrate their talents, push their limits, and achieve excellence.",
  },
];

export default function Firetech() {
  const { darkMode } = useTheme();

  return (
    <section className="relative overflow-hidden py-18">
      {/* Ambient glow blobs (dark mode only) */}
      {darkMode && (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full bg-cyan-500/20 blur-[200px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-blue-600/20 blur-[200px]"
          />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ===== Heading ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.h2
            variants={headingVariants.title}
            className={`text-5xl font-black font-syncopate md:text-6xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            WHAT IS FIRETECH
          </motion.h2>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-32 rounded-full ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />

          <motion.p
            variants={headingVariants.subtitle}
            className={`mx-auto mt-7 max-w-3xl font-space text-lg leading-8 ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            A collaborative technology platform where students transform ideas
            into innovation, connect with future changemakers, and create
            meaningful impact through technology.
          </motion.p>
        </motion.div>

        {/* ===== Overview ===== */}
        <motion.div
          variants={headingVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left: logo */}
          <motion.div
            variants={headingVariants.card}
            className="order-1 relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-3"
            >
              <img
                src={FiretechLogo}
                alt="Firetech Logo"
                className="h-auto w-full max-w-md object-contain select-none"
              />
            </motion.div>
          </motion.div>

          {/* Right: description */}
          <motion.div
            variants={headingVariants.subtitle}
            className="order-2 text-center lg:text-right"
          >
            <p
              className={`font-orbitron text-2xl font-bold ${
                darkMode ? "text-blue-700" : "text-red-700"
              }`}
            >
              HARMONIZING TECH AND HUMANITY
            </p>

            <div
              className={`mx-auto mt-4 h-1 w-24 rounded-full lg:ml-auto lg:mr-0 ${
                darkMode ? "bg-blue-700" : "bg-red-700"
              }`}
            />

            <p
              className={`mx-auto mt-7 max-w-xl font-space text-lg leading-8 lg:mx-0 ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              Firetech is a flagship technology event initiated by Neo
              Telemetri, Faculty of Information Technology, Andalas University,
              designed to empower students through innovation, competition, and
              collaborative learning experiences.
            </p>

            <p
              className={`mx-auto mt-4 max-w-xl font-space text-lg leading-8 lg:mx-0 ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              Through the theme{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-blue-700" : "text-red-700"
                }`}
              >
                "Creating Solutions For Better Society"
              </span>
              , Firetech 2026 inspires participants to transform ideas into
              impactful innovations, fostering solutions that contribute to a
              more connected, inclusive, and sustainable future.
            </p>
          </motion.div>
        </motion.div>

        {/* ===== Cards ===== */}
        <motion.div
          variants={headingVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-20  grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {overviewCards.map((card) => (
            <motion.div
              key={card.id}
              variants={headingVariants.card}
              className={`group relative overflow-hidden cursor-pointer rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-2 ${
                darkMode
                  ? "border-slate-200 bg-white hover:border-blue-700"
                  : "border-white/10 bg-white/5 hover:border-red-700"
              }`}
            >
              {/* Header */}
              <div className="relative flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                    darkMode
                      ? "bg-blue-700/10 text-blue-700"
                      : "bg-red-700/10 text-red-700"
                  }`}
                >
                  <card.icon className="h-7 w-7" />
                </div>

                <div>
                  <h3
                    className={`mt-1 text-lg font-semibold tracking-tight ${
                      darkMode ? "text-black" : "text-white"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p
                className={`relative mt-5 text-sm leading-7 ${
                  darkMode ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
