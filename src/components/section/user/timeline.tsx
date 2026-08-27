import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { useTheme } from "../../../context/themecontext";

import { headingVariants } from "../../animations/headingvariants";
import { initTimelineAnimation } from "../../animations/timeline";

import roadImage from "../../../assets/timeline/road.webp";
import TimelineCheckpoint from "../../ui/checkpoint";

import { timelineEvents } from "../../../data/timeline";

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    initTimelineAnimation();
  }, []);

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
            className={`text-5xl md:text-6xl font-black font-syncopate ${
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
            className={`mx-auto mt-7 max-w-3xl font-space text-lg leading-8 ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Follow every important milestone, from registration to the grand
            finale, and stay prepared for each exciting stage of the
            competition.
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
              {/* Accent Line */}
              <div
                className={`
                absolute
                top-0
                left-0
                z-30
                h-1
                w-full
                ${darkMode ? "bg-blue-600" : "bg-red-600"}
              `}
              />

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
                  ${darkMode ? "text-black" : "text-white"}
                `}
                >
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Roadmap */}
        <div className="relative py-10 md:hidden">
          <div className="space-y-20">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.85,
                  rotateX: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className={`flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="relative w-[80%] max-w-75">
                  {/* Connector */}

                  {index !== timelineEvents.length - 1 && (
                    <div
                      className={`
                      absolute
                      top-14
                      z-0
                      ${index % 2 === 0 ? "left-12" : "right-12"}
                      h-32
                      w-1
                      rounded-full
                      ${
                        darkMode
                          ? "bg-linear-to-b from-blue-400 to-blue-700"
                          : "bg-linear-to-b from-red-400 to-red-700"
                      }
                    `}
                    />
                  )}

                  {/* Card */}

                  <motion.div
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={`
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    p-6
                    backdrop-blur-md
                    shadow-xl
                    ${
                      darkMode
                        ? "border-slate-200 bg-white/95"
                        : "border-white/10 bg-white/10"
                    }
                  `}
                  >
                    {/* Accent Line */}
                    <div
                      className={`
                      absolute
                      top-0
                      left-0
                      h-0.5
                      w-full
                      ${darkMode ? "bg-blue-700" : "bg-red-700"}
                    `}
                    />

                    <div
                      className={`
                      absolute
                      top-0
                      left-0
                      h-10
                      w-full
                      blur-2xl
                      opacity-20
                      ${darkMode ? "bg-blue-500" : "bg-red-500"}
                    `}
                    />

                    {/* Number */}
                    <div
                      className={`
                      absolute
                      -top-3
                      -right-3
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      backdrop-blur-xl
                      font-black
                      text-xl
                      shadow-xl
                      ${
                        darkMode
                          ? `
                            border-blue-300/40
                            bg-white/70
                            text-blue-700
                          `
                          : `
                            border-white/20
                            bg-white/10
                            text-white
                          `
                      }
                    `}
                    >
                      {index === timelineEvents.length - 1 ? "🏁" : event.id}
                    </div>

                    {/* Content */}

                    <div className="pt-6">
                      <h3
                        className={`text-xl font-bold ${
                          darkMode ? "text-black" : "text-white"
                        }`}
                      >
                        {event.title}
                      </h3>

                      <p
                        className={`mt-2 text-sm ${
                          darkMode ? "text-slate-600" : "text-slate-300"
                        }`}
                      >
                        {event.date}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
