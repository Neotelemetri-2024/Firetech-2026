import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../../utils/gsap";
import { useTheme } from "../../../context/themecontext";
import Scenario1 from "../../scenario/event/scenario1";
import EventSlide from "../../scenario/event/eventslide";
import MobileEventCard from "../../scenario/event/eventcardmobile";
import MobileEventModal from "../../scenario/event/eventmodalmobile";
import hackathonImg from "../../../assets/gallery/gallery1.webp";
import uiuxImg from "../../../assets/event/uiux.webp";
import efootballImg from "../../../assets/event/efootball.webp";
import fasttypingImg from "../../../assets/event/fasttyping.webp";
import { headingVariants } from "../../animations/headingvariants";
import { getCompetitions } from "../../../services/competition.services";

type CompetitionStatus =
  | "open"
  | "upcoming"
  | "closed"
  | "ongoing"
  | "finished";

const events = [
  {
    id: "01",
    slug: "hackathon",
    title: "Hackathon",
    tagline: "Build. Innovate. Compete.",
    description:
      "Kembangkan solusi teknologi inovatif dan ubah gagasan menjadi purwarupa yang berdampak nyata. Bekerjalah sebagai tim untuk memecahkan tantangan dunia nyata dalam batasan waktu tertentu.",
    image: hackathonImg,
    color: "#ef4444",
  },

  {
    id: "02",
    slug: "ui-ux-competition",
    title: "UI/UX",
    tagline: "Design the Future.",
    description:
      "Ciptakan pengalaman digital yang intuitif dan menarik yang menjawab kebutuhan nyata pengguna. Tunjukkan kreativitas Anda melalui desain yang berpusat pada pengguna dan antarmuka yang inovatif.",
    image: uiuxImg,
    color: "#06b6d4",
  },
  {
    id: "03",
    slug: "e-football",
    title: "E-Football",
    tagline: "Play Beyond Limits.",
    description:
      "Bertandinglah dalam laga-laga seru yang menuntut strategi, presisi, dan pengambilan keputusan yang cepat. Buktikan kemampuanmu di lapangan virtual dan raih kejayaan juara.",
    image: efootballImg,
    color: "#22c55e",
  },
  {
    id: "04",
    slug: "ft",
    title: "Fast Typing",
    tagline: "Speed Meets Precision.",
    description:
      "Uji kecepatan dan akurasi mengetik Anda untuk berkompetisi mendapatkan gelar pengetik tercepat di Firetech 2026.",
    image: fasttypingImg,
    color: "#8b5cf6",
  },
];
export default function Event() {
  const { darkMode } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof events)[number] | null
  >(null);
  const TRACK_OFFSET = 0;
  const totalPanels = events.length + 1;
  const [competitionStatuses, setCompetitionStatuses] = useState<
    Record<string, CompetitionStatus>
  >({});

  const [competitionFullMap, setCompetitionFullMap] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchCompetitionStatuses = async () => {
      try {
        const competitions = await getCompetitions();

        const statusMap: Record<string, CompetitionStatus> = {};
        const fullMap: Record<string, boolean> = {};

        competitions.forEach((competition) => {
          statusMap[competition.slug] = competition.status;
          fullMap[competition.slug] = competition.isFull;
        });

        // Fast Typing selalu aktif
        statusMap["ft"] = "open";
        fullMap["ft"] = false;

        setCompetitionStatuses(statusMap);
        setCompetitionFullMap(fullMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompetitionStatuses();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const panels = gsap.utils.toArray<HTMLElement>(".panel", track);
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      gsap.set(track, { y: TRACK_OFFSET });
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top+=50 top",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (panels.length - 1), duration: 0.4 },
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
        },
      });
    }, section);
    return () => ctx.revert();
  }, [TRACK_OFFSET, totalPanels]);
  return (
    <section
      ref={sectionRef}
      className="
      relative
      min-h-screen
      pt-20
      overflow-hidden
    "
    >
      {/* Background */}
      <div
        className="
        hidden
        lg:block
        absolute
        left-1/2
        top-1/2
        h-175
        w-175
        -translate-x-1/2
        -translate-y-1/2
      "
      />

      <div
        className="
        hidden
        lg:block
        absolute
        left-1/2
        top-0
        h-75
        w-225
        -translate-x-1/2
      "
      />
      {/* ===================================================== */}
      {/* Desktop Layout */}
      {/* ===================================================== */}
      <div className="hidden overflow-visible lg:block">
        <div
          ref={trackRef}
          className="event-track flex h-screen"
          style={{
            width: `${totalPanels * 100}vw`,
          }}
        >
          {/* ========================= */}
          {/* Panel 1 */}
          {/* ========================= */}

          <div
            className="
            panel
            flex
            min-h-screen
            w-screen
            shrink-0
            flex-col
          "
          >
            {/* Header */}
            <div
              className="
              flex
              shrink-0
              flex-col
              items-center
              justify-center
              pt-28
              xl:pt-24
              2xl:pt-40
              pb-6
            "
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-bold font-orbitron ${
                  darkMode ? "text-black" : "text-white"
                }`}
              >
                OUR EVENT
              </motion.p>

              <motion.div
                custom={2}
                variants={headingVariants}
                className={`mx-auto mt-4 h-1 w-32 rounded-full ${
                  darkMode ? "bg-blue-700" : "bg-red-700"
                }`}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className={`mx-auto mt-6 max-w-3xl text-center text-lg font-jakarta leading-relaxed ${
                  darkMode ? "text-black" : "text-white"
                }`}
              >
                Temukan serangkaian kompetisi menarik yang dirancang untuk
                menguji kreativitas, keterampilan teknis, dan pemikiran inovatif
                Anda.
              </motion.p>
            </div>

            <div
              className="
              hidden
              lg:flex
              flex-1
              items-center
              justify-center
              pb-6
              px-2
              xl:px-4
              2xl:px-8
              overflow-visible
            "
            >
              <Scenario1 />
            </div>
          </div>

          {/* ========================= */}
          {/* Event Slides */}
          {/* ========================= */}

          {events.map((event) => (
            <div
              key={event.id}
              className="
              panel
              flex
              min-h-screen
              w-screen
              shrink-0
            "
            >
              <EventSlide
                key={event.id}
                id={event.id}
                title={event.title}
                tagline={event.tagline}
                description={event.description}
                image={event.image}
                color={event.color}
                status={competitionStatuses[event.slug] ?? "upcoming"}
                isFull={competitionFullMap[event.slug] ?? false}
              />
            </div>
          ))}
        </div>
      </div>
      {/* ===================================================== */}
      {/* Mobile Layout */}
      {/* ===================================================== */}
      <div
        className="
        flex
        flex-col
        px-6
        pt-28
        pb-16
        lg:hidden
      "
      >
        {/* Header */}

        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className={`text-4xl font-bold font-orbitron ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            OUR EVENT
          </motion.p>

          <motion.div
            custom={2}
            variants={headingVariants}
            className={`mx-auto mt-4 h-1 w-24 rounded-full ${
              darkMode ? "bg-blue-700" : "bg-red-700"
            }`}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={`mx-auto mt-5 max-w-md font-jakarta text-sm leading-7 ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Temukan serangkaian kompetisi menarik yang dirancang untuk menguji
            kreativitas, keterampilan teknis, dan pemikiran inovatif Anda.
          </motion.p>
        </div>

        {/* Event List */}

        <div className="mt-14 space-y-16">
          {events.map((event) => (
            <MobileEventCard
              key={event.id}
              id={event.id}
              title={event.title}
              tagline={event.tagline}
              image={event.image}
              color={event.color}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>
      <MobileEventModal
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        id={selectedEvent?.id ?? ""}
        title={selectedEvent?.title ?? ""}
        tagline={selectedEvent?.tagline ?? ""}
        description={selectedEvent?.description ?? ""}
        image={selectedEvent?.image ?? ""}
        color={selectedEvent?.color ?? "#ffffff"}
        status={
          selectedEvent
            ? (competitionStatuses[selectedEvent.slug] ?? "upcoming")
            : "upcoming"
        }
        isFull={
          selectedEvent
            ? (competitionFullMap[selectedEvent.slug] ?? false)
            : false
        }
      />
    </section>
  );
}
