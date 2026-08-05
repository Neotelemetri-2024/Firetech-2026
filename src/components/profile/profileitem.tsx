import type { ReactNode } from "react";
import { CircleCheckBig, CircleDashed, CircleX } from "lucide-react";

import { useTheme } from "../../context/themecontext";

interface ProfileItemProps {
  icon: ReactNode;
  title: string;
  value: string;
  statusColor?: "success" | "warning" | "danger";
}

export default function ProfileItem({
  icon,
  title,
  value,
  statusColor,
}: ProfileItemProps) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 sm:gap-4 sm:p-4 transition-all duration-300 ${
        darkMode
          ? "border-slate-200 bg-slate-100 hover:bg-slate-200"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      <div className={`${darkMode ? "text-blue-600" : "text-red-500"}`}>
        {icon}
      </div>

      <div className="flex-1">
        <p className={`text-xs ${darkMode ? "text-black" : "text-white"}`}>
          {title}
        </p>

        {statusColor ? (
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              statusColor === "success"
                ? "bg-green-500/15 text-green-400"
                : statusColor === "warning"
                  ? "bg-yellow-500/15 text-yellow-400"
                  : "bg-red-500/15 text-red-400"
            }`}
          >
            {statusColor === "success" ? (
              <CircleCheckBig size={16} />
            ) : statusColor === "warning" ? (
              <CircleDashed size={16} />
            ) : (
              <CircleX size={16} />
            )}

            {value}
          </div>
        ) : (
          <p
            className={`font-semibold ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
