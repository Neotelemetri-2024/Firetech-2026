import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "../../context/themecontext";

type CallProps = {
  phone: string;
  title?: string;
  subtitle?: string;
};

export default function Call({
  phone,
  title = "Become Our Partner",
  subtitle = "Contact us via WhatsApp for sponsorship and media partnership opportunities.",
}: CallProps) {
  const { darkMode } = useTheme();

  const whatsappLink = `https://wa.me/${phone}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      whileHover={{
        scale: 1.03,
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.4,
      }}
      className={`
        group
        relative
        block
        overflow-hidden
        rounded-3xl
        border
        p-8
        cursor-pointer
        ${darkMode ? "border-blue-700 bg-white" : "border-red-700 bg-zinc-950"}
      `}
    >
      {/* Glow */}
      <div
        className={`
          absolute
          inset-0
          opacity-0
          blur-3xl
          transition-all
          duration-500
          group-hover:opacity-100
          ${darkMode ? "bg-blue-700/20" : "bg-red-700/20"}
        `}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:flex-row sm:text-left">
        {/* Icon */}
        <div className="relative">
          <span
            className="
              absolute
              inset-0
              animate-ping
              rounded-full
              bg-green-500/30
            "
          />

          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
            <FaWhatsapp className="text-3xl sm:text-[34px]" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3
            className={`font-syncopate text-base sm:text-lg font-black leading-tight ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-2 text-xs sm:text-sm leading-relaxed ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{
            x: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className={`text-2xl ${darkMode ? "text-blue-700" : "text-red-700"}`}
        >
          →
        </motion.div>
      </div>
    </motion.a>
  );
}
