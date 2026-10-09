export function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex flex-wrap gap-2 text-[1.04rem] leading-7 text-white/95 sm:text-[1.08rem]">
      <span className="min-w-19 font-semibold text-white/90">{label}</span>
      <span className="text-white">{value}</span>
    </p>
  );
}
