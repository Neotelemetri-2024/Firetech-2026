import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const events = [
  {
    name: "Hackathon",
    stats: [
      {
        value: "300",
        label: "Participants",
        icon: "/src/assets/admin/dashboard/participant.webp",
      },
      {
        value: "60",
        label: "Teams",
        icon: "/src/assets/admin/dashboard/team.webp",
      },
      {
        value: "56",
        label: "Payments",
        icon: "/src/assets/admin/dashboard/payment.webp",
      },
      {
        value: "34",
        label: ["Verified", "Payments"],
        icon: "/src/assets/admin/dashboard/verifiedpayment.webp",
      },
    ],
  },
  {
    name: "Fast Typing",
    stats: [
      {
        value: "500",
        label: "Participants",
        icon: "/src/assets/admin/dashboard/participant.webp",
      },
      {
        value: "85",
        label: "Payments",
        icon: "/src/assets/admin/dashboard/payment.webp",
      },
      {
        value: "45",
        label: ["Verified", "Payments"],
        icon: "/src/assets/admin/dashboard/verifiedpayment.webp",
      },
    ],
  },
  {
    name: "E-Football",
    stats: [
      {
        value: "150",
        label: "Participants",
        icon: "/src/assets/admin/dashboard/participant.webp",
      },
      {
        value: "42",
        label: "Payments",
        icon: "/src/assets/admin/dashboard/payment.webp",
      },
      {
        value: "38",
        label: ["Verified", "Payments"],
        icon: "/src/assets/admin/dashboard/verifiedpayment.webp",
      },
    ],
  },
  {
    name: "UI/UX Competition",
    stats: [
      {
        value: "200",
        label: "Participants",
        icon: "/src/assets/admin/dashboard/participant.webp",
      },
      {
        value: "78",
        label: "Payments",
        icon: "/src/assets/admin/dashboard/payment.webp",
      },
      {
        value: "72",
        label: ["Verified", "Payments"],
        icon: "/src/assets/admin/dashboard/verifiedpayment.webp",
      },
    ],
  },
  {
    name: "Informatics Olympiad",
    stats: [
      {
        value: "500",
        label: "Participants",
        icon: "/src/assets/admin/dashboard/participant.webp",
      },
      {
        value: "85",
        label: "Payments",
        icon: "/src/assets/admin/dashboard/payment.webp",
      },
      {
        value: "45",
        label: ["Verified", "Payments"],
        icon: "/src/assets/admin/dashboard/verifiedpayment.webp",
      },
    ],
  },
];

export default function AdminDashboard() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const currentStats = events[currentEvent].stats;

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  const visibleStats = currentStats;

  return (
    <div className="w-full text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-0 pt-0 sm:px-8 lg:px-10 lg:pt-12">
        <section className="flex w-full flex-col items-center">
          <h2
            className="text-center text-[3rem] font-black uppercase tracking-wide text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:text-[4rem] lg:text-[4.75rem]"
            data-aos="fade-up"
          >
            {events[currentEvent].name}
          </h2>

          {/* Stats Grid */}
          <div
            className={`mt-10 grid w-full max-w-7xl gap-3 sm:gap-4 ${
              visibleStats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
            }`}
          >
            {visibleStats.map((stat, index) => (
              <div
                key={stat.value}
                data-aos="flip-left"
                data-aos-delay={index * 100}
                className="h-full"
              >
                <article className="group relative isolate flex h-full min-h-44 flex-col items-center justify-center overflow-hidden rounded-3xl cursor-pointer border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-5 py-7 text-center shadow-[0_14px_34px_rgba(0,0,0,0.26)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-2 hover:border-white/60 hover:shadow-[0_18px_42px_rgba(0,0,0,0.34)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_42%)]" />
                  <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl transition duration-300 group-hover:bg-white/15" />
                  <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-black/15 blur-2xl" />

                  <div className="relative mb-3 grid h-16 w-16 place-items-center transition duration-300 group-hover:scale-110">
                    <img
                      src={stat.icon}
                      alt={
                        typeof stat.label === "string"
                          ? stat.label
                          : stat.label[0]
                      }
                      className="h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
                    />
                  </div>

                  <div className="relative text-[3.2rem] font-black leading-none tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)] sm:text-[4rem]">
                    {stat.value}
                  </div>

                  <p className="relative mt-3 text-[1.15rem] font-bold leading-tight text-white/95 sm:text-[1.3rem]">
                    {Array.isArray(stat.label) ? (
                      <>
                        <span>{stat.label[0]}</span>
                        <br />
                        <span>{stat.label[1]}</span>
                      </>
                    ) : (
                      stat.label
                    )}
                  </p>
                </article>
              </div>
            ))}
          </div>

          {/* Event Navigation */}
          <div className="mt-10 flex items-center gap-4 sm:mt-12">
            <button
              type="button"
              aria-label="Previous event"
              onClick={prevEvent}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/80 bg-transparent text-white transition hover:bg-white/10 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              {events.map((_, index) => (
                <span
                  key={index}
                  className={`h-0.5 rounded-full transition-all ${
                    index === currentEvent ? "w-16 bg-white" : "w-9 bg-white/35"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next event"
              onClick={nextEvent}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/80 bg-transparent text-white transition hover:bg-white/10 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
