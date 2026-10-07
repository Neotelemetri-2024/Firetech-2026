import { Fragment, useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Mail,
  UserRound,
  X,
  Users,
  ArrowLeft,
  ChevronRight,
  Eye,
  // Trash2,
} from "lucide-react";
import type { Registration } from "../../services/registration.services";
import Pagination from "../pagination";
import UserDetailModal, {
  type RegistrationVerificationAction,
} from "../form/userdetailmodal";

/* ─────────── Types ─────────── */

export type ParticipantRow = {
  id: string;
  name: string;
  email: string;
  eventName: string;
  registeredAt: string;
  team?: string;
  members?: {
    name: string;
    email?: string;
    phone?: string;
    institution?: string;
  }[];
  registration?: Registration;
};

/* ─────────── Props ─────────── */

type ParticipantsTableProps = {
  /** Full list of participants across all events (will be filtered by selectedEvent) */
  participants: ParticipantRow[];
  /** Currently selected event name — only participants for this event are shown */
  selectedEvent: string | null;
  /** Called when the user clicks "Back" to deselect the event */
  onBack?: () => void;
  pageSize?: number;
  onVerificationAction?: (
    action: RegistrationVerificationAction,
    registrationId: number,
    reason?: string,
  ) => Promise<void>;
  onDelete?: (registration: Registration) => void;
};

/* ─────────── Helpers ─────────── */

type SortKey = keyof Pick<
  ParticipantRow,
  "name" | "email" | "eventName" | "registeredAt" | "team"
>;
type SortDir = "asc" | "desc";

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

