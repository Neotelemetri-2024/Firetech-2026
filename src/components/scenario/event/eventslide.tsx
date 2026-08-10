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
      {/* Background Glow */}
      <div
        className=" absolute right-24 top-1/2 h-130 w-130 -translate-y-1/2 rounded-full blur-[80px] lg:blur-[180px] opacity-20 "
        style={{ background: color }}
      />
      <div className=" relative z-10 w-full max-w-7xl flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-24 lg:translate-y-12 ">
        {/* ================= LEFT ================= */}
        <div className=" flex w-full max-w-xl lg:w-[42%] flex-col justify-center pl-16 lg:translate-y-12 ">
          <span
            className={`mb-4 text-sm font-semibold uppercase tracking-[0.35em] ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Competition
          </span>
          <span
            className=" text-6xl lg:text-[130px] font-black leading-none "
            style={{ color }}
          >
            {id}
          </span>
          <h2
            className={`mt-5 text-4xl font-black leading-tight transition-colors duration-300 lg:text-4xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            {title}
          </h2>
          <p
            className=" mt-4 text-lg lg:text-2xl font-semibold "
            style={{ color }}
          >
            {tagline}
          </p>
          <p
            className={`mt-8 max-w-130 text-base leading-8 transition-colors duration-300 lg:text-lg lg:leading-9 ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            {description}
          </p>
          <button
            onClick={handleExploreChallenge}
            className={`mt-12 inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 font-medium cursor-pointer backdrop-blur-md transition-all duration-500 hover:scale-105 lg:w-fit ${
              darkMode
                ? "bg-linear-to-br from-blue-600 to-red-600 text-white hover:bg-white "
                : "bg-linear-to-br from-red-600 to-blue-600 text-white hover:bg-white  "
            }`}
          >
            Explore Challenge <span className="text-xl">→</span>
          </button>
        </div>
        {/* ================= RIGHT ================= */}
        <div className=" relative flex w-full lg:w-[58%] items-center justify-center lg:translate-y-12">
          {/* Floating Glow */}
          <div
            className=" absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-20 "
            style={{ background: color }}
          />
          {/* Event Card */}
          <div className=" event-image group relative h-115 w-full max-w-sm lg:h-135 lg:w-82.5 overflow-hidden rounded-4xl border border-white/10 transition-all duration-700 hover:-translate-y-3 ">
            {/* Image */}
            <img
              src={image}
              alt={title}
              className=" absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 "
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: ` linear-gradient( 180deg, transparent 0%, rgba(0,0,0,.15) 35%, ${color}ee 100% ) `,
              }}
            />
            {/* Top Line */}
            <div className=" absolute left-1/2 top-0 h-20 w-0.5 -translate-x-1/2 bg-white " />
            {/* Vertical Title */}
            <div
              className=" hidden lg:block absolute left-1/2 top-24 -translate-x-1/2 text-[18px] font-semibold uppercase tracking-[0.25em] text-white "
              style={{ writingMode: "vertical-rl" }}
            >
              {title}
            </div>
            {/* Number */}
            <div className=" absolute bottom-5 left-1/2 -translate-x-1/2 ">
              <span className=" text-[120px] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_white] ">
                {id}
              </span>
            </div>
            {/* Hover Glow */}
            <div
              className=" absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 "
              style={{ boxShadow: `inset 0 0 100px ${color}` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
