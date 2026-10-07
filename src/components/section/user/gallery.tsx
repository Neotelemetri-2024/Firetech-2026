import { useEffect, useState } from "react";
import { useTheme } from "../../../context/themecontext";
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

const SLIDE_INTERVAL = 3500;

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

// Main component untuk menampilkan galeri kegiatan dengan auto-slide
export default function Gallery() {
  const { darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % galleryItems.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-18">
      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header dengan title dan description */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          {/* Heading */}
          <h2
            className={`text-5xl font-black font-orbitron md:text-6xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            OUR GALLERY
          </h2>

          <div
            className={`mx-auto mt-4 h-1 w-32 rounded-full ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />
        </div>

        {/* ===== GALLERY CONTENT ===== */}
        <div
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* ===== Kiri: Auto-slide carousel ===== */}
          <div className="w-full">
            <div
              className={`group relative aspect-4/3 w-full overflow-hidden rounded-2xl border cursor-pointer ${
                darkMode ? "border-slate-300" : "border-white/10"
              }`}
            >
              {/* Keep the slide transition on the compositor so scrolling stays responsive. */}
              <div
                className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{
                  width: `${galleryItems.length * 100}%`,
                  transform: `translate3d(-${(currentIndex * 100) / galleryItems.length}%, 0, 0)`,
                  willChange: "transform",
                }}
              >
                {galleryItems.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="relative h-full shrink-0"
                    style={{ width: `${100 / galleryItems.length}%` }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              {/* Indikator dots */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {galleryItems.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
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
          </div>

          {/* ===== Kanan: Deskripsi galeri ===== */}
          <div className="text-center lg:text-left">
            <p
              className={`font-orbitron text-2xl font-bold font-orbitron ${
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
              className={`mx-auto mt-7 max-w-xl text-left font-jakarta text-base leading-7 sm:text-lg sm:leading-8 lg:mx-0 lg:text-justify ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              Rasakan kembali keseruan, energi, dan inovasi dari penyelenggaraan
              Firetech sebelumnya. Galeri ini menampilkan berbagai kegiatan,
              kompetisi, dan perayaan berkesan yang telah berlangsung, serta
              memberikan gambaran tentang komunitas dinamis di balik setiap
              acara.
            </p>

            <p
              className={`mx-auto mt-4 max-w-xl text-left font-jakarta text-base leading-7 sm:text-lg sm:leading-8 lg:mx-0 lg:text-justify ${
                darkMode ? "text-black" : "text-white"
              }`}
            >
              Mulai dari sengitnya kompetisi hackathon hingga keseruan
              pertandingan e-football, setiap foto menyimpan cerita yang layak
              dikenang. Jadilah bagian dari babak selanjutnya di Firetech 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
