import {
  BadgeCheck,
  Mail,
  Search,
  Users,
  Eye,
  CalendarDays,
  X,
  Trash2,
  CreditCard,
  FileCheck,
  CheckCircle,
} from "lucide-react";

import type { ReactNode } from "react";

import { useState, useEffect } from "react";

import UserDetail from "../../components/form/userdetailmodal";
import DeleteModal from "../../components/form/delete";
import Toast from "../../components/ui/toast";
import Pagination from "../../components/pagination";
import Filter from "../../components/filter/filter";
import Reset from "../../components/button/reset";

import type {
  UserItem,
  PaymentStatus,
  SubmissionStatus,
} from "../../types/user";

import { getStatusColor } from "../../utils/status";
import { getRegistrations } from "../../services/registration.services";
import type { Registration } from "../../services/registration.services";
import { getUsers } from "../../services/user.services";
import { EVENTS } from "../../constants/event";

/** Nama lomba sudah ikut di tiap pendaftaran dari backend, tidak perlu request terpisah. */
const getCompetitionName = (registration: Registration) =>
  registration.competition?.name ?? "Competition";

function UserTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-3 py-1.5 text-sm font-bold text-white/85 transition hover:-translate-y-0.5 cursor-pointer">
      {children}
    </span>
  );
}

function InfoChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-3 cursor-pointer transition hover:-translate-y-0.5">
      <div className="flex h-14 w-14 items-center justify-center bg-transparent text-white">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/95">
          {label}
        </p>
        <p className="text-xl font-black text-white/95">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({
  icon: Icon,
  label,
  status,
}: {
  icon: typeof CreditCard;
  label: string;
  status: PaymentStatus | SubmissionStatus;
}) {
  const tone = getStatusColor(status);

  const colorMap = {
    success: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",

    warning: "border-amber-400/30 bg-amber-500/15 text-amber-300",

    danger: "border-red-400/30 bg-red-500/15 text-red-300",
  };

  const color = colorMap[tone];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/55">
        <Icon className="h-3.5 w-3.5" />

        <span>{label}</span>
      </div>

      <span
        className={`rounded-full border px-3 py-1 text-xs font-bold ${color}`}
      >
        {status}
      </span>
    </div>
  );
}

function UserCard({
  user,
  onView,
  onDelete,
}: {
  user: UserItem;
  onView: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] p-4 sm:p-5 transition cursor-pointer hover:-translate-y-0.5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black leading-tight text-white truncate">
              {user.name}
            </h3>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-black">
            <Mail className="h-4 w-4 shrink-0" />

            <p className="break-all underline decoration-2 underline-offset-4">
              {user.email}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <StatusBadge
              icon={CreditCard}
              label="Pembayaran"
              status={user.paymentStatus}
            />

            <StatusBadge
              icon={FileCheck}
              label="Pengumpulan"
              status={user.submissionStatus}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          {/* EVENT TAG */}
          <div className="flex flex-wrap gap-2">
            {user.eventTags.map((tag) => (
              <UserTag key={tag}>{tag}</UserTag>
            ))}
          </div>

          {/* ACTION BUTTON */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onView}
              aria-label={`View ${user.name}'s details`}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-4xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] text-white/85 transition hover:-translate-y-0.5 hover:text-white"
            >
              <Eye className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onDelete}
              aria-label={`Hapus ${user.name}`}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-4xl border border-red-400/30 bg-[linear-gradient(180deg,rgba(239,68,68,0.2)_0%,rgba(239,68,68,0.1)_100%)] text-red-300/90 transition hover:-translate-y-0.5 hover:border-red-400/50 hover:text-red-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-2">
      <p className="inline-flex bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-white/60">
        User
      </p>

      <h1 className="px-3 text-3xl font-black tracking-tight text-white/95 sm:text-4xl">
        {title}
      </h1>

      <p className="max-w-2xl px-3 text-sm leading-6 text-white/85 sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

const PAGE_SIZE = 5;

