import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/themecontext";

interface Props {
  value: number;
}

export default function AnimatedDigit({ value }: Props) {
  const { darkMode } = useTheme();
  const [display, setDisplay] = useState(value);

  if (display !== value) {
    setTimeout(() => {
      setDisplay(value);
    }, 0);
  }

  return (
    <div className="relative flex h-16 w-20 items-center justify-center overflow-hidden sm:h-20 sm:w-24 md:h-24 md:w-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={display}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={`
            font-mono
            font-black
            tracking-normal 
            md:tracking-wide
            text-[42px]
            sm:text-[54px]
            md:text-7xl
            lg:text-8xl
            leading-none
            ${darkMode ? "text-black" : "text-white"}
          `}
          >
            {display.toString().padStart(2, "0")}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
