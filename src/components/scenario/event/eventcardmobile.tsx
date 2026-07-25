import { motion } from "framer-motion";
import type { FC } from "react";
type MobileEventCardProps = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  color: string;
  onClick: () => void;
};
const MobileEventCard: FC<MobileEventCardProps> = ({
  id,
  title,
  tagline,
  image,
  color,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -6 }}
      className=" group relative w-full overflow-hidden rounded-3xl border border-white/10 text-left transition-all duration-300 "
    >
      {" "}
      {/* Image */}{" "}
      <div className="relative h-60 w-full overflow-hidden">
        {" "}
        <motion.img
          src={image}
          alt={title}
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className=" h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 "
        />{" "}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient( to top, rgba(0,0,0,.85), rgba(0,0,0,.25), transparent )`,
          }}
        />{" "}
      </div>{" "}
      {/* Content */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute inset-x-0 bottom-0 p-5"
      >
        {" "}
        <p className="text-5xl font-black" style={{ color }}>
          {" "}
          {id}{" "}
        </p>{" "}
        <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>{" "}
        <p className="mt-1 text-sm text-white/70">{tagline}</p>{" "}
        <div className=" mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md ">
          {" "}
          View Details →{" "}
        </div>{" "}
      </motion.div>{" "}
    </motion.button>
  );
};
export default MobileEventCard;
