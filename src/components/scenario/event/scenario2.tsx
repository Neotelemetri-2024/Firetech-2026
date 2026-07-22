import { useState } from "react";

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
    title: "UI/UX Competition",
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

export default function Scenario2() {
  const [activeIndex] = useState(0);

  const active = events[activeIndex];

  return (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-between
      "
    >
      {/* LEFT CONTENT */}

      <div
        className="
          w-[38%]
        "
      >
        <span
          className="
            text-8xl
            font-black
          "
          style={{
            color: active.color,
          }}
        >
          {active.id}
        </span>

        <h2
          className="
            mt-4
            text-6xl
            font-black
            text-white
          "
        >
          {active.title}
        </h2>

        <p
          className="
            mt-3
            text-2xl
            font-semibold
          "
          style={{
            color: active.color,
          }}
        >
          {active.tagline}
        </p>

        <p
          className="
            mt-8
            max-w-lg
            text-lg
            leading-relaxed
            text-white/70
          "
        >
          {active.description}
        </p>

        <button
          className="
            mt-10
            rounded-full
            border
            border-white/20
            px-7
            py-3
            text-white
            transition-all
            duration-300
            hover:bg-white/10
          "
        >
          Explore Challenge →
        </button>
      </div>

      {/* RIGHT CARD */}

      <div
        className="
          flex
          gap-8
        "
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`
              relative
              h-[520px]
              w-[240px]
              overflow-hidden
              rounded-[28px]
              border
              transition-all
              duration-500

              ${
                activeIndex === index
                  ? "scale-105 border-white/30"
                  : "scale-90 opacity-50 border-white/10"
              }
            `}
          >
            <img
              src={event.image}
              alt={event.title}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to top,
                  ${event.color}dd,
                  transparent
                )`,
              }}
            />

            <div
              className="
                absolute
                bottom-6
                right-6
              "
            >
              <span
                className="
                  text-8xl
                  font-black
                  text-white/20
                "
              >
                {event.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
