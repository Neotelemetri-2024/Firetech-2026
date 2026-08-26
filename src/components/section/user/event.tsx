import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../../utils/gsap";
import { useTheme } from "../../../context/themecontext";
import Scenario1 from "../../scenario/event/scenario1";
import EventSlide from "../../scenario/event/eventslide";
import MobileEventCard from "../../scenario/event/eventcardmobile";
import MobileEventModal from "../../scenario/event/eventmodalmobile";
import hackathonImg from "../../../assets/event/hackathon.webp";
import uiuxImg from "../../../assets/event/uiux.webp";
import efootballImg from "../../../assets/event/efootball.webp";
import fasttypingImg from "../../../assets/event/fasttyping.webp";
import informaticsImg from "../../../assets/event/informaticsolympiad.webp";
import { headingVariants } from "../../animations/headingvariants";
const events = [
  {
    id: "01",
    title: "Hackathon",
    tagline: "Build. Innovate. Compete.",
    description:
      "Develop innovative technology solutions and transform ideas into impactful prototypes. Work as a team to solve real-world challenges within a limited timeframe.",
    image: hackathonImg,
    color: "#ef4444",
  },
  {
    id: "02",
    title: "Informatics Olympiad",
    tagline: "Think Fast. Solve Smart.",
    description:
      "Test your algorithmic thinking and programming skills through challenging problem sets. Compete against the best minds in logic, efficiency, and problem-solving.",
    image: informaticsImg,
    color: "#f59e0b",
  },
  {
    id: "03",
    title: "UI/UX",
    tagline: "Design the Future.",
    description:
      "Create intuitive and engaging digital experiences that solve real user needs. Showcase your creativity through user-centered design and innovative interfaces.",
    image: uiuxImg,
    color: "#06b6d4",
  },
  {
    id: "04",
    title: "E-Football",
    tagline: "Play Beyond Limits.",
    description:
      "Compete in thrilling matches that demand strategy, precision, and quick decision-making. Prove your skills on the virtual pitch and aim for championship glory.",
    image: efootballImg,
    color: "#22c55e",
  },
  {
    id: "05",
    title: "Fast Typing",
    tagline: "Speed Meets Precision.",
    description:
      "Test your typing speed and accuracy to compete for the title of the fastest typist at Firetech 2026.",
    image: fasttypingImg,
    color: "#8b5cf6",
  },
];
export default function Event() {
  const { darkMode } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof events)[number] | null
  >(null);
  const TRACK_OFFSET = -10;
  const totalPanels = events.length + 1;

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const panels = gsap.utils.toArray<HTMLElement>(".panel", track);
    const ctx = gsap.context(() => {
      gsap.set(track, { y: TRACK_OFFSET });
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top+=50 top",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (panels.length - 1), duration: 0.4 },
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
        },
      });
    }, section);
    return () => ctx.revert();
  }, [TRACK_OFFSET, totalPanels]);
  return (
    <section ref={sectionRef} className=" relative min-h-screen overflow-x-hidden lg:h-screen ">
      {/* Background */}
      <div
        className="
    hidden
    lg:block
    absolute
    left-1/2
    top-1/2
    h-175
    w-175
    -translate-x-1/2
    -translate-y-1/2
  "
      />

      <div
        className="
    hidden
    lg:block
    absolute
    left-1/2
    top-0
    h-75
    w-225
    -translate-x-1/2
  "
      />
      {/* ===================================================== */}
      {/* Desktop Layout */}
      {/* ===================================================== */}
      <div className="hidden overflow-hidden lg:block">
        <div
          ref={trackRef}
          className="event-track flex h-screen"
          style={{
            width: `${totalPanels * 100}vw`,
          }}
        >
          {/* ========================= */}
          {/* Panel 1 */}
          {/* ========================= */}

          <div
            className="
        panel
        flex
        h-screen
        w-screen
        shrink-0
        flex-col
      "
          >
            {/* Header */}

            <div
              className="
          flex
          shrink-0
          flex-col
          items-center
          justify-center
          pt-44
          pb-10
        "
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-bold font-orbitron ${
                  darkMode ? "text-black" : "text-white"
                }`}
              >
                OUR EVENT
              </motion.p>

              <motion.div
                custom={2}
                variants={headingVariants}
                className={`mx-auto mt-4 h-1 w-32 rounded-full ${
                  darkMode ? "bg-blue-700" : "bg-red-700"
                }`}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className={`mx-auto mt-6 max-w-3xl text-center text-lg font-space leading-relaxed ${
                  darkMode ? "text-black" : "text-white"
                }`}
              >
                Discover a series of exciting competitions designed to challenge
                your creativity, technical skills, and innovative thinking.
              </motion.p>
            </div>

            <div
              className="
              hidden
              lg:flex
              flex-1
              items-start
              justify-center
              px-10
            "
            >
              <Scenario1 />
            </div>
          </div>

          {/* ========================= */}
          {/* Event Slides */}
          {/* ========================= */}

          {events.map((event) => (
            <div
              key={event.id}
              className="
          panel
          flex
          h-screen
          w-screen
          shrink-0
        "
            >
              <EventSlide
                id={event.id}
                title={event.title}
                tagline={event.tagline}
                description={event.description}
                image={event.image}
                color={event.color}
              />
            </div>
          ))}
        </div>
      </div>
      {/* ===================================================== */}
      {/* Mobile Layout */}
      {/* ===================================================== */}
      <div
        className="
        flex
        flex-col
        px-6
        pt-28
        pb-16
        lg:hidden
      "
      >
        {/* Header */}

        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className={`text-4xl font-bold font-orbitron ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            OUR EVENT
          </motion.p>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-24 rounded-full ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={`mx-auto mt-5 max-w-md text-sm leading-7 ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Discover a series of exciting competitions designed to challenge
            your creativity, technical skills, and innovative thinking.
          </motion.p>
        </div>

        {/* Event List */}

        <div className="mt-14 space-y-16">
          {events.map((event) => (
            <MobileEventCard
              key={event.id}
              id={event.id}
              title={event.title}
              tagline={event.tagline}
              image={event.image}
              color={event.color}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>
      <MobileEventModal
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        id={selectedEvent?.id ?? ""}
        title={selectedEvent?.title ?? ""}
        tagline={selectedEvent?.tagline ?? ""}
        description={selectedEvent?.description ?? ""}
        image={selectedEvent?.image ?? ""}
        color={selectedEvent?.color ?? "#ffffff"}
      />
    </section>
  );
}
