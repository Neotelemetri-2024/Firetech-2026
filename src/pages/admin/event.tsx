import { useRef, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import EventsTable, { type EventRow } from "../../components/events/tableevent";
import ParticipantsTable, {
  type ParticipantRow,
} from "../../components/events/tableparticipant";
import EditEvent, { type EventFormData } from "../../components/form/editevent";
import EventDetailModal from "../../components/form/eventdetailmodal";
import DeleteModal from "../../components/form/delete";
import type { RegistrationVerificationAction } from "../../components/form/userdetailmodal";
import Toast from "../../components/ui/toast";
import {
  getCompetitions,
  updateCompetition,
} from "../../services/competition.services";
import {
  approveRegistration,
  getRegistrations,
  rejectRegistration,
  verifyPayment,
  type Registration,
} from "../../services/registration.services";
import type { EventStatus } from "../../components/events/tableevent";

export default function AdminEvent() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const participantsRef = useRef<HTMLDivElement | null>(null);
  const [isAdding] = useState(false);
  const [eventRefresh] = useState(0);
  const [editingEvent, setEditingEvent] = useState<EventRow | null>(null);
  const [events, setEvents] = useState<EventRow[]>([]);
  const eventCards = [...new Set(events.map((event) => event.name))];
  const [viewedEvent, setViewedEvent] = useState<EventRow | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [registrationToDelete, setRegistrationToDelete] =
    useState<Registration | null>(null);

  const fetchCompetitions = useCallback(async () => {
    try {
      const competitions = await getCompetitions();

      const statusMap: Record<string, EventStatus> = {
        upcoming: "Upcoming",
        open: "Active",
        closed: "Closed",
        ongoing: "Ongoing",
        finished: "Finished",
      };

      const mappedEvents: EventRow[] = competitions.map((competition) => ({
        id: String(competition.id),
        name: competition.name,
        category: competition.category,
        date: competition.eventDate.split("T")[0],

        registrationOpen: competition.registrationOpen?.split("T")[0] ?? "",

        registrationDeadline:
          competition.registrationClose?.split("T")[0] ?? "",

        status: statusMap[competition.status] ?? "Upcoming",

        participants: competition.slotsUsed ?? 0,
        maxParticipants: competition.participantQuota ?? 0,
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Failed fetch competitions:", error);
    }
  }, []);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getRegistrations();

        setRegistrations(data);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      }
    };

    fetchRegistrations();
  }, []);

  const handleEditEvent = async (data: EventFormData) => {
    if (!editingEvent) return;

    try {
      await updateCompetition(Number(editingEvent.id), {
        name: data.name,
        category: data.category,
        participantQuota: data.maxParticipants,

        registrationOpen: new Date(data.registrationOpen).toISOString(),

        eventDate: new Date(data.date).toISOString(),

        registrationClose: new Date(data.registrationDeadline).toISOString(),
      });

      await fetchCompetitions();

      setEditingEvent(null);

      setToastMessage(`Acara "${data.name}" berhasil diperbarui.`);

      setShowToast(true);
    } catch (error) {
      console.error("Failed update competition:", error);
    }
  };

  const filteredEvents =
    selectedEvent === null
      ? events
      : events.filter((event) => event.name === selectedEvent);

  const allParticipants: ParticipantRow[] = registrations.map(
    (registration) => {
      const leader = registration.members[0];
      return {
        id: String(registration.id),
        name: leader?.name ?? registration.user.name,
        email: registration.user.email,
        eventName:
          events.find(
            (event) => event.id === String(registration.competitionId),
          )?.name ?? "Unknown Event",

        registeredAt: registration.submittedAt,
        team: registration.teamName ?? undefined,
        registration,
        members: registration.members.map((member, index) => ({
          name: member.name,
          email: index === 0 ? registration.user.email : member.email,
          phone: member.phone,
          institution: member.institution,
        })),
      };
    },
  );

  const handleVerification = async (
    action: RegistrationVerificationAction,
    registrationId: number,
  ) => {
    if (action === "approve") {
      await approveRegistration(registrationId);
      await fetchCompetitions();
    } else if (action === "reject") {
      await rejectRegistration(registrationId);
    } else {
      await verifyPayment(registrationId, {
        action: action === "approve-payment" ? "approve" : "reject",
      });
    }

    const updateRegistration = (registration: Registration) => {
      if (registration.id !== registrationId) return registration;
      if (action === "approve" || action === "reject") {
        return {
          ...registration,
          status: action === "approve" ? "approved" : "rejected",
        };
      }
      return {
        ...registration,
        paymentStatus: action === "approve-payment" ? "paid" : "rejected",
      };
    };
    setRegistrations((current) => current.map(updateRegistration));
    setToastMessage("Status pendaftaran berhasil diperbarui.");
    setShowToast(true);
  };

  const handleDeleteRegistration = () => {
    if (!registrationToDelete) return;
    const deletedRegistrationId = registrationToDelete.id;
    setRegistrations((current) =>
      current.filter(
        (registration) => registration.id !== deletedRegistrationId,
      ),
    );
    setRegistrationToDelete(null);
    setToastMessage(
      "Pendaftaran dihapus dari tampilan. Perubahan ini belum tersimpan ke backend.",
    );
    setShowToast(true);
  };

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
              Kelola semua acara dan lihat detail setiap acara menggunakan
              filter cepat di bawah ini.
            </p>

            <Toast
              open={showToast}
              message={toastMessage}
              onClose={() => setShowToast(false)}
            />

            {/* TOOLBAR */}
            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* EVENT FILTER */}
              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  onVerificationAction={handleVerification}
                  onDelete={setRegistrationToDelete}
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
      <DeleteModal
        open={registrationToDelete !== null}
        onClose={() => setRegistrationToDelete(null)}
        onConfirm={handleDeleteRegistration}
        itemLabel={`pendaftaran ${registrationToDelete?.competition?.name ?? "event"}`}
        title="Hapus pendaftaran dari event?"
        description={`Pendaftaran ${registrationToDelete?.teamName || registrationToDelete?.user.name || "ini"} pada ${registrationToDelete?.competition?.name ?? "event"} akan dihapus dari tampilan Admin Event. Perubahan belum tersimpan ke backend.`}
      />
    </div>
  );
}
