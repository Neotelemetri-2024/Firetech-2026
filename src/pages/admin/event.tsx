import { useState } from "react";
import EventsTable, { type EventRow } from "../../components/events/tableevent";
import ParticipantsTable, {
  type ParticipantRow,
} from "../../components/events/tableparticipant";

const EVENTS = ["Hackathon", "Fast Typing", "E-Football", "UI/UX Competition"];

/* ── Dummy participant data ── */
const allParticipants: ParticipantRow[] = [
  {
    id: "p1",
    name: "Wonwoo",
    email: "jeonwonwoo@gmail.com",
    eventName: "Hackathon",
    registeredAt: "10 Agustus 2025",
    team: "Firestorm Alpha",
  },
  {
    id: "p2",
    name: "Jeonghan",
    email: "jeonghan@gmail.com",
    eventName: "Hackathon",
    registeredAt: "11 Agustus 2025",
    team: "Firestorm Alpha",
  },
  {
    id: "p3",
    name: "Mingyu",
    email: "kiming@gmail.com",
    eventName: "Hackathon",
    registeredAt: "12 Agustus 2025",
    team: "Byte Brigade",
  },
  {
    id: "p4",
    name: "Abdul",
    email: "abdull@gmail.com",
    eventName: "Hackathon",
    registeredAt: "12 Agustus 2025",
    team: "Byte Brigade",
  },
  {
    id: "p5",
    name: "Sakura",
    email: "sakura@gmail.com",
    eventName: "Fast Typing",
    registeredAt: "20 Agustus 2025",
  },
  {
    id: "p6",
    name: "Rizky",
    email: "rizky@gmail.com",
    eventName: "Fast Typing",
    registeredAt: "21 Agustus 2025",
  },
  {
    id: "p7",
    name: "Budi",
    email: "budi@gmail.com",
    eventName: "Fast Typing",
    registeredAt: "19 Agustus 2025",
  },
  {
    id: "p8",
    name: "Siti",
    email: "siti@gmail.com",
    eventName: "E-Football",
    registeredAt: "5 Juli 2025",
    team: "Garuda FC",
  },
  {
    id: "p9",
    name: "Joko",
    email: "joko@gmail.com",
    eventName: "E-Football",
    registeredAt: "6 Juli 2025",
    team: "Garuda FC",
  },
  {
    id: "p10",
    name: "Dewi",
    email: "dewi@gmail.com",
    eventName: "UI/UX Competition",
    registeredAt: "25 Agustus 2025",
  },
  {
    id: "p11",
    name: "Alex",
    email: "alex@gmail.com",
    eventName: "UI/UX Competition",
    registeredAt: "26 Agustus 2025",
  },
  {
    id: "p12",
    name: "Maya",
    email: "maya@gmail.com",
    eventName: "UI/UX Competition",
    registeredAt: "27 Agustus 2025",
  },
];

export default function AdminEvent() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const eventData: EventRow[] = [
    {
      id: "1",
      name: "Hackathon",
      category: "Programming",
      date: "20 Agustus 2025",
      status: "Aktif",
      participants: 80,
      maxParticipants: 100,
      registrationDeadline: "15 Agustus 2025",
    },
    {
      id: "2",
      name: "Fast Typing",
      category: "Skill",
      date: "25 Agustus 2025",
      status: "Akan Datang",
      participants: 45,
      maxParticipants: 100,
      registrationDeadline: "22 Agustus 2025",
    },
    {
      id: "3",
      name: "E-Football",
      category: "Esport",
      date: "10 Juli 2025",
      status: "Selesai",
      participants: 64,
      maxParticipants: 64,
      registrationDeadline: "5 Juli 2025",
    },
    {
      id: "4",
      name: "UI/UX Competition",
      category: "Design",
      date: "30 Agustus 2025",
      status: "Aktif",
      participants: 32,
      maxParticipants: 50,
      registrationDeadline: "25 Agustus 2025",
    },
  ];

  const filteredEvents =
    selectedEvent === null
      ? eventData
      : eventData.filter((event) => event.name === selectedEvent);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <div className="min-h-screen">
        <main className="mx-auto w-full max-w-275 px-4 pb-0 pt-0 sm:px-5 sm:pt-12">
          <section className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              Event
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Manajemen Event
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Kelola seluruh event dan lihat detail masing-masing event melalui
              filter cepat di bawah ini.
            </p>

            {/* EVENT FILTER */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {EVENTS.map((event) => {
                const isActive = selectedEvent === event;

                return (
                  <button
                    key={event}
                    type="button"
                    onClick={() => setSelectedEvent(isActive ? null : event)}
                    className={`rounded-2xl border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] bg-transparent px-4 py-4 text-left text-sm font-bold transition-all hover:-translate-y-0.5 duration-200 cursor-pointer
                    ${
                      isActive
                        ? "border-emerald-400 bg-gradient-to-r from-emerald-500/40 to-emerald-400/30 text-white ring-2 ring-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                        : "border-white/20 bg-black/20 text-white hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    {event}
                  </button>
                );
              })}
            </div>

            {/* ACTIVE FILTER INFO */}
            {selectedEvent && (
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-emerald-300">
                  Menampilkan detail event:{" "}
                  <span className="font-black">{selectedEvent}</span>
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
                >
                  Tampilkan Semua Event
                </button>
              </div>
            )}

            {/* EVENTS TABLE */}
            <div className="mt-8">
              <EventsTable
                events={filteredEvents}
                pageSize={5}
                onView={(event) => {
                  console.log("View:", event);
                }}
                onEdit={(event) => {
                  console.log("Edit:", event);
                }}
                onDelete={(event) => {
                  console.log("Delete:", event);
                }}
              />
            </div>

            {/* PARTICIPANTS TABLE — only shown when an event is selected */}
            {selectedEvent && (
              <div className="mt-8">
                <ParticipantsTable
                  participants={allParticipants}
                  selectedEvent={selectedEvent}
                  onBack={() => setSelectedEvent(null)}
                  pageSize={10}
                />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
