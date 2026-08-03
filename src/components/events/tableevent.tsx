import { useState, useMemo } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Eye,
  Pencil,
  Trash2,
  X,
  CalendarCheck,
  CalendarX,
  Timer,
  Users,
} from "lucide-react";
import Pagination from "../pagination";
import Filter from "../../components/filter/filter";
import Reset from "../../components/button/reset"

/* ─────────── Types ─────────── */

export type EventStatus = "Active" | "Finished" | "Upcoming";

export type EventRow = {
  id: string;
  name: string;
  category: string;
  date: string;
  status: EventStatus;
  participants: number;
  maxParticipants: number;
  registrationDeadline: string;
};

/* ─────────── Props ─────────── */

type EventsTableProps = {
  events: EventRow[];
  /** Called when the user clicks "Edit" */
  onEdit?: (event: EventRow) => void;
  /** Called when the user clicks "Delete" */
  onDelete?: (event: EventRow) => void;
  /** Called when the user clicks "View" */
  onView?: (event: EventRow) => void;
  pageSize?: number;
};

/* ─────────── Helpers ─────────── */

type SortKey = keyof Pick<
  EventRow,
  "name" | "category" | "date" | "status" | "participants"
>;
type SortDir = "asc" | "desc";

function getStatusIcon(status: EventStatus) {
  switch (status) {
    case "Active":
      return Timer;
    case "Finished":
      return CalendarCheck;
    case "Upcoming":
      return CalendarX;
  }
}

function getStatusTone(status: EventStatus) {
  switch (status) {
    case "Active":
      return "bg-[#57d11f] text-white shadow-[0_0_12px_rgba(87,209,31,0.35)]";

    case "Upcoming":
      return "bg-[#f6bf14] text-[#231500] shadow-[0_0_12px_rgba(246,191,20,0.35)]";

    case "Finished":
      return "bg-[#ef4444] text-white shadow-[0_0_12px_rgba(239,68,68,0.35)]";
  }
}

/* ─────────── Sortable Header ─────────── */
function SortTh({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey | null;
  direction: SortDir;
  onSort: (key: SortKey) => void;
}) {
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

/* ─────────── Main Component ─────────── */

export default function EventsTable({
  events,
  onEdit,
  onDelete,
  onView,
  pageSize = 5,
}: EventsTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  /* ── Sorting ── */
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  /* ── Filter + Search ── */
  const filtered = useMemo(() => {
    let list = [...events];

    // status filter
    if (statusFilter && statusFilter !== "Status") {
      list = list.filter((e) => e.status === statusFilter);
    }

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q),
      );
    }

    // sort
    if (sortKey) {
      list.sort((a, b) => {
        let cmp = 0;
        if (sortKey === "participants") {
          cmp = a.participants - b.participants;
        } else {
          cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return list;
  }, [events, search, sortKey, sortDir, statusFilter]);

  /* ── Pagination ── */
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  /* ── Render ── */
  return (
    <div className="space-y-4">
      {/* ---- Toolbar ---- */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Filter
            options={["Active", "Finished", "Upcoming"]}
            selected={statusFilter}
            placeholder="Status"
            onSelect={(value) => setStatusFilter(value)}
          />
          {(statusFilter) && (
            <Reset
              onClick={() => {
                setStatusFilter(null);
                setCurrentPage(1);
              }}
            />
          )}
        </div>

        {/* Search */}
        <label className="relative w-full lg:max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Find event..."
            className="w-full rounded-2xl border border-white/35 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-2.5 pr-24 text-sm font-medium text-white/95 outline-none transition hover:-translate-y-0.5 placeholder:text-white/45"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer text-white/80 transition-all hover:scale-110 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
        </label>
      </div>

      {/* ---- Table ---- */}
      {filtered.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/90">
                <thead>
                  <tr className="border-b border-white/15 bg-black/20">
                    <SortTh
                      label="Name"
                      sortKey="name"
                      currentKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                    />
                    <SortTh
                      label="Category"
                      sortKey="category"
                      currentKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                    />
                    <SortTh
                      label="Date"
                      sortKey="date"
                      currentKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                    />
                    <SortTh
                      label="Status"
                      sortKey="status"
                      currentKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                    />
                    <SortTh
                      label="Participants"
                      sortKey="participants"
                      currentKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                    />
                    <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-[0.2em] text-white/70">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {paginated.map((event) => {
                    const StatusIcon = getStatusIcon(event.status);
                    const filled = event.participants;
                    const max = event.maxParticipants;
                    const fillPercent = Math.min((filled / max) * 100, 100);

                    return (
                      <tr
                        key={event.id}
                        className="transition-colors hover:bg-white/5"
                      >
                        {/* Name */}
                        <td className="px-4 py-4">
                          <p className="font-black tracking-tight text-white">
                            {event.name}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-3 py-1 text-xs font-bold text-white/85">
                            {event.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 whitespace-nowrap font-semibold text-white/80">
                          {event.date}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${getStatusTone(event.status)}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {event.status}
                          </span>
                        </td>

                        {/* Participants */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 shrink-0 text-white/60" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-2 text-xs">
                                <span className="font-bold text-white/90">
                                  {filled}/{max}
                                </span>
                                <span className="text-white/50">
                                  {Math.round(fillPercent)}%
                                </span>
                              </div>
                              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                                  style={{ width: `${fillPercent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {onView && (
                              <button
                                type="button"
                                onClick={() => onView(event)}
                                aria-label={`View ${event.name}`}
                                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] text-white/75 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            )}
                            {onEdit && (
                              <button
                                type="button"
                                onClick={() => onEdit(event)}
                                aria-label={`Edit ${event.name}`}
                                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-blue-400/30 bg-[linear-gradient(180deg,rgba(59,130,246,0.2)_0%,rgba(59,130,246,0.1)_100%)] text-blue-300/90 transition hover:-translate-y-0.5 hover:border-blue-400/50 hover:text-blue-200"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                            )}
                            {onDelete && (
                              <button
                                type="button"
                                onClick={() => onDelete(event)}
                                aria-label={`Delete ${event.name}`}
                                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-red-400/30 bg-[linear-gradient(180deg,rgba(239,68,68,0.2)_0%,rgba(239,68,68,0.1)_100%)] text-red-300/90 transition hover:-translate-y-0.5 hover:border-red-400/50 hover:text-red-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        /* ---- Empty state ---- */
        <div className="flex min-h-60 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 text-center">
          <CalendarX className="mb-4 h-12 w-12 text-white/40" />
          <p className="max-w-md text-sm text-white/60">
            {search
              ? `No events found with the keyword "${search}".`
              : statusFilter && statusFilter !== "All Statuses"
                ? `No events with the status "${statusFilter}".`
                : "No events available."}
          </p>
        </div>
      )}
    </div>
  );
}
