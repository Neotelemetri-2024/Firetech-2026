import { useRef, useState } from "react";
import { CalendarPlus, X } from "lucide-react";
import EventsTable, { type EventRow } from "../../components/events/tableevent";
import ParticipantsTable, {
  type ParticipantRow,
} from "../../components/events/tableparticipant";
import AddEvent, { type NewEventData } from "../../components/form/addevent";
import EditEvent, { type EventFormData } from "../../components/form/editevent";
import EventDetailModal from "../../components/form/eventdetailmodal";
import DeleteModal from "../../components/form/delete";
import Toast from "../../components/ui/toast";

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

const DUMMY_EVENTS: EventRow[] = [
  {
    id: "1",
    name: "Hackathon",
    category: "Programming",
    date: "20 Agustus 2025",
    status: "Active",
    participants: 80,
    maxParticipants: 100,
    registrationDeadline: "15 Agustus 2025",
  },
  {
    id: "2",
    name: "Fast Typing",
    category: "Skill",
    date: "25 Agustus 2025",
    status: "Upcoming",
    participants: 45,
    maxParticipants: 100,
    registrationDeadline: "22 Agustus 2025",
  },
  {
    id: "3",
    name: "E-Football",
    category: "Esport",
    date: "10 Juli 2025",
    status: "Finished",
    participants: 64,
    maxParticipants: 64,
    registrationDeadline: "5 Juli 2025",
  },
  {
    id: "4",
    name: "UI/UX Competition",
    category: "Design",
    date: "30 Agustus 2025",
    status: "Active",
    participants: 32,
    maxParticipants: 50,
    registrationDeadline: "25 Agustus 2025",
  },
  {
    id: "5",
    name: "Informatics Olympiad",
    category: "Programming",
    date: "30 Agustus 2025",
    status: "Active",
    participants: 32,
    maxParticipants: 50,
    registrationDeadline: "25 Agustus 2025",
  },
];

export default function AdminEvent() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const participantsRef = useRef<HTMLDivElement | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [eventRefresh, setEventRefresh] = useState(0);
  const [editingEvent, setEditingEvent] = useState<EventRow | null>(null);
  const [events, setEvents] = useState<EventRow[]>(DUMMY_EVENTS);
  const eventCards = [...new Set(events.map((event) => event.name))];
  const [viewedEvent, setViewedEvent] = useState<EventRow | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddEvent = (data: NewEventData) => {
    const newEvent: EventRow = {
      ...data,
      id: String(Date.now()),
    };

    setEvents((prev) => [newEvent, ...prev]);

    setEventRefresh((prev) => prev + 1);

    setSelectedEvent(null);
    setIsAdding(false);

    setToastMessage(`Event "${newEvent.name}" was successfully added.`);
    setShowToast(true);
  };

  const handleEditEvent = (data: EventFormData) => {
    if (!editingEvent) return;

    const editedName = editingEvent.name;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === editingEvent.id
          ? {
              ...event,
              ...data,
            }
          : event,
      ),
    );

    setEditingEvent(null);

    setToastMessage(`Event "${editedName}" was successfully updated.`);
    setShowToast(true);
  };

  const handleDeleteEvent = () => {
    if (!eventToDelete) return;

    const deletedName = eventToDelete.name;
    setIsDeleting(true);

    /* Simulate an API delete request, then remove from local state */
    window.setTimeout(() => {
      setEvents((prev) =>
        prev.filter((event) => event.id !== eventToDelete.id),
      );
      setIsDeleting(false);
      setEventToDelete(null);
      setToastMessage(`Event "${deletedName}" was successfully deleted.`);
      setShowToast(true);
    }, 900);
  };

  const filteredEvents =
    selectedEvent === null
      ? events
      : events.filter((event) => event.name === selectedEvent);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <div className="min-h-screen">
        <main className="mx-auto w-full max-w-275 px-4 pb-0 pt-0 sm:px-5 sm:pt-12">
          <section className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              Event
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Event Management
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Manage all events and view details for each event using the quick
              filters below.
            </p>

            {/* TOOLBAR */}
            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* EVENT FILTER */}
              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {eventCards.map((event) => {
                  const isActive = selectedEvent === event;

                  return (
                    <button
                      key={event}
                      type="button"
                      disabled={isAdding || editingEvent !== null}
                      onClick={() => {
                        if (isAdding || editingEvent) return;

                        if (isActive) {
                          setSelectedEvent(null);
                          return;
                        }

                        setSelectedEvent(event);

                        setTimeout(() => {
                          participantsRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }, 100);
                      }}
                      className={`rounded-2xl border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] bg-transparent px-4 py-4 text-left text-sm font-bold transition-all duration-200
                      ${
                        isAdding || editingEvent
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer hover:-translate-y-0.5"
                      }
                      ${
                        isActive
                          ? "border-emerald-400 bg-linear-to-r from-emerald-500/40 to-emerald-400/30 text-white ring-2 ring-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                          : "border-white/20 bg-black/20 text-white hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      {event}
                    </button>
                  );
                })}
              </div>

              {/* ADD EVENT BUTTON */}
              {!isAdding && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvent(null);
                    setIsAdding(true);
                  }}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-red-600 to-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)] cursor-pointer"
                >
                  <CalendarPlus className="h-5 w-5" />
                  Add Event
                </button>
              )}
            </div>

            {/* ACTIVE FILTER INFO */}
            {selectedEvent && (
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-emerald-300">
                  Showing event details:{" "}
                  <span className="font-black">{selectedEvent}</span>
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
                >
                  Show All Events
                </button>
              </div>
            )}

            {/* ADD EVENT FORM */}
            {isAdding && (
              <div className="relative mt-8">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  aria-label="Tutup form tambah event"
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <AddEvent
                  onSubmit={handleAddEvent}
                  onCancel={() => setIsAdding(false)}
                />
              </div>
            )}

            {/* EDIT EVENT FORM */}
            {editingEvent && (
              <div className="relative mt-8">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <EditEvent
                  mode="edit"
                  initialData={editingEvent}
                  onSubmit={handleEditEvent}
                  onCancel={() => setEditingEvent(null)}
                />
              </div>
            )}

            {!selectedEvent && !isAdding && !editingEvent && (
              <div className="mt-8">
                <EventsTable
                  key={eventRefresh}
                  events={filteredEvents}
                  pageSize={5}
                  onView={(event) => {
                    setViewedEvent(event);
                  }}
                  onEdit={(event) => {
                    setEditingEvent(event);
                  }}
                  onDelete={(event) => {
                    setEventToDelete(event);
                  }}
                />
              </div>
            )}

            {/* PARTICIPANTS TABLE */}
            {selectedEvent && !isAdding && !editingEvent && (
              <div ref={participantsRef} className="mt-8 scroll-mt-8">
                <ParticipantsTable
                  participants={allParticipants}
                  selectedEvent={selectedEvent}
                  onBack={() => {
                    setSelectedEvent(null);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  pageSize={10}
                />
              </div>
            )}
          </section>
        </main>
      </div>

      {/* EVENT DETAIL MODAL */}
      <EventDetailModal
        open={viewedEvent !== null}
        event={viewedEvent}
        onClose={() => setViewedEvent(null)}
      />

      {/* DELETE EVENT MODAL */}
      <DeleteModal
        open={eventToDelete !== null}
        itemName={eventToDelete?.name}
        itemLabel="event"
        onClose={() => setEventToDelete(null)}
        onConfirm={handleDeleteEvent}
        isDeleting={isDeleting}
      />

      {/* DELETE SUCCESS TOAST */}
      <Toast
        open={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
