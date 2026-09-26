import type { MouseEventHandler } from "react";
import { LogIn, LogOut } from "lucide-react";

interface LoginButtonProps {
  isLoggedIn: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function LoginButton({ isLoggedIn, onClick }: LoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        hidden
        cursor-pointer
        items-center
        gap-2
        overflow-hidden
        rounded-full
        px-5
        py-2
        text-sm
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-105
        md:inline-flex
        ${
          isLoggedIn
            ? "bg-linear-to-r from-red-600 to-red-700"
            : "bg-linear-to-r from-red-600 to-blue-600"
        }
      `}
    >
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          skew-x-12
          bg-linear-to-r
          from-transparent
          via-white/25
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      <span
        className={`
          absolute
          -inset-0.5
          rounded-full
          opacity-0
          blur-md
          transition-opacity
          duration-500
          group-hover:opacity-60
          ${
            isLoggedIn
              ? "bg-red-600"
              : "bg-linear-to-r from-red-600 to-blue-600"
          }
        `}
      />

      {isLoggedIn ? (
        <LogOut
          className="
            relative
            z-10
            h-3.5
            w-3.5
            transition-transform
            duration-300
            group-hover:scale-110
            group-hover:-translate-y-0.5
          "
        />
      ) : (
        <LogIn
          className="
            relative
            z-10
            h-3.5
            w-3.5
            transition-transform
            duration-300
            group-hover:scale-110
            group-hover:-translate-y-0.5
          "
        />
      )}

      <span className="relative z-10">{isLoggedIn ? "Logout" : "Login"}</span>
    </button>
  );
}
