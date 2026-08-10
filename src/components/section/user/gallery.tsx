import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/themecontext";
import { headingVariants } from "../../animations/headingvariants";
import gallery1Img from "../../../assets/gallery/gallery1.webp";
import gallery2Img from "../../../assets/gallery/gallery2.webp";
import gallery3Img from "../../../assets/gallery/gallery3.webp";
import gallery4Img from "../../../assets/gallery/gallery4.webp";
import gallery5Img from "../../../assets/gallery/gallery5.webp";
import gallery6Img from "../../../assets/gallery/gallery6.webp";

// Tipe data untuk galeri dengan property name dan image
type GalleryItem = {
  name: string;
  image: string;
};

// Data array galeri - 4 foto dokumentasi kegiatan sebelumnya
const galleryItems: GalleryItem[] = [
  {
    name: "Gallery 1",
    image: gallery1Img,
  },
  {
    name: "Gallery 2",
    image: gallery2Img,
  },
  {
    name: "Gallery 3",
    image: gallery3Img,
  },
  {
    name: "Gallery 4",
    image: gallery4Img,
  },
  {
    name: "Gallery 5",
    image: gallery5Img,
  },
  {
    name: "Gallery 6",
    image: gallery6Img,
  },
];

// Interval auto-slide dalam milidetik
const SLIDE_INTERVAL = 2500;

// Durasi satu pergerakan slide (detik) - makin besar makin smooth/lambat
const SLIDE_DURATION = 1.2;

// Easing eksponensial ease-out - meluncur lalu mengerem halus
const SLIDE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

// Track berisi 3x copy slides agar bisa looping seamless dua arah
const TRACK_COPIES = 3;
const ITEM_COUNT = galleryItems.length;
const TRACK_COUNT = ITEM_COUNT * TRACK_COPIES;

// Posisi awal menunjuk ke copy tengah sehingga bisa geser maju/mundur bebas
const BASE_INDEX = ITEM_COUNT;

// Lebar 1 slide dalam persen terhadap lebar track (translateX % = relatif elemen)
const SLIDE_WIDTH_PERCENT = 100 / TRACK_COUNT;

// Main component untuk menampilkan galeri kegiatan dengan auto-slide
export default function Gallery() {
  const { darkMode } = useTheme();

  // State track: posisi aktif + flag "lompatan instan" saat wrap antar-copy
  const [trackState, setTrackState] = useState({
    position: BASE_INDEX,
    instant: false,
  });
  // Pause auto-slide saat hover/kursor di atas carousel
  const [isPaused, setIsPaused] = useState(false);
  const frameRef = useRef<number | null>(null);

  const { position, instant } = trackState;

  // Index slide yang terlihat (0..ITEM_COUNT-1)
  const currentIndex = position % ITEM_COUNT;

  // Pindah slide; saat melewati ujung track, lompat ke copy sisi lain secara
  // instan (gambar identik) sehingga looping terasa kontinu tanpa jeda
  const moveBy = useCallback((delta: number) => {
    setTrackState(({ position: current }) => {
      let next = current + delta;
      if (next >= TRACK_COUNT) {
        next -= TRACK_COUNT;
        return { position: next, instant: true };
      }
      if (next < 0) {
        next += TRACK_COUNT;
        return { position: next, instant: true };
      }
      return { position: next, instant: false };
    });
  }, []);

  // Setelah lompatan instan selesai di-render, aktifkan kembali transisi halus
  useEffect(() => {
    if (!instant) return;
    frameRef.current = requestAnimationFrame(() => {
      setTrackState((state) =>
        state.instant ? { ...state, instant: false } : state,
      );
    });
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [instant]);

  // Auto-slide otomatis setiap interval; di-reset tiap kali posisi berubah
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => moveBy(1), SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, position, moveBy]);

  // Geser langsung ke slide tertentu (untuk dots) lewat jarak terpendek
  const goToIndex = (targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    const forwardDelta = (targetIndex - currentIndex + ITEM_COUNT) % ITEM_COUNT;
    const shortestDelta =
      forwardDelta <= ITEM_COUNT / 2 ? forwardDelta : forwardDelta - ITEM_COUNT;
    moveBy(shortestDelta);
  };

  // Posisi translateX track dalam persen
  const translateX = -position * SLIDE_WIDTH_PERCENT;

  return (
    <section className="relative overflow-hidden py-18">
      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={headingVariants.title}
            className={`text-5xl font-black font-syncopate md:text-6xl ${
              darkMode ? "text-black" : "text-white"
            } animate-[floating_5s_ease-in-out_infinite]`}
          >
            OUR GALLERY
          </motion.h2>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-32 rounded-full ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />
        </motion.div>

        {/* ===== GALLERY CONTENT ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* ===== Kiri: Auto-slide carousel ===== */}
          <motion.div variants={headingVariants.card} className="w-full">
            <div
              className={`group relative aspect-4/3 w-full overflow-hidden rounded-2xl border cursor-pointer ${
                darkMode ? "border-slate-300" : "border-white/10"
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Track slide - semua gambar ter-mount & digeser pakai translateX */}
              <div
                className="flex h-full w-full"
                style={{
                  width: `${TRACK_COUNT * 100}%`,
                  transform: `translateX(${translateX}%)`,
                  transition: instant
                    ? "none"
                    : `transform ${SLIDE_DURATION}s ${SLIDE_EASING}`,
                  willChange: "transform",
                }}
              >
                {Array.from({ length: TRACK_COUNT }, (_, i) => {
                  const item = galleryItems[i % ITEM_COUNT];
                  return (
                    <div
                      key={`${item.name}-${i}`}
                      className="relative h-full shrink-0"
                      style={{ width: `${SLIDE_WIDTH_PERCENT}%` }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Indikator dots */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {galleryItems.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => goToIndex(i)}
                    aria-label={`Lihat ${item.name}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? `w-8 ${darkMode ? "bg-blue-700" : "bg-red-700"}`
                        : `w-2.5 ${
                            darkMode ? "bg-slate-400/70" : "bg-white/50"
                          }`
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== Kanan: Deskripsi galeri ===== */}
          <motion.div
            variants={headingVariants.subtitle}
            className="text-center lg:text-left"
          >
            <p
              className={`font-orbitron text-2xl font-bold ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              MOMENTS FROM THE PAST
            </p>

            <div
              className={`mx-auto mt-4 h-1 w-24 rounded-full lg:mx-0 ${
                darkMode ? "bg-blue-700" : "bg-red-700"
              }`}
            />

            <p
              className={`mx-auto mt-7 max-w-xl font-space text-lg leading-8 lg:mx-0 ${
                darkMode ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Relive the excitement, energy, and innovation from Firetech's
              previous editions. This gallery showcases all the memorable
              activities, competitions, and celebrations that took place, giving
              you a glimpse of the vibrant community behind every event.
            </p>

            <p
              className={`mx-auto mt-4 max-w-xl font-space text-lg leading-8 lg:mx-0 ${
                darkMode ? "text-slate-600" : "text-slate-400"
              }`}
            >
              From intense hackathon battles to the thrill of e-football
              matches, every picture tells a story worth remembering. Be part of
              the next chapter at Firetech 2026.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
