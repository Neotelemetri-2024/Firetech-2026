import { BadgeCheck, Mail, Search, Users, CalendarDays, X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import UserDetail from "../../components/form/userdetailmodal";
import Pagination from "../../components/pagination";
import Filter from "../../components/filter/filter";
import Reset from "../../components/button/reset"
import participantProof from "../../assets/firetech.webp";

type UserItem = {
  name: string;
  email: string;
  eventTags: string[];
  paymentStatus: "Dibayar" | "Ditolak" | "Menunggu";
  submissionStatus: "Dikumpulkan" | "Ditolak" | "Menunggu";
};

type CompetitionCard = NonNullable<
  ComponentProps<typeof UserDetail>["competitions"]
>[number];

const ALL_EVENTS = [
  "Hackathon",
  "Fast Typing",
  "E-Football",
  "UI/UX Competition",
];

const users: UserItem[] = [
  {
    name: "Wonwoo",
    email: "jeonwonwoo@gmail.com",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Dibayar",
    submissionStatus: "Menunggu"
  },
  {
    name: "Jeonghan",
    email: "jeonghan@gmail.com",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Ditolak",
    submissionStatus:"Dikumpulkan"
  },
  {
    name: "Jeonghan",
    email: "jeonghan@gmail.com",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Dibayar",
    submissionStatus: "Dikumpulkan"
  },
  {
    name: "Wonwoo",
    email: "jeonwonwoo@gmail.com",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Ditolak",
    submissionStatus: "Dikumpulkan"
  },

  {
    name: "Mingyu",
    email: "kiming@gmail.com",
    eventTags: ["Fast Typing", "Hackathon"],
    paymentStatus: "Menunggu",
    submissionStatus: "Menunggu"
  },
  {
    name: "Abdul",
    email: "abdull@gmail.com",
    eventTags: ["Fast Typing", "Hackathon"],
    paymentStatus: "Menunggu",
    submissionStatus: "Menunggu"
  },
  {
    name: "Jeonghan",
    email: "jeonghan@gmail.com",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Ditolak",
    submissionStatus: "Ditolak"
  },
  {
    name: "Abdul",
    email: "abdull@gmail.com",
    eventTags: ["Fast Typing", "Hackathon"],
    paymentStatus: "Dibayar",
    submissionStatus: "Dikumpulkan"
  },
];

const stats = [
  { label: "Total User", value: "128", icon: Users },
  { label: "Verifikasi", value: "102", icon: BadgeCheck },
  { label: "Event", value: "12", icon: CalendarDays },
];

const dummyCompetitions: CompetitionCard[] = [
  {
    title: "Hackathon",
    team: "Neo Telemetri",
    payment: "Dibayar",
    paymentProof: participantProof,
    role: "Ketua",
    submission: "Dikumpulkan",
  },
];

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

function UserCard({ user, onView }: { user: UserItem; onView: () => void }) {
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
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {user.eventTags.map((tag) => (
            <UserTag key={tag}>{tag}</UserTag>
          ))}

          <button
            onClick={onView}
            className="rounded-4xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-4 py-2 font-bold text-white/85 transition hover:-translate-y-0.5 cursor-pointer"
          >
            Detail
          </button>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [eventFilter, setEventFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<string | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesEvent =
      !eventFilter || user.eventTags.includes(eventFilter);

    const matchesPayment =
      !paymentFilter || user.paymentStatus === paymentFilter;

    const matchesSubmission =
      !submissionFilter ||
      user.submissionStatus === submissionFilter;

    const matchesSearch =
      !search ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    return (
      matchesEvent &&
      matchesPayment &&
      matchesSubmission &&
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

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <div className="min-h-screen">
        <main className="mx-auto w-full max-w-290 px-4 pb-0 pt-0 sm:px-6 sm:pt-6 lg:px-12">
          <section className="min-h-screen rounded-4xl border border-white/15 bg-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex min-h-187.5 flex-col gap-5">
              <SectionTitle
                title="Manajemen User"
                subtitle="Tinjau peserta yang terdaftar, saring status mereka, dan pindai partisipasi acara."
              />

              <div className="grid gap-3 sm:grid-cols-3">
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
                    options={ALL_EVENTS}
                    selected={eventFilter}
                    placeholder="Acara"
                    onSelect={(value) => setEventFilter(value)}
                  />
                  <Filter
                    options={["Dibayar", "Ditolak", "Menunggu"]}
                    selected={paymentFilter}
                    placeholder="Pembayaran"
                    onSelect={(value) => setPaymentFilter(value)}
                  />

                  <Filter
                    options={["Dikumpulkan", "Ditolak", "Menunggu"]}
                    selected={submissionFilter}
                    placeholder="Pengumpulan"
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
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-80 flex-col items-center justify-center text-center">
                    <Users className="mb-4 h-12 w-12 text-white/40" />

                    <p className="mt-2 max-w-md text-sm text-white/60">
                      {search
                        ? `Tidak ditemukan peserta dengan kata kunci "${search}".`
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
              phone="08123456789"
              school="Universitas Andalas"
              competitions={dummyCompetitions}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
