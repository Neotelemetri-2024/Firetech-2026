type BadgeProps = {
  count: number;
  max?: number;
  showZero?: boolean;
  className?: string;
};

const DEFAULT_MAX = 99;

export default function Badge({
  count,
  max = DEFAULT_MAX,
  showZero = false,
  className = "",
}: BadgeProps) {
  if (count <= 0 && !showZero) return null;

  const displayCount = count > max ? `${max}+` : String(count);

  return (
    <span
      role="status"
      aria-label={`${displayCount} item`}
      className={`inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-full border border-red-300/60 bg-[linear-gradient(180deg,#ff5c5c_0%,#e11d48_100%)] px-1.5 text-[0.7rem] font-black leading-none text-white shadow-[0_2px_12px_rgba(255,77,77,0.55)] ring-1 ring-white/25 ${className}`}
    >
      {displayCount}
    </span>
  );
}
