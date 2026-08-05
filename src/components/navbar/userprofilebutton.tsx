import { UserRound } from "lucide-react";

import Badge from "../ui/badge";
import Tooltip from "../ui/tooltip";

interface UserProfileButtonProps {
  count: number;
  darkMode: boolean;
  onClick: () => void;
}

export default function UserProfileButton({
  count,
  darkMode,
  onClick,
}: UserProfileButtonProps) {
  return (
    <Tooltip text="My Profile">
      <button
        onClick={onClick}
        className={`
          relative 
          h-9 w-9
          sm:h-10 sm:w-10
          cursor-pointer 
          rounded-full 
          border-[1.5px]
          p-1.5
          transition-all 
          duration-300
          hover:scale-110

          ${
            darkMode
              ? "bg-slate-100 text-slate-500 border-slate-300 hover:bg-white hover:text-indigo-600"
              : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
          }
        `}
        aria-label="User account"
      >
        <UserRound
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
