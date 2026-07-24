import { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";
import { useTheme } from "../../../context/themecontext";
import { motion } from "framer-motion";
import { headingVariants } from "../../animations/headingvariants";
import {
  Calendar,
  Trophy,
  Gamepad2,
  Monitor,
  Keyboard,
  PenTool,
  Rocket,
} from "lucide-react";

const timelineEvents = [
  {
    title: "Open Registration",
    date: "1 Agustus 2026",
    icon: <Calendar size={22} />,
  },
  {
    title: "Opening Ceremony",
    date: "25 September 2026",
    icon: <Rocket size={22} />,
  },
  {
    title: "Hackathon",
    date: "25-26 September 2026",
    icon: <Trophy size={22} />,
  },
  {
    title: "Line Follower",
    date: "25 September 2026",
    icon: <Monitor size={22} />,
  },
  {
    title: "Fast Typing",
    date: "25 September 2026",
    icon: <Keyboard size={22} />,
  },
  {
    title: "E-Football",
    date: "26 September 2026",
    icon: <Gamepad2 size={22} />,
  },
  {
    title: "UI/UX Competition",
    date: "26 September 2026",
    icon: <PenTool size={22} />,
  },
];

// Pre-generate stable particle positions/sizes so we don't call Math.random during render

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineGlowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Heading stagger reveal ---
      const headingChildren = headingRef.current?.children;
      if (headingChildren) {
        gsap.fromTo(
          headingChildren,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // --- Timeline line draw-on-scroll ---
      gsap.fromTo(
        lineRef.current,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );

      // --- Line glow parallax ---
      if (lineGlowRef.current) {
        gsap.to(lineGlowRef.current, {
          opacity: 0.6,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // --- Cards fade-up stagger ---
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });

      // --- Dots pulse + glow loop ---
      dotsRef.current.forEach((dot) => {
        if (!dot) return;

        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });

      // --- Floating ambient particles ---
      const particleEls = sectionRef.current?.querySelectorAll(".particle");
      if (particleEls) {
        particleEls.forEach((p) => {
          gsap.to(p, {
            y: -30 - Math.random() * 40,
            x: Math.random() > 0.5 ? 10 : -10,
            opacity: 0.2 + Math.random() * 0.3,
            duration: 2 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12">
      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-24 text-center">
          <motion.h2
            variants={headingVariants.title}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
            className={`text-5xl md:text-6xl font-black font-syncopate ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            OUR TIMELINE
          </motion.h2>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-32 rounded-full ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />

          <motion.p
            variants={headingVariants.subtitle}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
            className={`mx-auto mt-7 max-w-3xl font-space text-lg leading-8 ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Follow every important milestone, from registration to the grand
            finale, and stay prepared for each exciting stage of the
            competition.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop vertical line */}
          <div
            ref={lineRef}
            className={`absolute left-1/2 top-0 hidden h-full w-0.75 -translate-x-1/2 rounded-full md:block ${
              darkMode ? "bg-blue-700 " : "bg-red-700 "
            }`}
            style={{ transformOrigin: "top center" }}
          />

          {/* Line glow */}
          <div
            ref={lineGlowRef}
            className={`absolute left-1/2 top-0 hidden h-full w-16 -translate-x-1/2 blur-2xl md:block ${
              darkMode
                ? "bg-linear-to-b from-red-700/20 via-blue-700/20 to-red-700/20"
                : "bg-linear-to-b from-blue-700/20 via-red-700/20 to-blue-700/20"
            }`}
          />

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`relative mb-20 flex items-center ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Connecting bridge */}
              <div
                className={`absolute left-1/2 z-10 hidden h-0.75 w-[8%] -translate-x-1/2 md:block ${
                  darkMode
                    ? "bg-linear-to-r from-transparent via-blue-700/30 to-transparent"
                    : "bg-linear-to-r from-transparent via-red-700/30 to-transparent"
                }`}
              />
              {/* Dot */}
              <div
                ref={(el) => {
                  dotsRef.current[index] = el;
                }}
                className={`absolute left-1/2 z-20 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-[3px] md:flex ${
                  darkMode
                    ? "border-blue-700 bg-blue-100 shadow-[0_0_20px_rgba(29,78,216,0.3)]"
                    : "border-red-700 bg-red-100 shadow-[0_0_20px_rgba(185,28,28,0.3)]"
                }`}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    darkMode ? "bg-blue-500" : "bg-red-500"
                  }`}
                />
              </div>

              {/* Card */}
              <div
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`
                group relative
                w-full md:w-[44%]
                rounded-2xl
                p-6
                backdrop-blur-xl
                cursor-pointer
                transition-all
                duration-500
                ease-out
                hover:scale-[1.02]
                hover:-translate-y-1.5
                ${
                  darkMode
                    ? `
                      border border-black/10
                      bg-white/30
                      hover:border-blue-700/40
                      hover:bg-blue-700/5
                      hover:shadow-[0_0_50px_rgba(29,78,216,0.15)]
                    `
                    : `
                      border border-white/10
                      bg-white/4
                      hover:border-red-700/40
                      hover:bg-red-700/5
                      hover:shadow-[0_0_50px_rgba(185,28,28,0.15)]
                    `
                }
              `}
              >
                {/* Inner gradient glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-400/10 via-transparent to-blue-500/10" />
                </div>

                <div className="relative flex items-center gap-5">
                  {/* Icon */}
                  <div
                    className={`
                    flex h-14 w-14 shrink-0 items-center justify-center rounded-xl
                    transition-all duration-500
                    group-hover:scale-110
                    ${
                      darkMode
                        ? "bg-black text-white group-hover:bg-blue-700 group-hover:text-white"
                        : "bg-white text-black group-hover:bg-red-700 group-hover:text-white"
                    }
                  `}
                  >
                    {event.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <h3
                      className={`text-xl font-bold transition-colors duration-300 ${
                        darkMode
                          ? "text-black group-hover:text-blue-700"
                          : "text-white group-hover:text-red-700"
                      }`}
                    >
                      {event.title}
                    </h3>

                    <p
                      className={`mt-0.5 text-sm transition-colors duration-300 ${
                        darkMode
                          ? "text-gray-600 group-hover:text-blue-600"
                          : "text-slate-400 group-hover:text-red-600"
                      }`}
                    >
                      {event.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
