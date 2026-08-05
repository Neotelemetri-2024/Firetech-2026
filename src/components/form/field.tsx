import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

type FieldProps = {
  label: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
};

export default function Field({ label, icon, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.22em] text-white/70">
        <span className="text-white/45">{icon}</span>

        {label}
      </label>

      {children}

      {error && (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />

          {error}
        </p>
      )}
    </div>
  );
}
