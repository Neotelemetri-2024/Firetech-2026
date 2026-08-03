import { useEffect, useRef } from "react";
import { Loader2, Trash2, TriangleAlert, X } from "lucide-react";

/* ─────────── Types & Props ─────────── */

export type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** Name of the item being deleted — highlighted in the warning message. */
  itemName?: string;
  /** Singular noun describing the item, e.g. "event" or "user". */
  itemLabel?: string;
  /** Overrides the default title. */
  title?: string;
  /** Overrides the default description (used when itemName is not provided). */
  description?: string;
  /** Label for the destructive button. Defaults to "Delete". */
  confirmLabel?: string;
  /** Locks the actions and shows a spinner while a delete request is running. */
  isDeleting?: boolean;
};

/* ─────────── Constants ─────────── */

const DEFAULT_TITLE = "Delete Confirmation";

const DEFAULT_DESCRIPTION =
  "Are you sure you want to delete this item? This action cannot be undone.";

const dangerGradient = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.55) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

/* ─────────── Main Component ─────────── */

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  itemName,
  itemLabel,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  confirmLabel = "Delete",
  isDeleting = false,
}: DeleteModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  /* Lock page scroll, focus the confirm button & close on Escape */
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isDeleting, onClose]);

  if (!open) return null;

  const noun = itemLabel ?? "item";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      style={{ animation: "proof-fade-in 0.25s ease-out" }}
      onClick={() => !isDeleting && onClose()}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[1.8rem] border border-white/35 text-white shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
        style={{
          ...dangerGradient,
          animation: "proof-zoom-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-red-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-2 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            animation:
              "proof-zoom-in 0.35s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-5 py-7 sm:px-7">
          {/* Danger badge */}
          <div
            className="flex justify-center sm:justify-start"
            style={{
              animation: "proof-slide-down 0.3s 0.08s ease-out both",
            }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.28em] text-red-300">
              <TriangleAlert className="h-3.5 w-3.5" />
              Warning
            </p>
          </div>

          {/* Body */}
          <div className="mt-5 text-center">
            <div
              className="mx-auto mb-5 grid h-18 w-18 place-items-center rounded-full border border-red-400/40 bg-red-500/15 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
              style={{
                animation:
                  "proof-zoom-in 0.35s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            >
              <Trash2 className="h-8 w-8" />
            </div>

            <h2
              id="delete-modal-title"
              className="text-2xl font-black uppercase tracking-wide"
              style={{
                animation: "proof-slide-up 0.35s 0.2s ease-out both",
              }}
            >
              {title}
            </h2>

            <p
              className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/75"
              style={{
                animation: "proof-slide-up 0.35s 0.25s ease-out both",
              }}
            >
              {itemName ? (
                <>
                  Are you sure you want to delete{" "}
                  <span className="rounded-md bg-red-500/15 px-1.5 py-0.5 font-black text-red-300">
                    {itemName}
                  </span>
                  ?<br />
                  This action cannot be undone.
                </>
              ) : (
                description
              )}
            </p>
          </div>

          {/* Actions */}
          <div
            className="mt-7 grid grid-cols-2 gap-3"
            style={{
              animation: "proof-slide-up 0.35s 0.3s ease-out both",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              ref={confirmRef}
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-2xl bg-linear-to-r from-red-600 to-red-500 px-4 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(220,38,38,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(220,38,38,0.45)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting {noun}...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  {confirmLabel}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
