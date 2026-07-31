import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountdownCard from "../../countdown/card";
import { headingVariants } from "../../animations/headingvariants";
import { useTheme } from "../../../context/themecontext";

const TARGET_DATE = new Date("2026-09-20T23:59:59").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const { darkMode } = useTheme();
  const calculateTime = (): TimeLeft => {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-18">
      <div className="relative z-20 w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="text-center"
        >
          <motion.h1
            variants={headingVariants.title}
            className={`-mt-20 sm:-mt-28 md:-mt-40
    text-3xl sm:text-4xl md:text-6xl
    font-black font-syncopate
    leading-[1.15] md:leading-tight
    text-center
    ${darkMode ? "text-black" : "text-white"}`}
          >
            WE ARE
            <span className="mt-3 flex flex-col items-center gap-1 md:mt-2 md:block">
              <span
                className={`bg-clip-text text-transparent ${
                  darkMode ? "bg-blue-600" : "bg-red-600"
                }`}
              >
                COMING
              </span>
              <span className="hidden md:inline mx-2"></span>

              <span
                className={`bg-clip-text text-transparent ${
                  darkMode ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                SOON
              </span>
            </span>
          </motion.h1>
          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-32 rounded-full  ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />
          <motion.p
            variants={headingVariants.subtitle}
            className={`mx-auto mt-6 max-w-3xl font-space text-lg ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Something extraordinary is on the horizon. Stay tuned for the next
            generation of innovation.
          </motion.p>
        </motion.div>

        {/* Countdown Card */}
        <motion.div
          variants={headingVariants.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="relative mt-12 flex justify-center"
        >
          <CountdownCard
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
          />
        </motion.div>
      </div>
    </section>
  );
}
