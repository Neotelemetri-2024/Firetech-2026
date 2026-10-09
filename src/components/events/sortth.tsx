import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export type SortKey = "name" | "email" | "eventName" | "registeredAt" | "team";
export type SortDir = "asc" | "desc";

interface SortThProps {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey | null;
  direction: SortDir;
  onSort: (key: SortKey) => void;
}

export default function SortTh({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
}: SortThProps) {
  const isActive = currentKey === sortKey;

  return (
    <th
      className="group cursor-pointer select-none px-4 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        {isActive ? (
          direction === "asc" ? (
            <ChevronUp className="h-3.5 w-3.5 text-white" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-white" />
          )
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 text-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </span>
    </th>
  );
}
