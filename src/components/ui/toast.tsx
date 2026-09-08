import { useEffect } from "react";
import { CheckCircle2, CircleX, X } from "lucide-react";
import { useTheme } from "../../context/themecontext";

/* ─────────── Types & Props ─────────── */

export type ToastType = "success" | "error";

export type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  /** Visual tone of the toast. Defaults to "success". */
  type?: ToastType;
  /** How long (ms) before the toast auto-dismisses. */
  duration?: number;
};

/* ─────────── Constants ─────────── */

const DEFAULT_DURATION = 3000;

/* ─────────── Main Component ─────────── */

export default function Toast({
  open,
  message,
  onClose,
  type = "success",
  duration = DEFAULT_DURATION,
}: ToastProps) {
  const { darkMode } = useTheme();

  /* Auto-dismiss after the given duration */
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const isSuccess = type === "success";

  const iconCircleClass = isSuccess
    ? darkMode
      ? "border-green-500/40 text-green-400 "
      : "border-green-300 backdrop-blur-md text-green-600"
    : darkMode
      ? "border-red-500/40 text-red-400 "
      : "border-red-300 backdrop-blur-md text-red-600";

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative w-full"
      style={{
        animation: "proof-slide-down 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className={`flex items-center gap-3 overflow-hidden rounded-2xl py-3 pl-4 pr-3 backdrop-blur-md transition-all duration-300 ${
          darkMode
            ? "border border-white/25  text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            : "border border-white/30 bg-white/5 backdrop-blur-md text-slate-900"
        }`}
      >
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${iconCircleClass}`}
          style={{
            animation:
              "proof-zoom-in 0.35s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <CircleX className="h-6 w-6" />
          )}
        </div>

        <div
          className="min-w-0 flex-1"
          style={{
            animation: "proof-slide-up 0.3s 0.12s ease-out both",
          }}
        >
          <p
            className={`text-sm font-black uppercase tracking-wide ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "Success" : "Error"}
          </p>

          <p
            className={`mt-0.5 truncate text-sm font-medium ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5 ${
            darkMode
              ? "border border-white/20 bg-gray-700 text-white/70 hover:bg-black hover:text-white"
              : "border border-slate-300/70 bg-white/20 backdrop-blur-md text-slate-600 hover:bg-white/40 hover:text-slate-900"
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
