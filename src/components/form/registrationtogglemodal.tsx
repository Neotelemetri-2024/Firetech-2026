import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Lock, LockOpen, TriangleAlert, X } from "lucide-react";
import type { EventRow } from "../events/tableevent";

type RegistrationToggleModalProps = {
  event: EventRow | null;
  onClose: () => void;
  onConfirm: () => void;
};

const modalGradient = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.35) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

export default function RegistrationToggleModal({
  event,
  onClose,
  onConfirm,
}: RegistrationToggleModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const isClosed = Boolean(event?.registrationClosedAt);

  useEffect(() => {
    if (!event) return;

    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();
    const handleKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-toggle-title"
      style={{ animation: "proof-fade-in 0.25s ease-out" }}
      onClick={onClose}
    >
      <section
        className="relative w-full max-w-md overflow-hidden rounded-[1.8rem] border border-white/35 text-white shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
        style={{
          ...modalGradient,
          animation: "proof-zoom-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <div className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-2 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative px-5 py-7 sm:px-7">
          <div className="flex justify-center sm:justify-start">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.28em] text-amber-200">
              <TriangleAlert className="h-3.5 w-3.5" />
              Konfirmasi
            </p>
          </div>

          <div className="mt-5 text-center">
            <div className="mx-auto mb-5 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-amber-400/40 bg-amber-500/15 text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              {isClosed ? <LockOpen className="h-8 w-8" /> : <Lock className="h-8 w-8" />}
            </div>
            <h2 id="registration-toggle-title" className="text-2xl font-black uppercase tracking-wide">
              {isClosed ? "Buka pendaftaran event?" : "Tutup pendaftaran event?"}
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/75">
              Event <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-black text-white">{event.name}</span>{" "}
              {isClosed ? "akan menerima pendaftaran kembali." : "tidak akan menerima pendaftaran baru."} Apakah Anda yakin ingin melanjutkan?
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            >
              Batal
            </button>
            <button
              ref={confirmRef}
              type="button"
              onClick={onConfirm}
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 ${isClosed ? "bg-linear-to-r from-emerald-600 to-emerald-500 shadow-emerald-900/35" : "bg-linear-to-r from-amber-600 to-amber-500 shadow-amber-900/35"}`}
            >
              {isClosed ? "Ya, Buka Pendaftaran" : "Ya, Tutup Pendaftaran"}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
