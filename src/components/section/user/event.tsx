import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../../utils/gsap";
import { useTheme } from "../../../context/themecontext";

import Scenario1 from "../../scenario/event/scenario1";
import EventSlide from "../../scenario/event/eventslide";

import hackathonImg from "../../../assets/event/hackathon.webp";
import uiuxImg from "../../../assets/event/uiux.webp";
import efootballImg from "../../../assets/event/efootball.webp";
import fasttypingImg from "../../../assets/event/fasttyping.webp";

const events = [
  {
    id: "01",
    title: "Hackathon",
    tagline: "Build. Innovate. Compete.",
    description:
      "Hackathon Firetech 2026 adalah kompetisi teknologi yang menantang peserta menciptakan solusi inovatif dalam waktu terbatas.",
    image: hackathonImg,
    color: "#ef4444",
  },
  {
    id: "02",
    title: "UI/UX",
    tagline: "Design The Future.",
    description:
      "Kompetisi desain antarmuka dan pengalaman pengguna yang berfokus pada kreativitas dan problem solving.",
    image: uiuxImg,
    color: "#06b6d4",
  },
  {
    id: "03",
    title: "E-Football",
    tagline: "Play Beyond Limits.",
    description:
      "Kompetisi e-sports sepak bola untuk menunjukkan kemampuan strategi dan permainan terbaik.",
    image: efootballImg,
    color: "#22c55e",
  },
  {
    id: "04",
    title: "Fast Typing",
    tagline: "Speed Meets Precision.",
    description:
      "Uji kecepatan dan akurasi mengetik untuk menjadi yang tercepat di Firetech 2026.",
    image: fasttypingImg,
    color: "#8b5cf6",
  },
];

export default function Event() {
  const { darkMode } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,

          pin: true,

          scrub: 1,

          snap: 1 / (panels.length - 1),

          anticipatePin: 1,

          invalidateOnRefresh: true,

          end: () => "+=" + window.innerWidth * (panels.length - 1),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
      "
    >
      {/* Background */}
      <div
        className="
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
          absolute
          left-1/2
          top-0
          h-75
          w-225
          -translate-x-1/2
        "
      />

      {/* Horizontal Track */}

      <div
        className="flex h-screen"
        style={{
          width: `${events.length + 1}00vw`,
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
              justify-center
              pt-32
              pb-10
            "
          >
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 0.8,
              }}
              className={`
                text-5xl
                font-bold
                font-orbitron
                ${darkMode ? "text-black" : "text-white"}
              `}
            >
              Our Events
            </motion.p>
          </div>

          {/* Overview */}

          <div
            className="
              flex
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
    </section>
  );
}
