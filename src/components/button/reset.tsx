import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onClick: () => void;
  label?: string;
}

export default function ResetButton({
  onClick,
  label = "Reset Filter",
}: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex items-center gap-2
        rounded-2xl
        border border-red-400/30
        bg-red-500/10
        px-4 py-2
        text-sm font-bold text-red-300
        transition-all duration-200
        hover:-translate-y-0.5
        hover:bg-red-500/20
        hover:text-red-200
        hover:border-red-400/50
        cursor-pointer
      "
    >
      <RotateCcw className="h-4 w-4" />
      {label}
    </button>
  );
}
