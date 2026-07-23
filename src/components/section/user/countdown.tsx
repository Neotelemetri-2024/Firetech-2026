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
            className={`mt-8 text-5xl font-black font-syncopate leading-tight md:text-6xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            WE ARE
            <span className="block mt-2">
              <span
                className={`bg-clip-text text-transparent ${
                  darkMode
                    ? "bg-blue-600"
                    : "bg-red-600"
                }`}
              >
                COMING
              </span>

              <span className="mx-2"></span>

              <span
                className={`bg-clip-text text-transparent ${
                  darkMode
                    ? "bg-red-600"
                    : "bg-blue-600"
                }`}
              >
                SOON
              </span>
            </span>
          </motion.h1>
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
          className="relative mt-2 flex justify-center"
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
