import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  value: number;
}

export default function AnimatedDigit({ value }: Props) {
  const [display, setDisplay] = useState(value);

  if (display !== value) {
    setTimeout(() => {
      setDisplay(value);
    }, 0);
  }

  return (
    <div className="relative h-20 w-full overflow-hidden">
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
          <span className="font-syncopate text-6xl md:text-7xl font-black text-white">
            {display.toString().padStart(2, "0")}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
