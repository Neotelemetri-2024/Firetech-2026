import hackathonImg from "../../../assets/gallery/gallery1.webp";
import uiuxImg from "../../../assets/event/uiux.webp";
import efootballImg from "../../../assets/event/efootball.webp";
import fasttypingImg from "../../../assets/event/fasttyping.webp";
//import informaticsImg from "../../../assets/event/informaticsolympiad.webp";
import { motion } from "framer-motion";
import { headingVariants } from "../../animations/headingvariants";
import { EVENT_LAYOUT } from "../../../constants/layout";
const events = [
  { id: "01", title: "Hackathon", image: hackathonImg, color: "#ef4444" },
  //{
    //id: "02",
    //title: "Informatics Olympiad",
    //image: informaticsImg,
    //color: "#f59e0b",
  //},
  { id: "02", title: "UI/UX Competition", image: uiuxImg, color: "#06b6d4" },
  { id: "03", title: "E-Football", image: efootballImg, color: "#22c55e" },
  { id: "04", title: "Fast Typing", image: fasttypingImg, color: "#8b5cf6" },
];
export default function Scenario1() {
  return (
    <div
      className="
      flex
      items-end
      justify-center
      gap-[clamp(6px,0.8vw,18px)]
      px-2
      pb-2
      w-full
      max-w-7xl
      mx-auto
    "
    >
      {" "}
      {events.map((event) => (
        <motion.div
          key={event.id}
          variants={headingVariants.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          style={{
            width: EVENT_LAYOUT.CARD.OVERVIEW_WIDTH,
            height: EVENT_LAYOUT.CARD.OVERVIEW_HEIGHT,
          }}
          className="
          overview-card
          group
          relative
          shrink-0
          overflow-hidden
          rounded-4xl
          border
          border-white/10
          transition-all
          duration-700
          ease-out
          hover:-translate-y-2
          hover:border-white/30
          cursor-pointer
          "
        >
          {" "}
          {/* Image */}{" "}
          <img
            src={event.image}
            alt={event.title}
            className=" absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 "
          />{" "}
          {/* Gradient */}{" "}
          <div
            className="absolute inset-0"
            style={{
              background: ` linear-gradient( to bottom, ${event.color}dd, rgba(0,0,0,.2), rgba(0,0,0,.7) ) `,
            }}
          />{" "}
          {/* Glow */}{" "}
          <div
            className=" absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 "
            style={{ boxShadow: `inset 0 0 90px ${event.color}` }}
          />{" "}
          {/* Top Line */}{" "}
          <div className=" absolute left-1/2 top-0 h-16 w-0.5 -translate-x-1/2 bg-white " />{" "}
          {/* Event Badge */}{" "}
          <div className=" absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-semibold tracking-[0.25em] text-white backdrop-blur-md ">
            {" "}
            EVENT{" "}
          </div>{" "}
          {/* Vertical Title */}{" "}
          <div
            className=" absolute left-1/2 top-20 -translate-x-1/2 text-[18px] font-semibold uppercase tracking-[0.25em] text-white "
            style={{ writingMode: "vertical-rl" }}
          >
            {" "}
            {event.title}{" "}
          </div>{" "}
          {/* Number */}{" "}
          <div className=" absolute bottom-5 left-1/2 -translate-x-1/2 text-[92px] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_white] ">
            {" "}
            {event.id}{" "}
          </div>{" "}
        </motion.div>
      ))}{" "}
    </div>
  );
}