export default function ParticipantsTable({
  participants,
  selectedEvent,
  onBack,
  pageSize = 10,
  onVerificationAction,
  onDelete,
}: ParticipantsTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  const [registrationDetail, setRegistrationDetail] =
    useState<Registration | null>(null);
  const showTeamColumn =
    selectedEvent === "Hackathon" ||
    selectedEvent === "UI/UX Competition" ||
    selectedEvent === null;

  /* ── Filter participants by selected event ── */
  const filtered = useMemo(() => {
    let list = [...participants];

    // event filter
    if (selectedEvent) {
      list = list.filter((p) => p.eventName === selectedEvent);
    }

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          (p.team && p.team.toLowerCase().includes(q)) ||
          p.members?.some((member) =>
            [member.name, member.email, member.phone, member.institution].some(
              (value) => value?.toLowerCase().includes(q),
            ),
          ),
      );
    }

    // sort
    if (sortKey) {
      list.sort((a, b) => {
        const aVal = String(a[sortKey] ?? "");
        const bVal = String(b[sortKey] ?? "");
        const cmp = aVal.localeCompare(bVal);
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return list;
  }, [participants, selectedEvent, search, sortKey, sortDir]);

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

  const modalProofFiles = useMemo(() => {
    if (!registrationDetail) return [];
    const allFiles = [
      ...(registrationDetail.files ?? []),
      ...registrationDetail.members.flatMap((member) => member.files ?? []),
    ];
    return [
      ...new Map(allFiles.map((file) => [file.id, file])).values(),
    ].filter(
      (file) =>
        /identity|identit|ktm|student.?card/i.test(file.kind) ||
        (registrationDetail.competition?.name !== "Hackathon" &&
          file.kind === "payment_proof"),
    );
  }, [registrationDetail]);

  /* ── Pagination ── */
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  /* ── Render ── */
  return (
    <div className="space-y-4">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {onBack && selectedEvent && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to all events"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] text-white/75 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}

          <div>
            {selectedEvent ? (
              <>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/50">
                  Partisipan
                </p>
                <h2 className="text-xl font-black tracking-tight text-white">
                  {selectedEvent}
                </h2>
              </>
            ) : (
              <>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/50">
                  Semua Partisipan
                </p>
                <h2 className="text-xl font-black tracking-tight text-white">
                  {participants.length} Partisipan
                </h2>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---- Toolbar ---- */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          {/* Info chip: total participants count */}
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-4 py-2.5">
            <Users className="h-4 w-4 text-white/70" />
            <span className="text-sm font-black text-white/85">
              {filtered.length}
            </span>
            <span className="text-xs font-semibold text-white/50">
              {filtered.length === 1 ? "Participant" : "Participants"}
            </span>
          </div>
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
            placeholder="Cari Partisipan..."
            className="w-full rounded-2xl border border-white/35 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-2.5 pr-24 text-sm font-medium text-white/95 outline-none transition hover:-translate-y-0.5 placeholder:text-white/45"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Hapus pencarian"
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
                    <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-white/70 w-12">
                      No
                    </th>
                    <SortTh
                      label="Name"
                      sortKey="name"
                      currentKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                    />
                    <SortTh
                      label="Email"
                      sortKey="email"
                      currentKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                    />

                    {showTeamColumn && (
                      <SortTh
                        label="Team"
                        sortKey="team"
                        currentKey={sortKey}
                        direction={sortDir}
                        onSort={handleSort}
                      />
                    )}
                    {(onVerificationAction || onDelete) && (
                      <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-[0.2em] text-white/70">
                        Aksi
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {paginated.map((participant, index) => {
                    const isEFootball = /e[\s-]?football/i.test(
                      participant.eventName,
                    );

                    return (
                      <Fragment key={participant.id}>
                        <tr className="transition-colors hover:bg-white/5">
                        {/* Number */}
                        <td className="px-4 py-4 text-center">
                          <span className="text-xs font-bold text-white/50">
                            {(currentPage - 1) * pageSize + index + 1}
                          </span>
                        </td>

                        {/* Name */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)]">
                              <UserRound className="h-4 w-4 text-white/70" />
                            </div>
                            <p className="font-black tracking-tight text-white">
                              {participant.name}
                            </p>
                            {!isEFootball &&
                              participant.members &&
                              participant.members.length > 0 && (
                                <button
                                  type="button"
                                  aria-expanded={
                                    expandedTeamId === participant.id
                                  }
                                  onClick={() =>
                                    setExpandedTeamId((current) =>
                                      current === participant.id
                                        ? null
                                        : participant.id,
                                    )
                                  }
                                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 transition hover:text-white"
                                >
                                  <ChevronRight
                                    className={`h-3.5 w-3.5 transition-transform ${expandedTeamId === participant.id ? "rotate-90" : ""}`}
                                  />
                                  Detail anggota  (
                                  {participant.members.length})
                                </button>
                              )}
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 shrink-0 text-white/50" />
                            <span className="font-semibold text-white/75">
                              {participant.email}
                            </span>
                          </div>
                        </td>

                        {/* Team */}
                        {showTeamColumn && (
                          <td className="px-4 py-4">
                            {participant.team ? (
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold text-white/80">
                                  {participant.team}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs italic text-white/40">
                                —
                              </span>
                            )}
                          </td>
                        )}
                        {(onVerificationAction || onDelete) && (
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              {onVerificationAction &&
                                participant.registration && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setRegistrationDetail(
                                        participant.registration!,
                                      )
                                    }
                                    aria-label={`Lihat detail ${participant.team || participant.name}`}
                                    title="Lihat detail"
                                    className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-100 transition hover:bg-cyan-400/20"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                )}
                              {/* {onDelete && participant.registration && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    onDelete(participant.registration!)
                                  }
                                  aria-label={`Hapus pendaftaran ${participant.team || participant.name}`}
                                  className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )} */}
                            </div>
                          </td>
                        )}
                      </tr>
                      {!isEFootball &&
                        expandedTeamId === participant.id &&
                        participant.members && (
                          <tr
                            key={`${participant.id}-members`}
                            className="bg-black/15"
                          >
                            <td
                              colSpan={
                                (showTeamColumn ? 4 : 3) +
                                (onVerificationAction || onDelete ? 1 : 0)
                              }
                              className="px-6 py-4"
                            >
                              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {participant.members.map(
                                  (member, memberIndex) => (
                                    <div
                                      key={`${participant.id}-member-${memberIndex}`}
                                      className="rounded-xl border border-white/15 bg-white/5 p-3"
                                    >
                                      <p className="font-bold text-white">
                                        {member.name}
                                        {memberIndex === 0 ? (
                                          <span className="ml-2 text-xs font-semibold text-blue-200">
                                            Ketua
                                          </span>
                                        ) : null}
                                      </p>
                                      {member.email && (
                                        <p className="mt-1 break-all text-xs text-white/65">
                                          {member.email}
                                        </p>
                                      )}
                                      {member.phone && (
                                        <p className="mt-1 text-xs text-white/65">
                                          {member.phone}
                                        </p>
                                      )}
                                      {member.institution && (
                                        <p className="mt-1 text-xs text-white/65">
                                          {member.institution}
                                        </p>
                                      )}
                                    </div>
                                  ),
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
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
          <Users className="mb-4 h-12 w-12 text-white/40" />
          <p className="max-w-md text-sm text-white/60">
            {selectedEvent
              ? search
                ? `Tidak ada peserta "${search}" yang ditemukan untuk acara ${selectedEvent}.`
                : `Tidak ada peserta yang terdaftar untuk event "${selectedEvent}".`
              : search
                ? `Tidak ada peserta yang cocok dengan kata kunci "${search}".`
                : "Belum ada peserta yang mendaftar."}
          </p>
        </div>
      )}
      <UserDetailModal
        key={registrationDetail?.id ?? "closed"}
        open={registrationDetail !== null}
        onClose={() => setRegistrationDetail(null)}
        userId={registrationDetail?.userId}
        name={registrationDetail?.user.name ?? ""}
        email={registrationDetail?.user.email ?? ""}
        phone={
          registrationDetail?.user.phone ||
          registrationDetail?.user.whatsapp ||
          registrationDetail?.user.phoneNumber ||
          registrationDetail?.user.whatsappNumber ||
          registrationDetail?.user.phone_number ||
          registrationDetail?.user.whatsapp_number ||
          registrationDetail?.user.profile?.phone ||
          registrationDetail?.user.profile?.whatsapp ||
          registrationDetail?.user.profile?.phoneNumber ||
          registrationDetail?.user.profile?.whatsappNumber ||
          registrationDetail?.user.profile?.phone_number ||
          registrationDetail?.user.profile?.whatsapp_number ||
          registrationDetail?.members[0]?.phone ||
          ""
        }
        school={registrationDetail?.institution ?? ""}
        registrationId={registrationDetail?.id}
        proofFiles={modalProofFiles}
        competitions={
          registrationDetail
            ? [
                {
                  registrationId: registrationDetail.id,
                  title: registrationDetail.competition?.name ?? "Event",
                  team: registrationDetail.teamName ?? "-",
                  role: /hackathon|ui\s*\/?\s*ux/i.test(
                    registrationDetail.competition?.name ?? "",
                  )
                    ? "Ketua"
                    : "",
                  payment:
                    registrationDetail.paymentStatus === "paid"
                      ? "Paid"
                      : registrationDetail.paymentStatus === "rejected"
                        ? "Declined"
                        : "Pending",
                  submission:
                    registrationDetail.ktmStatus === "approved"
                      ? "Submitted"
                      : registrationDetail.ktmStatus === "rejected"
                        ? "Rejected"
                        : "Pending",
                  members: registrationDetail.members.map((member) => ({
                    name: member.name,
                    email: member.email,
                    phone: member.phone,
                    institution: member.institution,
                  })),
                },
              ]
            : []
        }
        verification={
          registrationDetail && onVerificationAction
            ? {
              registrationStatus: registrationDetail.ktmStatus,
              paymentStatus: registrationDetail.paymentStatus,
              requiresKtm: (() => {
                const competitionName =
                  registrationDetail.competition?.name ?? selectedEvent ?? "";
                if (/ui\s*\/?\s*ux|hackathon/i.test(competitionName)) return true;
                if (/e[-\s]?football/i.test(competitionName)) return false;
                return (
                  registrationDetail.competition?.requiresKtm ??
                  true
                );
              })(),
              requiresPayment: (() => {
                const competitionName =
                  registrationDetail.competition?.name ?? selectedEvent ?? "";
                if (/ui\s*\/?\s*ux|e[-\s]?football/i.test(competitionName)) return true;
                if (/hackathon/i.test(competitionName)) return false;
                return (
                  registrationDetail.competition?.requiresPayment ??
                  true
                );
              })(),
                onAction: (action, reason) =>
                  onVerificationAction(action, registrationDetail.id, reason),
              }
            : undefined
        }
      />
    </div>
  );
}
