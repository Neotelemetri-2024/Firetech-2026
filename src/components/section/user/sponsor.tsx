// Import React hooks untuk lifecycle management dan DOM manipulation
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/themecontext";

// Tipe data untuk sponsor dengan property name dan logo
type Sponsor = {
  name: string;
  logo: string;
};

// Data array sponsor - berisi 5 sponsor
const sponsors: Sponsor[] = [
  {
    name: "Sponsor 1",
    logo: "/public/vite.svg",
  },
  {
    name: "Sponsor 2",
    logo: "/public/tabaringpov.webp",
  },
  {
    name: "Sponsor 3",
    logo: "/images/sponsor3.png",
  },
  {
    name: "Sponsor 4",
    logo: "/images/sponsor4.png",
  },
  {
    name: "Sponsor 5",
    logo: "/images/sponsor5.png",
  },
];

// Main component untuk menampilkan sponsor dengan animasi
export default function Sponsor() {
  // Reference ke section element untuk scroll trigger
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode } = useTheme();

  // Hook untuk menjalankan animasi ketika component di-mount
  useEffect(() => {
    // Intersection Observer untuk mendeteksi ketika section masuk ke viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-18">
      {/* Background decorations sudah di-handle oleh mainlayout.tsx */}

      {/* CSS Keyframes untuk floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes logoSpin {
          from {
            transform: rotateY(0deg) scale(1.1);
          }
          to {
            transform: rotateY(360deg) scale(1.1);
          }
        }

        .sp-card:hover .sp-logo {
          animation: logoSpin 0.6s ease-in-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .sp-marquee-track {
          animation: marquee 25s linear infinite;
        }

        .sp-marquee-wrapper:hover .sp-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <div
          className={`sp-header mx-auto mb-24 max-w-3xl text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* Heading */}
          <div ref={headingRef} className="mb-8 text-center">
            <h2
              className={`
    text-5xl md:text-6xl
    font-black
    font-syncopate
    ${darkMode ? "text-black" : "text-white"}
    animate-[floating_5s_ease-in-out_infinite]
  `}
            >
              OUR SPONSORS
            </h2>

            <p
              className={`mx-auto mt-7 max-w-3xl font-space text-lg leading-8 ${
                darkMode ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Proudly supported by industry leaders, innovative companies, and
              valued partners who help make Firetech 2026 possible.
            </p>
          </div>
        </div>

        {/* ===== SPONSOR CARDS SECTION ===== */}
        <div
          className={`sp-marquee-wrapper relative mb-24 overflow-hidden ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* Track yang bergerak horizontal secara terus-menerus (infinite marquee) */}
          <div className="sp-marquee-track flex w-max gap-8">
            {/* Sponsor di-duplikasi 2x supaya looping terlihat seamless */}
            {[...sponsors, ...sponsors].map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="
                sp-card
                group
                relative
                w-64
                shrink-0
                overflow-hidden
                p-8
                transition-all
                duration-500
                hover:-translate-y-3
                cursor-pointer
                perspective-1000
                "
              >
                {/* Sponsor Logo */}
                <img
                  src={item.logo}
                  alt={item.name}
                  className="
                  sp-logo
                  relative
                  z-20
                  mx-auto
                  h-24
                  object-contain
                  transition-all
                  transform-3d
                  duration-500
                  group-hover:scale-110
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
