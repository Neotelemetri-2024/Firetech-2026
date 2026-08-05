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
  Pencil,
  CheckCircle,
} from "lucide-react";

import type { ReactNode } from "react";

import { useState } from "react";

import UserDetail from "../../components/form/userdetailmodal";
import DeleteModal from "../../components/form/delete";
import Toast from "../../components/ui/toast";
import Pagination from "../../components/pagination";
import Filter from "../../components/filter/filter";
import Reset from "../../components/button/reset";
import EditUser from "../../components/form/edituser";

import type {
  UserItem,
  PaymentStatus,
  SubmissionStatus,
} from "../../types/user";

import { getStatusColor } from "../../utils/status";
import { users } from "../../data/user";
import { EVENTS } from "../../constants/event";

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
  onEdit,
  onDelete,
}: {
  user: UserItem;
  onView: () => void;
  onEdit: () => void;
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

            <span className="rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-2.5 py-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-white">
              Member
            </span>
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
              label="Payment"
              status={user.paymentStatus}
            />

            <StatusBadge
              icon={FileCheck}
              label="Submission"
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
              onClick={onEdit}
              aria-label={`Edit ${user.name}`}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-4xl border border-blue-400/30 bg-blue-500/15 text-blue-300 transition hover:-translate-y-0.5 hover:bg-blue-500/25 hover:text-blue-200"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onDelete}
              aria-label={`Delete ${user.name}`}
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
  const [userList, setUserList] = useState<UserItem[]>(users);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventFilter, setEventFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<string | null>(null);

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
      setToastMessage(`User "${deletedName}" berhasil dihapus`);
      setShowToast(true);
    }, 900);
  };

  const filteredUsers = userList.filter((user) => {
    const matchesEvent = !eventFilter || user.eventTags.includes(eventFilter);

    const matchesPayment =
      !paymentFilter || user.paymentStatus === paymentFilter;

    const matchesSubmission =
      !submissionFilter || user.submissionStatus === submissionFilter;

    const matchesSearch =
      !search ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    return matchesEvent && matchesPayment && matchesSubmission && matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <div className="min-h-screen">
        <main className="mx-auto w-full max-w-290 px-4 pb-0 pt-0 sm:px-6 sm:pt-6 lg:px-12">
          <section className="min-h-screen rounded-4xl border border-white/15 bg-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex min-h-187.5 flex-col gap-5">
              <SectionTitle
                title="User Management"
                subtitle="Review registered participants, filter their status, and scan event participation."
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
                    placeholder="Payment"
                    onSelect={(value) => setPaymentFilter(value)}
                  />

                  <Filter
                    options={["Submitted", "Rejected", "Pending"]}
                    selected={submissionFilter}
                    placeholder="Submission"
                    onSelect={(value) => setSubmissionFilter(value)}
                  />
                  {(eventFilter || paymentFilter || submissionFilter) && (
                    <Reset
                      onClick={() => {
                        setEventFilter(null);
                        setPaymentFilter(null);
                        setSubmissionFilter(null);
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
                    placeholder="Search by name or email"
                    className="w-full rounded-2xl border border-white/35 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-3 pr-24 text-sm font-medium text-white/95 outline-none transition hover:-translate-y-0.5 placeholder:text-white/45"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setCurrentPage(1);
                      }}
                      aria-label="Clear search"
                      className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer text-white/80 transition-all hover:scale-110 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
                </label>
              </div>

              <div className="flex-1">
                {filteredUsers.length > 0 ? (
                  <div className="grid gap-4">
                    {paginatedUsers.map((user, index) => (
                      <UserCard
                        key={`${user.email}-${index}`}
                        user={user}
                        onView={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                        onEdit={() => {
                          setEditingUser({
                            ...user,
                            competitions: [...user.competitions],
                          });

                          setIsEditOpen(true);
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
                        ? `No participants found with the keyword "${search}".`
                        : "No participants match the selected filters."}
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

            <EditUser
              open={isEditOpen}
              onClose={() => {
                setIsEditOpen(false);
                setEditingUser(null);
              }}
              initialData={
                editingUser
                  ? {
                      name: editingUser.name,
                      email: editingUser.email,
                      phone: editingUser.phone,
                      school: editingUser.school,
                      competitions: editingUser.competitions.map((item) => ({
                        title: item.title,
                        team: item.team,
                        role: item.role,
                        payment: item.payment,
                        submission: item.submission,
                      })),
                    }
                  : undefined
              }
              isSaving={isSaving}
              onSubmit={(data) => {
                setIsSaving(true);

                setTimeout(() => {
                  setUserList((prev) =>
                    prev.map((user) => {
                      if (user.email !== editingUser?.email) {
                        return user;
                      }

                      return {
                        ...user,

                        name: data.name,

                        email: data.email,

                        phone: data.phone,

                        school: data.school,

                        competitions: [...data.competitions],

                        eventTags: data.competitions.map(
                          (competition) => competition.title,
                        ),

                        paymentStatus:
                          data.competitions[0]?.payment ?? "Pending",

                        submissionStatus:
                          data.competitions[0]?.submission ?? "Pending",
                      };
                    }),
                  );

                  setIsSaving(false);

                  setIsEditOpen(false);

                  setEditingUser(null);

                  setToastMessage("User successfully updated");

                  setShowToast(true);
                }, 700);
              }}
            />

            {/* DELETE USER MODAL */}
            <DeleteModal
              open={userToDelete !== null}
              itemName={userToDelete?.name}
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
