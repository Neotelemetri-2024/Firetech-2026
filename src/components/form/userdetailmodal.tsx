import { X, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { ReactNode } from "react";
import { useState } from "react";

const gradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

type PaymentStatus = "Dibayar" | "Menunggu" | "Ditolak";

type SubmissionStatus = "Dikumpulkan" | "Menunggu" | "Ditolak";

type CompetitionCard = {
  title: string;
  team: string;
  payment: PaymentStatus;
  paymentProof?: string;
  role: string;
  submission: SubmissionStatus;
};

export type UserDetailModalProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
  phone: string;
  school: string;
  competitions: CompetitionCard[];
};

function getPaymentTone(
  status: PaymentStatus,
): "success" | "warning" | "danger" {
  if (status === "Dibayar") return "success";
  if (status === "Menunggu") return "warning";
  return "danger";
}

type StatusTone = "success" | "warning" | "danger";

function getSubmissionTone(status: SubmissionStatus): StatusTone {
  if (status === "Dikumpulkan") return "success";
  return "warning";
}

function StatusPill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "success" | "warning" | "danger";
}) {
  const toneClasses =
    tone === "success"
      ? "bg-[#57d11f] text-white"
      : tone === "warning"
        ? "bg-[#f6bf14] text-[#231500]"
        : "bg-[#ef4444] text-white";

  return (
    <span
      className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-bold shadow-[0_8px_18px_rgba(0,0,0,0.16)] ${toneClasses} transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(0,0,0,0.2)] cursor-pointer`}
    >
      {children}
    </span>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex flex-wrap gap-2 text-[1.04rem] leading-7 text-white/95 sm:text-[1.08rem]">
      <span className="min-w-19 font-semibold text-white/90">{label}</span>
      <span className="text-white">{value}</span>
    </p>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <article className="relative overflow-hidden sm:p-5">
      <h3 className="text-xl font-black tracking-wide text-white sm:text-[1.35rem]">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </article>
  );
}

export default function UserDetailModal({
  open,
  onClose,
  name,
  email,
  phone,
  school,
  competitions,
}: UserDetailModalProps) {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  const openPaymentProof = (image?: string) => {
    if (!image) return;
    setSelectedProof(image);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-detail-title"
      style={{ animation: "proof-fade-in 0.25s ease-out" }}
    >
      <div
        className="relative w-full max-w-255 overflow-hidden rounded-[1.8rem] border border-white/35 bg-[linear-gradient(135deg,#0d4f86_0%,#14539f_42%,#2f1ea0_100%)] text-white shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
        style={{
          ...gradientStyle,
          animation: "proof-zoom-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-2 h-44 w-44 rounded-full bg-[#5b7cff]/20 blur-3xl" />

        {!selectedProof && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-9999 pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white cursor-pointer transition hover:-translate-y-0.5 hover:bg-white/20"
            style={{
              zIndex: 9999,
              animation:
                "proof-zoom-in 0.35s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        <div className="px-5 py-5 sm:px-7 sm:py-7">
          <div
            className="mb-5 border-b border-white/80 pb-4"
            style={{ animation: "proof-slide-down 0.3s 0.08s ease-out both" }}
          >
            <p className="mb-2 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-white/90">
              Detail
            </p>

            <h2
              id="user-detail-title"
              className="text-2xl font-black uppercase tracking-wide sm:text-[2.1rem]"
            >
              Detail User
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.02fr_1fr]">
            <div
              style={{ animation: "proof-slide-up 0.35s 0.15s ease-out both" }}
            >
              <SectionCard title="Informasi">
                <div
                  className="space-y-3"
                  style={{
                    animation: "proof-fade-in 0.3s 0.22s ease-out both",
                  }}
                >
                  <InfoLine label="Nama :" value={name} />
                  <InfoLine label="Email :" value={email} />
                  <div className="flex flex-wrap items-center gap-2 text-[1.04rem] leading-7 text-white/95 sm:text-[1.08rem]">
                    <span className="min-w-19 font-semibold text-white/90">
                      WhatsApp :
                    </span>

                    <a
                      href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Hubungi melalui WhatsApp"
                      title="WhatsApp"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                    </a>
                  </div>
                  <InfoLine label="Institusi :" value={school} />
                </div>

                <div
                  className="mt-6 flex flex-wrap items-center gap-3"
                  style={{ animation: "proof-fade-in 0.3s 0.3s ease-out both" }}
                >
                  <StatusPill tone="success">Finalis</StatusPill>

                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center rounded-full border border-white/85 bg-white px-4 text-sm font-black text-[#111] shadow-[0_8px_18px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(0,0,0,0.2)] cursor-pointer"
                  >
                    Sertifikat
                  </button>
                </div>
              </SectionCard>
            </div>

            <div
              style={{ animation: "proof-slide-up 0.35s 0.2s ease-out both" }}
            >
              <SectionCard title="Kompetisi">
                <div
                  className="space-y-4"
                  style={{
                    animation: "proof-fade-in 0.3s 0.28s ease-out both",
                  }}
                >
                  {competitions.map((competition) => (
                    <article
                      key={`${competition.title}-${competition.team}`}
                      className="py-4 text-white/85"
                    >
                      <h4 className="text-lg font-black uppercase tracking-wide sm:text-xl">
                        {competition.title}
                      </h4>

                      <div className="mt-4 space-y-3 text-[1rem] sm:text-[1.02rem]">
                        <p className="flex flex-wrap gap-2">
                          <span className="font-bold">Tim</span>
                          <span>:</span>
                          <span>{competition.team}</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <p className="font-bold">Pembayaran</p>
                          <span>:</span>

                          <StatusPill
                            tone={getPaymentTone(competition.payment)}
                          >
                            {competition.payment}
                          </StatusPill>

                          {competition.paymentProof ? (
                            <button
                              type="button"
                              onClick={() =>
                                openPaymentProof(competition.paymentProof)
                              }
                              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition  hover:-translate-y-0.5 cursor-pointer"
                            >
                              <Eye size={16} />
                              Bukti
                            </button>
                          ) : (
                            <span className="text-sm text-white/50">
                              Belum upload bukti
                            </span>
                          )}
                        </div>

                        <p className="flex flex-wrap gap-2">
                          <span className="font-bold">Role</span>
                          <span>:</span>
                          <span>{competition.role}</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <p className="font-bold">Pengumpulan</p>
                          <span>:</span>

                          <StatusPill
                            tone={getSubmissionTone(competition.submission)}
                          >
                            {competition.submission}
                          </StatusPill>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
          {selectedProof && (
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
              style={{ animation: "proof-fade-in 0.25s ease-out" }}
              onClick={() => setSelectedProof(null)}
            >
              <div
                className="group relative max-w-4xl"
                style={{
                  animation: "proof-zoom-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top toolbar */}
                <div
                  className="absolute -top-14 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-black/60 px-4 py-2.5 backdrop-blur-xl"
                  style={{
                    animation: "proof-slide-down 0.3s 0.1s ease-out both",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    <span className="text-sm font-semibold tracking-wide text-white/90">
                      Bukti Pembayaran
                    </span>
                  </div>
                </div>

                {/* Close button */}
                <button
                  type="button"
                  aria-label="Tutup bukti pembayaran"
                  title="Tutup"
                  onClick={() => setSelectedProof(null)}
                  className="absolute -right-4 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-2xl backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
                  style={{
                    animation:
                      "proof-zoom-in 0.35s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                >
                  <X size={20} />
                </button>

                {/* Image container */}
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/25 bg-black/40 shadow-2xl shadow-black/50 backdrop-blur-md"
                  style={{
                    animation:
                      "proof-zoom-in 0.35s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                >
                  {/* Glass reflection overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />

                  <img
                    src={selectedProof}
                    alt="Bukti Pembayaran"
                    loading="lazy"
                    className="max-h-[78vh] max-w-[90vw] object-contain sm:max-w-[85vw]"
                  />

                  {/* Bottom gradient fade */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/40 to-transparent" />
                </div>

                {/* Bottom caption bar */}
                <div
                  className="mt-3 flex items-center justify-center gap-2 text-center"
                  style={{
                    animation: "proof-slide-up 0.3s 0.2s ease-out both",
                  }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-xl">
                    <Eye size={14} className="text-white/40" />
                    Klik di luar gambar untuk menutup
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
