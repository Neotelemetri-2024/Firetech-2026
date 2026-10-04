import { useRef } from "react";
import { motion } from "framer-motion";

import { useTheme } from "../../../context/themecontext";

import { headingVariants } from "../../animations/headingvariants";
import roadImage from "../../../assets/timeline/road.webp";
import TimelineCheckpoint from "../../ui/checkpoint";

import { timelineEvents } from "../../../data/timeline";

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { darkMode } = useTheme();

  const cardOffsets = ["mt-34", "mt-34", "mt-[44px]", "mt-[44px]"];
  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12">
      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-24 text-center">
          <motion.h2
            variants={headingVariants.title}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
            className={`text-5xl md:text-6xl font-black font-orbitron ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            OUR TIMELINE
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
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
            className={`mx-auto mt-7 max-w-3xl font-jakarta text-lg leading-8 ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Ikuti setiap tonggak penting, mulai dari pendaftaran hingga babak
            final, dan bersiaplah menghadapi setiap tahapan kompetisi yang seru.
          </motion.p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16">
          {/* Left Side */}
          <div className="sticky top-28">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
              }}
              className={`
              relative
              overflow-hidden
              rounded-4xl
              border
              ${
                darkMode
                  ? "border-slate-200 bg-white/80"
                  : "border-white/10 bg-white/3"
              }
            `}
            >
              {/* Road Image */}
              <motion.img
                src={roadImage}
                alt="Timeline Road"
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1,
                }}
                className="
                h-175
                w-full
                object-cover
                select-none
                pointer-events-none
              "
              />

              {/* Bottom Fade */}
              <div
                className={`
                absolute
                bottom-0
                left-0
                right-0
                h-32
                ${
                  darkMode
                    ? "bg-linear-to-t from-white via-white/70 to-transparent"
                    : "bg-linear-to-t from-[#0f245d] via-[#0f245d]/60 to-transparent"
                }
                `}
              />

              {/* Checkpoints */}
              {timelineEvents.map((event) => (
                <TimelineCheckpoint
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  top={event.top}
                  left={event.left}
                  darkMode={darkMode}
                />
              ))}
            </motion.div>
          </div>

          {/* Right Side */}
          <div
            className="
            grid
            grid-cols-2
            gap-x-5
            gap-y-3
            content-start
            self-start
          "
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 450,
                    damping: 20,
                  },
                }}
                className={`
                relative
                min-h-42.5
                overflow-hidden
                rounded-3xl
                border
                p-5
                backdrop-blur-xl
                transition-colors
                cursor-pointer
                ${cardOffsets[index]}
                ${darkMode ? "border-slate-200 bg-white/80" : "border-white/10 bg-white/3"}
              `}
              >
                {/* Large Number */}
                <div
                  className={`
                  absolute
                  right-4
                  top-2
                  text-6xl
                  font-black
                  opacity-12
                  select-none
                  ${darkMode ? "text-black" : "text-white"}
                `}
                >
                  {event.id}
                </div>
                {/* Badge */}
                <div
                  className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold
                  font-orbitron
                  ${
                    darkMode
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-500/10 text-red-400"
                  }
                `}
                >
                  STEP {event.id}
                </div>

                {/* Description */}
                <p
                  className={`
                  mt-4
                  text-sm
                  leading-6
                  font-jakarta
                  ${darkMode ? "text-black" : "text-white"}
                `}
                >
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Metro Timeline */}
        <div className="relative py-6 md:hidden">
          <div className="relative">
            {/* Main Line */}
            <div
              className={`
              absolute
              left-5
              top-0
              bottom-0
              w-0.75
              rounded-full
              ${
                darkMode
                  ? "bg-linear-to-b from-blue-400 via-blue-600 to-blue-800"
                  : "bg-linear-to-b from-red-400 via-red-600 to-red-800"
              }
            `}
            />

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative flex gap-5"
                >
                  {/* Station */}
                  <div className="relative z-10 mt-3 shrink-0">
                    <div
                      className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      shadow-lg
                      ${
                        darkMode
                          ? `
                            border-blue-500
                            bg-white
                            text-black
                          `
                          : `
                            border-red-500
                            bg-black
                            text-white
                          `
                      }
                    `}
                    >
                      {index === timelineEvents.length - 1 ? "🏁" : event.id}
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      x: 4,
                    }}
                    className={`
                    relative
                    flex-1
                    overflow-hidden
                    rounded-2xl
                    border
                    p-5
                    backdrop-blur-xl
                    ${
                      darkMode
                        ? "border-slate-200 bg-white/90"
                        : "border-white/10 bg-white/5"
                    }
                  `}
                  >
                    {/* Top Accent */}
                    <div
                      className={`
                      absolute
                      left-0
                      top-0
                      h-1
                      w-full
                      ${darkMode ? "bg-blue-600" : "bg-red-600"}
                    `}
                    />

                    {/* Step */}
                    <div
                      className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1
                      text-[11px]
                      font-bold
                      font-orbitron
                      ${
                        darkMode
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-500/10 text-red-400"
                      }
                    `}
                    >
                      STEP {event.id}
                    </div>

                    {/* Title */}
                    <h3
                      className={`
                      mt-3
                      text-lg
                      font-bold
                      ${darkMode ? "text-black" : "text-white"}
                    `}
                    >
                      {event.title}
                    </h3>

                    {/* Date */}
                    <p
                      className={`
                      mt-1
                      text-sm
                      ${darkMode ? "text-slate-600" : "text-slate-300"}
                    `}
                    >
                      {event.date}
                    </p>

                    {/* Description */}
                    <p
                      className={`
                      mt-3
                      text-sm
                      leading-6
                      ${darkMode ? "text-slate-700" : "text-slate-400"}
                    `}
                    >
                      {event.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
