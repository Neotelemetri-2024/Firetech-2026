import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  CalendarClock,
  CalendarDays,
  Tag,
  Type as TypeIcon,
  Users,
  X,
} from "lucide-react";
import type { EventRow, EventStatus } from "../events/tableevent";

/* ─────────── Types ─────────── */

export type EventDetailModalProps = {
  open: boolean;
  onClose: () => void;
  /** Event to display. When null, falls back to placeholder values. */
  event: EventRow | null;
};

/* ─────────── Helpers ─────────── */

function getStatusTone(status: EventStatus | null) {
  switch (status) {
    case "Active":
      return "bg-[#57d11f] text-white shadow-[0_0_12px_rgba(87,209,31,0.35)]";

    case "Upcoming":
      return "bg-[#f6bf14] text-[#231500] shadow-[0_0_12px_rgba(246,191,20,0.35)]";

    case "Finished":
      return "bg-[#ef4444] text-white shadow-[0_0_12px_rgba(239,68,68,0.35)]";

    default:
      return "bg-white/10 text-white/60";
  }
}

const gradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.55) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.55) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

/* ─────────── Readonly Field ─────────── */

type ReadonlyFieldProps = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  delay?: string;
};

function ReadonlyField({ label, icon, children, delay }: ReadonlyFieldProps) {
  return (
    <div
      className="space-y-2"
      style={{
        animation: `proof-slide-up 0.35s ${delay ?? "0.2s"} ease-out both`,
      }}
    >
      <label className="flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.22em] text-white/70">
        <span className="text-white/45">{icon}</span>
        {label}
      </label>
      <div className="flex min-h-12 w-full items-center rounded-2xl border border-white/25 bg-black/20 px-4 py-3 text-sm font-medium text-white/90">
        {children}
      </div>
    </div>
  );
}

/* ─────────── Main Component ─────────── */

export default function EventDetailModal({
  open,
  onClose,
  event,
}: EventDetailModalProps) {
  /* Lock page scroll while the modal is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const name = event?.name ?? "Nama Event";
  const category = event?.category ?? "-";
  const date = event?.date ?? "-";
  const registrationDeadline = event?.registrationDeadline ?? "-";
  const status = event?.status ?? null;
  const filled = event?.participants ?? 0;
  const max = event?.maxParticipants ?? 0;
  const fillPercent =
    max > 0 ? Math.min(Math.round((filled / max) * 100), 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-detail-title"
      style={{ animation: "proof-fade-in 0.25s ease-out" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-225 overflow-hidden rounded-[1.8rem] border border-white/35 shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
        style={{
          ...gradientStyle,
          animation: "proof-zoom-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-2 h-44 w-44 rounded-full bg-[#5b7cff]/20 blur-3xl" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20"
          style={{
            animation:
              "proof-zoom-in 0.35s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="px-5 py-5 sm:px-7 sm:py-7">
          {/* Header */}
          <div
            className="mb-6 border-b border-white/20 pb-4"
            style={{ animation: "proof-slide-down 0.3s 0.08s ease-out both" }}
          >
            <p className="mb-2 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-white/90">
              Detail
            </p>

            <div className="flex flex-wrap items-center gap-3 pr-12">
              <h2
                id="event-detail-title"
                className="text-2xl font-black uppercase tracking-wide sm:text-[2.1rem]"
              >
                Detail Event
              </h2>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${getStatusTone(status)}`}
              >
                {status ?? "Status"}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-5">
            {/* Name + Category */}
            <div className="grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
              <ReadonlyField
                label="Event Name"
                icon={<TypeIcon className="h-4 w-4" />}
                delay="0.12s"
              >
                <p className="truncate font-black tracking-tight text-white">
                  {name}
                </p>
              </ReadonlyField>

              <ReadonlyField
                label="Category"
                icon={<Tag className="h-4 w-4" />}
                delay="0.16s"
              >
                <span className="inline-flex items-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-3 py-1 text-xs font-bold text-white/85">
                  {category}
                </span>
              </ReadonlyField>
            </div>

            {/* Date + Deadline */}
            <div className="grid gap-5 sm:grid-cols-2">
              <ReadonlyField
                label="Event Date"
                icon={<CalendarDays className="h-4 w-4" />}
                delay="0.2s"
              >
                <p className="font-semibold text-white/90">{date}</p>
              </ReadonlyField>

              <ReadonlyField
                label="Registration Deadline"
                icon={<CalendarClock className="h-4 w-4" />}
                delay="0.24s"
              >
                <p className="font-semibold text-white/90">
                  {registrationDeadline}
                </p>
              </ReadonlyField>
            </div>

            {/* Participants */}
            <div
              className="space-y-2"
              style={{ animation: "proof-slide-up 0.35s 0.28s ease-out both" }}
            >
              <label className="flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.22em] text-white/70">
                <span className="text-white/45">
                  <Users className="h-4 w-4" />
                </span>
                Participants
              </label>

              <div className="w-full rounded-2xl border border-white/25 bg-black/20 px-4 py-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-white/60" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="font-bold text-white/90">
                        {filled}/{max}
                      </span>
                      <span className="text-white/50">{fillPercent}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
