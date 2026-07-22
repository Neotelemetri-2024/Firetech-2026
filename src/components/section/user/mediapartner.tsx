// Import React hooks untuk lifecycle management dan DOM manipulation
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/themecontext";


// Tipe data untuk media partner dengan property name dan logo
type MediaPartner = {
  name: string;
  logo: string;
};

// Data array media partner - berisi 4 media partner
const mediaPartners: MediaPartner[] = [
  {
    name: "Media Partner 1",
    logo: "/public/vite.svg",
  },
  {
    name: "Media Partner 2",
    logo: "/src/assets/event/fasttyping.webp",
  },
  {
    name: "Media Partner 3",
    logo: "/images/mediapartner3.png",
  },
  {
    name: "Media Partner 4",
    logo: "/images/mediapartner4.png",
  },
];

// Main component untuk menampilkan media partner dengan animasi
export default function MediaPartner() {
  // Reference ke section element untuk scroll trigger
  const sectionRef = useRef<HTMLElement>(null);
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

        .mp-card:hover .mp-logo {
          animation: logoSpin 0.6s ease-in-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .mp-marquee-track {
          animation: marquee 25s linear infinite;
        }

        .mp-marquee-wrapper:hover .mp-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <div
          className={`mp-header mx-auto mb-24 max-w-3xl text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* Heading */}
          <h2
            className={`group text-5xl md:text-6xl font-black font-syncopate ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            {"OUR MEDIA PARTNERS".split("").map((char, index) => (
              <span
                key={index}
                className="wave-letter"
                style={{
                  animationDelay: `${index * 40}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          {/* Deskripsi section */}
          <p className="mx-auto mt-7 font-space max-w-3xl text-lg leading-8 text-slate-400">
            Firetech bekerja sama dengan media partner yang mendukung penyebaran
            informasi tentang inovasi, teknologi, dan kewirausahaan.
          </p>
        </div>

        {/* ===== MEDIA PARTNER CARDS SECTION ===== */}
        <div
          className={`mp-marquee-wrapper relative mb-24 overflow-hidden ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* Track yang bergerak horizontal secara terus-menerus (infinite marquee) */}
          <div className="mp-marquee-track flex w-max gap-12">
            {/* Media partner di-duplikasi 2x supaya looping terlihat seamless */}
            {[...mediaPartners, ...mediaPartners].map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="
                mp-card
                group
                relative
                w-64
                shrink-0
                overflow-hidden
                p-12
                transition-all
                duration-500
                hover:-translate-y-3
                cursor-pointer
                perspective-1000
                "
              >
                {/* Media Partner Logo */}
                <img
                  src={item.logo}
                  alt={item.name}
                  className="
                  mp-logo
                  relative
                  z-20
                  mx-auto
                  h-24
                  object-contain
                  transition-all
                  duration-500
                  transform-3d
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
