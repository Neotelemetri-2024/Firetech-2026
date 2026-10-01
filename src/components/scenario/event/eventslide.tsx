import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/themecontext";
import { EVENT_LAYOUT } from "../../../constants/layout";

type EventSlideProps = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  status: "upcoming" | "open" | "closed" | "ongoing" | "finished";
  isFull: boolean;
};
export default function EventSlide({
  id,
  title,
  tagline,
  description,
  image,
  color,
  status,
  isFull,
}: EventSlideProps) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleExploreChallenge = () => {
    if (!canRegister) return;

    const eventMap: Record<string, string> = {
      Hackathon: "hackathon",
      //"Informatics Olympiad": "informaticsolympiad",
      "Fast Typing": "ft",
      "E-Football": "e-football",
      "UI/UX": "ui-ux-competition",
    };

    const selectedEvent = eventMap[title] ?? "hackathon";

    sessionStorage.setItem("activeEvent", selectedEvent);

    window.dispatchEvent(
      new CustomEvent("firetech-event-change", {
        detail: selectedEvent,
      }),
    );

    if (title === "Fast Typing") {
      window.open(
        "https://fast-typing-firetech2026.vercel.app/",
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    navigate("/home/apply", {
      state: {
        category: title,
      },
    });
  };

  const canRegister = status === "open" && !isFull;

  const buttonLabel = isFull
    ? "Quota Full"
    : status === "open"
      ? "Register"
      : status === "upcoming"
        ? "Coming Soon"
        : status === "closed"
          ? "Registration Closed"
          : status === "ongoing"
            ? "Competition Ongoing"
            : "Event Finished";

  return (
    <section
      className="
      relative
      flex
      min-h-screen
      w-full
      items-center
      justify-center

      px-6
      py-8

      lg:h-screen
      lg:w-screen
      lg:px-16
    "
    >
      <div
        className="
        relative
        z-10
        w-full
        max-w-7xl
      "
      >
        <div
          className="
          grid
          gap-6
          lg:grid-cols-[clamp(160px,12vw,240px)_1fr]
          lg:items-center
        "
        >
          {/* ================= LEFT : EVENT CARD ================= */}
          <div className="flex justify-center lg:justify-start">
            <div
              style={{
                width: EVENT_LAYOUT.CARD.DETAIL_WIDTH,
                aspectRatio: EVENT_LAYOUT.CARD.DETAIL_RATIO,
              }}
              className="
              event-image
              group
              relative
              shrink-0
              overflow-hidden
              rounded-4xl
              border
              border-white/10
              transition-all
              duration-700
              hover:-translate-y-3
            "
            >
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
                <span
                  className="
                  text-[clamp(70px,6vw,110px)]
                  font-black
                  leading-none
                  text-transparent
                  [-webkit-text-stroke:1.5px_white]
                "
                >
                  {id}
                </span>
              </div>
            </div>
          </div>
          {/* ================= RIGHT : EVENT INFO ================= */}
          <div
            style={{
              minHeight: EVENT_LAYOUT.PANEL.MIN_HEIGHT,
            }}
            className="
            relative
            min-w-0
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            p-6
            lg:p-8
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

              <h2
                className="
                mt-4
                text-4xl
                lg:text-[clamp(2.8rem,3.8vw,5rem)]
                font-black
                text-white
              "
              >
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
                disabled={!canRegister}
                onClick={() => {
                  if (!canRegister) return;
                  handleExploreChallenge();
                }}
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
                transition-all
                duration-500

                ${
                  canRegister
                    ? darkMode
                      ? "bg-linear-to-br from-blue-600 to-red-600 text-white hover:scale-105 cursor-pointer"
                      : "bg-linear-to-br from-red-600 to-blue-600 text-white hover:scale-105 cursor-pointer"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-70"
                }
              `}
              >
                {buttonLabel}
                {canRegister && <span>→</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
