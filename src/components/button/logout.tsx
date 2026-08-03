import { LogOut } from "lucide-react";

type LogoutButtonProps = {
  onClick: () => void;
  className?: string;
};

export default function LogoutButton({
  onClick,
  className = "",
}: LogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Logout"
      className={`
        group
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
        cursor-pointer
        ${className}
      `}
    >
      <LogOut
        size={22}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>
  );
}
