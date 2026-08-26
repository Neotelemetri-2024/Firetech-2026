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

  const handleExploreChallenge = () => {
    if (title === "Fast Typing") {
      window.open(
        "https://fast-typing-firetech2026.vercel.app/",
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    navigate("/dashboard/apply", {
      state: {
        category: title,
      },
    });
  };
  return (
    <section className=" relative flex min-h-screen w-full items-center justify-center px-6 py-16 lg:h-screen lg:w-screen lg:px-24 ">
      <div className="relative z-10 w-full max-w-7xl translate-y-24">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center">
          {/* ================= LEFT : EVENT CARD ================= */}
          <div className="flex justify-center lg:justify-start">
            <div className="event-image group relative h-130 w-70 overflow-hidden rounded-4xl border border-white/10 transition-all duration-700 hover:-translate-y-3">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              />

              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                  180deg,
                  transparent 0%,
                  rgba(0,0,0,.2) 40%,
                  ${color}ee 100%
                )`,
                }}
              />

              <div className="absolute left-1/2 top-0 h-20 w-0.5 -translate-x-1/2 bg-white" />

              <div
                className="absolute left-1/2 top-24 -translate-x-1/2 text-[18px] font-semibold uppercase tracking-[0.25em] text-white"
                style={{ writingMode: "vertical-rl" }}
              >
                {title}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="text-[120px] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_white]">
                  {id}
                </span>
              </div>
            </div>
          </div>
          {/* ================= RIGHT : EVENT INFO ================= */}
          <div
            className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            p-8
            lg:p-14
            min-h-130
            flex
            items-center
          "
          >
            {/* Background Image */}
            <img
              src={image}
              alt={title}
              className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              scale-110
              blur-[3px]
            "
            />

            {/* Dark Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                linear-gradient(
                  135deg,
                  rgba(0,0,0,0.92) 0%,
                  rgba(0,0,0,0.75) 35%,
                  rgba(0,0,0,0.85) 100%
                )
              `,
              }}
            />

            {/* Glow */}
            <div
              className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-[120px] opacity-30"
              style={{ background: color }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
              <span
                className="text-sm font-medium uppercase tracking-[0.35em]"
                style={{ color }}
              >
                Firetech 2026
              </span>

              <h2 className="mt-4 text-4xl font-black text-white lg:text-6xl">
                {title}
              </h2>

              <div
                className="mt-5 h-1 w-24 rounded-full"
                style={{ background: color }}
              />

              <p className="mt-6 text-lg font-semibold" style={{ color }}>
                {tagline}
              </p>

              <p className="mt-8 text-base leading-8 text-white/90 lg:text-lg">
                {description}
              </p>

              <button
                onClick={handleExploreChallenge}
                className={`
                mt-10
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-full
                px-8
                py-4
                font-medium
                cursor-pointer
                transition-all
                duration-500
                hover:scale-105
                ${
                  darkMode
                    ? "bg-linear-to-br from-blue-600 to-red-600 text-white"
                    : "bg-linear-to-br from-red-600 to-blue-600 text-white"
                }
              `}
              >
                Register
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