export default function AdminUser() {
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userList, setUserList] = useState<UserItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [eventFilter, setEventFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<string | null>(null);

  const teamOptions =
    eventFilter === "Hackathon"
      ? Array.from(
          new Set(
            userList.flatMap((user) =>
              user.competitions
                .filter((c) => c.title === eventFilter)
                .map((c) => c.team),
            ),
          ),
        )
          .filter((team) => team && team !== "-")
          .sort((a, b) => a.localeCompare(b))
      : [];

  const stats = [
    {
      label: "Total User",
      value: userList.length.toString(),
      icon: Users,
    },

    {
      label: "Verification",
      value: userList.length.toString(),
      icon: BadgeCheck,
    },

    {
      label: "Event",
      value: EVENTS.length.toString(),
      icon: CalendarDays,
    },

    {
      label: "Paid",
      value: userList
        .filter((user) => user.paymentStatus === "Paid")
        .length.toString(),
      icon: CheckCircle,
    },

    {
      label: "Submitted",
      value: userList
        .filter((user) => user.submissionStatus === "Submitted")
        .length.toString(),
      icon: FileCheck,
    },
  ];

  const handleDeleteUser = () => {
    if (!userToDelete) return;

    const deletedName = userToDelete.name;
    setIsDeleting(true);

    /* Simulate an API delete request, then remove from local state */
    window.setTimeout(() => {
      setUserList((prev) =>
        prev.filter(
          (user) =>
            !(
              user.name === userToDelete.name &&
              user.email === userToDelete.email
            ),
        ),
      );
      setIsDeleting(false);
      setUserToDelete(null);
      setToastMessage(`User "${deletedName}" dihapus dari tampilan. Perubahan ini belum tersimpan ke backend.`);
      setShowToast(true);
    }, 900);
  };

  const filteredUsers = userList.filter((user) => {
    const matchesEvent = !eventFilter || user.eventTags.includes(eventFilter);

    const matchesPayment =
      !paymentFilter || user.paymentStatus === paymentFilter;

    const matchesSubmission =
      !submissionFilter || user.submissionStatus === submissionFilter;

    const matchesTeam =
      !teamFilter ||
      user.competitions.some((competition) => competition.team === teamFilter);

    const matchesSearch =
      !search ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    return (
      matchesEvent &&
      matchesPayment &&
      matchesSubmission &&
      matchesTeam &&
      matchesSearch
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Nilai paymentStatus dari backend: unpaid | waiting_verification | paid | rejected.
  const mapPaymentStatus = (status: string): PaymentStatus => {
    switch (status) {
      case "paid":
        return "Paid";

      case "rejected":
        return "Declined";

      default:
        return "Pending";
    }
  };

  const mapSubmissionStatus = (status: string): SubmissionStatus => {
    switch (status) {
      case "approved":
        return "Submitted";

      case "rejected":
        return "Rejected";

      default:
        return "Pending";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [users, registrations] = await Promise.all([
          getUsers(),
          getRegistrations(),
        ]);

        const mergedUsers: UserItem[] = users.map((user) => {
          const userRegistrations = registrations.filter(
            (registration) =>
              registration.user?.id === user.id ||
              registration.user?.email === user.email,
          );

          const payments = userRegistrations.map((registration) =>
            mapPaymentStatus(registration.paymentStatus),
          );

          return {
            id: user.id,

            name: user.name,

            email: user.email,

            phone: userRegistrations[0]?.members?.[0]?.phone ?? "-",

            school: userRegistrations[0]?.institution ?? "-",

            eventTags: userRegistrations.map(getCompetitionName),

            paymentStatus: payments.includes("Paid")
              ? "Paid"
              : payments.includes("Declined")
                ? "Declined"
                : "Pending",

            submissionStatus: userRegistrations.some(
              (r) => r.ktmStatus === "approved",
            )
              ? "Submitted"
              : userRegistrations.some((r) => r.ktmStatus === "rejected")
                ? "Rejected"
                : "Pending",

            competitions:
              userRegistrations.length > 0
                ? userRegistrations.map((registration) => {
                    const competitionName = getCompetitionName(registration);

                    const paymentProofFile =
                      registration.files?.find(
                        (file) => file.kind === "payment_proof",
                      ) ??
                      registration.members
                        ?.flatMap((member) => member.files ?? [])
                        .find((file) => file.kind === "payment_proof");

                    return {
                      registrationId: registration.id,

                      title: competitionName,

                      team: registration.teamName ?? "-",

                      role: competitionName === "Hackathon" ? "Ketua" : "",

                      payment: mapPaymentStatus(registration.paymentStatus),

                      submission: mapSubmissionStatus(registration.ktmStatus),

                      // Isinya diambil modal lewat endpoint berkas (butuh token),
                      // jadi yang disimpan di sini hanya rujukannya.
                      paymentProofFile: paymentProofFile
                        ? {
                            id: paymentProofFile.id,
                            mimeType: paymentProofFile.mimeType,
                            originalName: paymentProofFile.originalName,
                          }
                        : undefined,

                      //submissionLink,

                      members:
                        registration.members?.map((member) => ({
                          name: member.name,
                          email: member.email,
                          phone: member.phone,
                          institution: member.institution,
                        })) ?? [],
                    };
                  })
                : [
                    {
                      title: "Belum Ada Event",
                      team: "-",
                      role: "-",
                      payment: "Pending",
                      submission: "Pending",
                    },
                  ],
          };
        });

        setUserList(mergedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <div className="min-h-screen">
        <main className="mx-auto w-full max-w-290 px-4 pb-0 pt-0 sm:px-6 sm:pt-6 lg:px-12">
          <section className="min-h-screen rounded-4xl border border-white/15 bg-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex min-h-187.5 flex-col gap-5">
              <SectionTitle
                title="Managemen User"
                subtitle="Tinjau peserta yang terdaftar, filter status mereka, dan pindai partisipasi acara."
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {stats.map((stat) => (
                  <InfoChip
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3 lg:flex-row  lg:items-end lg:justify-between">
                <div className="flex flex-wrap items-center gap-3 ">
                  <Filter
                    options={EVENTS}
                    selected={eventFilter}
                    placeholder="Event"
                    onSelect={(value) => setEventFilter(value)}
                  />
                  <Filter
                    options={["Paid", "Declined", "Pending"]}
                    selected={paymentFilter}
                    placeholder="Pembayaran"
                    onSelect={(value) => setPaymentFilter(value)}
                  />

                  <Filter
                    options={["Submitted", "Rejected", "Pending"]}
                    selected={submissionFilter}
                    placeholder="Pengumpulan"
                    onSelect={(value) => setSubmissionFilter(value)}
                  />

                  {eventFilter === "Hackathon" && (
                    <Filter
                      options={teamOptions}
                      selected={teamFilter}
                      placeholder="Tim"
                      onSelect={(value) => {
                        setTeamFilter(value);
                        setCurrentPage(1);
                      }}
                    />
                  )}
                  {(eventFilter ||
                    paymentFilter ||
                    submissionFilter ||
                    teamFilter) && (
                    <Reset
                      onClick={() => {
                        setEventFilter(null);
                        setPaymentFilter(null);
                        setSubmissionFilter(null);
                        setTeamFilter(null);
                        setCurrentPage(1);
                      }}
                    />
                  )}
                </div>

                <label className="relative w-full lg:max-w-sm">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Cari berdasarkan nama atau email"
                    className="w-full rounded-2xl border border-white/35 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-3 pr-24 text-sm font-medium text-white/95 outline-none transition hover:-translate-y-0.5 placeholder:text-white/45"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setCurrentPage(1);
                      }}
                      aria-label="Hapus pencarian"
                      className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer text-white/80 transition-all hover:scale-110 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
                </label>
              </div>

              <div className="flex-1">
                {loading ? (
                  <div className="flex min-h-80 flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />

                    <p className="mt-4 text-sm text-white/60">
                      Memuat data peserta...
                    </p>
                  </div>
                ) : filteredUsers.length > 0 ? (
                  <div className="grid gap-4">
                    {paginatedUsers.map((user, index) => (
                      <UserCard
                        key={`${user.email}-${index}`}
                        user={user}
                        onView={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                        onDelete={() => {
                          setUserToDelete(user);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-80 flex-col items-center justify-center text-center">
                    <Users className="mb-4 h-12 w-12 text-white/40" />

                    <p className="mt-2 max-w-md text-sm text-white/60">
                      {search
                        ? `Tidak ada peserta yang ditemukan dengan kata kunci "${search}".`
                        : "Tidak ada peserta yang sesuai dengan filter yang dipilih."}
                    </p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>

            <UserDetail
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              name={selectedUser?.name ?? ""}
              email={selectedUser?.email ?? ""}
              phone={selectedUser?.phone ?? ""}
              school={selectedUser?.school ?? ""}
              competitions={selectedUser?.competitions ?? []}
            />



            {/* DELETE USER MODAL */}
            <DeleteModal
              open={userToDelete !== null}
              description={`User ${userToDelete?.name ?? "ini"} akan dihapus dari sistem. Apakah anda yakin ingin melanjutkan?`}
              itemLabel="user"
              onClose={() => setUserToDelete(null)}
              onConfirm={handleDeleteUser}
              isDeleting={isDeleting}
            />

            {/* DELETE SUCCESS TOAST */}
            <Toast
              open={showToast}
              message={toastMessage}
              onClose={() => setShowToast(false)}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
