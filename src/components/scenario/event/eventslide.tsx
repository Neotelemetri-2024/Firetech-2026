import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/themecontext";

type EventSlideProps = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
};

export default function EventSlide({
  id,
  title,
  tagline,
  description,
  image,
  color,
}: EventSlideProps) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const theme = {
    label: darkMode ? "text-slate-500" : "text-white/40",
    title: darkMode ? "text-black" : "text-white",
    description: darkMode ? "text-slate-700" : "text-white/70",

    button: darkMode
      ? "bg-white border border-slate-200 text-black hover:bg-black hover:text-white"
      : "bg-linear-to-br from-red-400/20 to-blue-500/20 text-white hover:bg-white hover:text-black",

    card: darkMode
      ? "border border-slate-200 bg-white shadow-xl"
      : "border border-white/10",

    topLine: darkMode ? "bg-slate-700" : "bg-white",

    verticalTitle: darkMode ? "text-black" : "text-white",

    stroke: darkMode
      ? "[-webkit-text-stroke:1.5px_black]"
      : "[-webkit-text-stroke:1.5px_white]",
  };

  const handleExploreChallenge = () => {
    navigate("/dashboard/apply");
  };

  return (
    <section
      className="
        relative
        flex
        h-screen
        w-screen
        shrink-0
        items-center
        justify-center
        px-24
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          right-24
          top-1/2
          h-130
          w-130
          -translate-y-1/2
          rounded-full
          blur-[180px]
          opacity-20
        "
        style={{
          background: color,
        }}
      />

      <div
        className="
    relative
    z-10
    flex
    w-full
    max-w-7xl
    items-center
    justify-between
    gap-24

    translate-y-12
  "
      >
        {/* ================= LEFT ================= */}

        <div
          className="
    flex
    w-[42%]
    flex-col
    justify-center

    pl-16
  "
        >
          <span
            className={`mb-4 text-sm font-semibold uppercase tracking-[0.35em] ${theme.label}`}
          >
            Competition
          </span>

          <span
            className="
              text-[130px]
              font-black
              leading-none
            "
            style={{
              color,
            }}
          >
            {id}
          </span>

          <h2
            className={`mt-5 text-7xl font-black leading-tight ${theme.title}`}
          >
            {title}
          </h2>

          <p
            className="
              mt-4
              text-2xl
              font-semibold
            "
            style={{
              color,
            }}
          >
            {tagline}
          </p>

          <p
            className={`mt-8 max-w-130 text-lg leading-9 ${theme.description}`}
          >
            {description}
          </p>

          <button
            onClick={handleExploreChallenge}
            className={`
  mt-12
  inline-flex
  w-fit
  items-center
  gap-3
  rounded-full
  px-8
  py-4
  font-medium
  backdrop-blur-md
  transition-all
  duration-500
  cursor-pointer
  hover:scale-105
  ${theme.button}
`}
          >
            Explore Challenge
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* ================= RIGHT ================= */}
        <div
          className="
    relative
    flex
    w-[58%]
    items-center
    justify-center
  "
        >
          {/* Floating Glow */}

          <div
            className="
      absolute
      left-1/2
      top-1/2
      h-120
      w-120
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      blur-[150px]
      opacity-20
    "
            style={{
              background: color,
            }}
          />

          {/* Event Card */}

          <div
            className={`
event-image
group
relative
h-135
w-82.5
overflow-hidden
rounded-4xl
transition-all
duration-700
hover:-translate-y-3
cursor-pointer
${theme.card}
`}
          >
            {/* Image */}

            <img
              src={image}
              alt={title}
              className="
        absolute
        inset-0
        h-full
        w-full
        object-cover

        transition-all
        duration-700

        group-hover:scale-110
        group-hover:rotate-1
      "
            />

            {/* Overlay */}

            <div
              className="absolute inset-0"
              style={{
                background: `
          linear-gradient(
            180deg,
            transparent 0%,
            rgba(0,0,0,.15) 35%,
            ${color}ee 100%
          )
        `,
              }}
            />

            {/* Top Line */}

            <div
              className="
        absolute
        left-1/2
        top-0
        h-20
        w-0.5
        -translate-x-1/2
        bg-white
      "
            />

            {/* Vertical Title */}

            <div
              className="
        absolute
        left-1/2
        top-24
        -translate-x-1/2
        text-[18px]
        font-semibold
        uppercase
        tracking-[0.25em]
        text-white
      "
              style={{
                writingMode: "vertical-rl",
              }}
            >
              {title}
            </div>

            {/* Number */}

            <div
              className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
      "
            >
              <span
                className="
          text-[120px]
          font-black
          leading-none
          text-transparent
          [-webkit-text-stroke:1.5px_white]
        "
              >
                {id}
              </span>
            </div>

            {/* Hover Glow */}

            <div
              className="
        absolute
        inset-0
        opacity-0
        transition-opacity
        duration-700
        group-hover:opacity-100
      "
              style={{
                boxShadow: `inset 0 0 100px ${color}`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
