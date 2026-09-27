import { ShieldCheck } from "lucide-react";

import Badge from "../ui/badge";
import Tooltip from "../ui/tooltip";

interface AdminFileButtonProps {
  count: number;
  darkMode: boolean;
  onClick: () => void;
}

export default function AdminFileButton({
  count,
  darkMode,
  onClick,
}: AdminFileButtonProps) {
  return (
    <Tooltip text="Admin Profil">
      <button
        onClick={onClick}
        className={`
          relative
          h-9 w-9
          sm:h-12 sm:w-12
          cursor-pointer
          rounded-full
          border-[1.5px]
          p-1.5
          transition-all
          duration-300
          hover:scale-110

          ${
            darkMode
              ? "bg-slate-100 text-slate-500 border-slate-300 hover:bg-white hover:text-red-600"
              : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
          }
        `}
        aria-label="Admin Panel"
      >
        <ShieldCheck
          className="
            h-full
            w-full
          "
        />

        <Badge
          count={count}
          className="
            absolute
            -right-1.5
            -top-1.5
            sm:-right-2
            sm:-top-2
          "
        />
      </button>
    </Tooltip>
  );
}
