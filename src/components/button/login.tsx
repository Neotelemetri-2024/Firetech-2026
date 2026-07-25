import type { MouseEventHandler } from "react";
import { LogIn } from "lucide-react";

interface LoginButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative cursor-pointer hidden md:inline-flex items-center gap-2 ml-1 overflow-hidden rounded-full bg-linear-to-r from-red-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
    >
      {/* Shimmer overlay */}
      <span className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Glow ring */}
      <span className="absolute -inset-0.5 rounded-full bg-linear-to-r from-red-600 to-blue-600 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60" />

      {/* Icon */}
      <LogIn className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />

      {/* Label */}
      <span className="relative z-10">Login</span>
    </button>
  );
}
