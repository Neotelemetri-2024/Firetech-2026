import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/themecontext";
type MobileEventModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
};
export default function MobileEventModal({
  open,
  onClose,
  id,
  title,
  tagline,
  description,
  image,
  color,
}: MobileEventModalProps) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  return (
    <AnimatePresence>
      {" "}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className=" fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 "
        >
          {" "}
          <motion.div
            initial={{ y: 500, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 500, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={` relative h-[72vh] w-full overflow-hidden rounded-[30px] shadow-2xl ${darkMode ? "bg-white text-black" : "bg-[#09090b] text-white"} `}
          >
            {" "}
            <div className="flex justify-center py-3">
              {" "}
              <div
                className={` h-1.5 w-14 rounded-full ${darkMode ? "bg-slate-300" : "bg-white/20"} `}
              />{" "}
            </div>{" "}
            {/* Close */}{" "}
            <button
              onClick={onClose}
              className=" absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-white backdrop-blur-md transition-all hover:scale-110 "
            >
              {" "}
              <X size={20} />{" "}
            </button>{" "}
            {/* Image */}{" "}
            <div className="relative h-56 w-full overflow-hidden">
              {" "}
              <motion.img
                src={image}
                alt={title}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />{" "}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient( to top, rgba(0,0,0,.95), transparent )`,
                }}
              />{" "}
            </div>{" "}
            {/* Content */}{" "}
            <div className=" h-[calc(72vh-224px)] overflow-y-auto px-6 py-6 ">
              {" "}
              <p className=" text-5xl font-black " style={{ color }}>
                {" "}
                {id}{" "}
              </p>{" "}
              <h2 className=" mt-2 text-[30px] font-black "> {title} </h2>{" "}
              <p className="mt-2 font-semibold" style={{ color }}>
                {" "}
                {tagline}{" "}
              </p>{" "}
              <p
                className={` mt-6 leading-8 ${darkMode ? "text-slate-700" : "text-white/70"} `}
              >
                {" "}
                {description}{" "}
              </p>{" "}
              <button
                onClick={() => navigate("/dashboard/apply")}
                className=" mt-8 w-full rounded-full bg-linear-to-r from-red-500 to-blue-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] "
              >
                {" "}
                Explore Challenge{" "}
              </button>{" "}
            </div>{" "}
          </motion.div>{" "}
        </motion.div>
      )}{" "}
    </AnimatePresence>
  );
}
