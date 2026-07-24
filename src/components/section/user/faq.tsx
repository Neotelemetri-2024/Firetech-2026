import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTheme } from "../../../context/themecontext";

const faqData = [
  {
    id: "01",
    question: "What are the registration requirements for Firetech 2026?",
    answer:
      "Participants must be active university students and meet the eligibility requirements established by the Firetech 2026 organizing committee.",
  },
  {
    id: "02",
    question: "When does the registration period begin?",
    answer:
      "Registration opens on August 1, 2026, according to the official event timeline.",
  },
  {
    id: "03",
    question: "What benefits will participants receive?",
    answer:
      "Participants will receive a certificate, valuable competition experience, networking opportunities, and the chance to win exciting prizes.",
  },
  {
    id: "04",
    question: "Where will Firetech 2026 be held?",
    answer:
      "The event will take place at the Faculty of Information Technology, Universitas Andalas.",
  },
  {
    id: "05",
    question: "How can I register for Firetech 2026?",
    answer:
      "Participants can register through the official Firetech 2026 website during the registration period.",
  },
  {
    id: "06",
    question: "Who can I contact for more information?",
    answer:
      "For further assistance, please contact the official Contact Person listed on the Contact page.",
  },
];

/* ——— Stagger variants for the whole section ——— */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  const { darkMode } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  const leftColumn = faqData.slice(0, 3);
  const rightColumn = faqData.slice(3, 6);

  const renderItem = (item: (typeof faqData)[0], index: number) => {
    const isOpen = active === index;

    return (
      <motion.div
        key={item.id}
        variants={itemVariants}
        className={`
          group relative
          mb-5 rounded-2xl border p-5 pb-5
          transition-all duration-500 ease-out
          ${
            isOpen
              ? darkMode
                ? "border-blue-500 bg-blue-700/4 shadow-[0_0_40px_rgba(6,182,212,0.08)]"
                : "border-red-500 bg-red-700/4 shadow-[0_0_40px_rgba(6,182,212,0.06)]"
              : darkMode
                ? "border-transparent bg-transparent hover:-translate-y-0.5 "
                : "border-transparent bg-transparent hover:-translate-y-0.5 "
          }
        `}
      >
        {/* Inner glow on open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-400/8 via-transparent to-blue-500/8"
            />
          )}
        </AnimatePresence>

        {/* ID badge */}
        <motion.span
          animate={
            isOpen
              ? {
                  color: darkMode ? "#1d4ed8" : "#b91c1c",
                  textShadow: darkMode
                    ? "0 0 20px rgba(6,182,212,0.6)"
                    : "0 0 20px rgba(6,182,212,0.3)",
                }
              : {
                  color: darkMode ? "#000000" : "#efffff",
                  textShadow: "0 0 0px rgba(239,68,68,0)",
                }
          }
          transition={{ duration: 0.35 }}
          className="relative z-10 font-bold tracking-widest text-sm"
        >
          {item.id}
        </motion.span>

        <button
          onClick={() => setActive(isOpen ? null : index)}
          className="relative z-10 mt-2 flex w-full items-center justify-between gap-4 text-left cursor-pointer"
        >
          <h3
            className={`
              text-lg font-medium leading-snug transition-colors duration-300
              ${
                isOpen
                  ? darkMode
                    ? "text-blue-700"
                    : "text-red-700"
                  : darkMode
                    ? "text-black "
                    : "text-white "
              }
            `}
          >
            {item.question}
          </h3>

          {/* Toggle icon */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`
              flex h-8 w-8 shrink-0 items-center justify-center rounded-full cursor-pointer
              transition-all duration-300
              ${
                isOpen
                  ? darkMode
                    ? "bg-blue-500 text-[#020E24] shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    : "bg-red-700 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : darkMode
                    ? "bg-black/10 text-black group-hover:bg-black/20"
                    : "bg-white/10 text-white group-hover:bg-white/20"
              }
            `}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="minus"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Minus size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="plus"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative z-10 overflow-hidden"
            >
              <motion.p
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.25, delay: 0.08 }}
                className={`pt-4 text-sm leading-relaxed ${
                  darkMode ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {item.answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-10"
    >
      {/* ——— Ambient glow blobs (dark mode only) ——— */}
      {darkMode && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full bg-cyan-500/20 blur-[200px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.08, 0.18, 0.08],
            }}
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
        {/* ——— Heading ——— */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="mb-16 text-center"
        >
          <motion.h2
            custom={1}
            variants={headingVariants}
            className={`mt-3 text-4xl font-bold md:text-5xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>
          <motion.p
            custom={3}
            variants={headingVariants}
            className={`mx-auto mt-6 max-w-2xl text-lg leading-8 ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Everything you need to know about Firetech 2026 in one place.
          </motion.p>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-32 rounded-full  ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />
        </motion.div>

        {/* ——— FAQ Grid ——— */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-2"
        >
          <div>{leftColumn.map((item, idx) => renderItem(item, idx))}</div>
          <div>{rightColumn.map((item, idx) => renderItem(item, idx + 3))}</div>
        </motion.div>
      </div>
    </section>
  );
}
