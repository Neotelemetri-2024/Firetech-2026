import { motion } from "framer-motion";

interface Props {
  id: number;
  title: string;
  date: string;
  top: string;
  left: string;
  darkMode?: boolean;
}

export default function TimelineCheckpoint({
  id,
  title,
  date,
  top,
  left,
  darkMode = false,
}: Props) {
  return (
    <motion.div
      className="checkpoint absolute z-30"
      style={{
        top,
        left,
        transform: "translate(-50%, -50%)",
      }}
      initial={{
        opacity: 0,
        scale: 0.5,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="text-center">
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.2,
          }}
          className={`
          mx-auto
          flex
          h-18
          w-18
          items-center
          justify-center
          rounded-full
          border-[7px]
          bg-white
          text-3xl
          cursor-pointer
          font-black
          text-black
          ${
            darkMode
              ? "border-blue-700 shadow-[0_0_25px_rgba(59,130,246,0.45)]"
              : "border-red-700 shadow-[0_0_25px_rgba(239,68,68,0.45)]"
          }
        `}
        >
          {id}
        </motion.div>

        <div
          className={`
          mt-3
          rounded-xl
          px-3
          py-2
          backdrop-blur-md
          ${darkMode ? "bg-white/80" : "bg-black/30"}
        `}
        >
          <h3
            className={`
            text-sm
            font-bold
            whitespace-nowrap
            ${darkMode ? "text-black" : "text-white"}
          `}
          >
            {title}
          </h3>

          <p
            className={`
            mt-1
            text-xs
            ${darkMode ? "text-black" : "text-white"}
          `}
          >
            {date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
