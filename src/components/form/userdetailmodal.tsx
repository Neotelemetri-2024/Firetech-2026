import { Check, ChevronDown, Download, FileText, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { UserCompetition } from "../../types/user";
import {
  downloadRegistrationFile,
  type RegistrationFile,
} from "../../services/registration.services";

export type UserDetailModalProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
  phone: string;
  school: string;
  competitions: UserCompetition[];
  registrationId?: number;
  proofFiles?: RegistrationFile[];
  verification?: {
    registrationStatus: string;
    paymentStatus: string;
    requiresKtm: boolean;
    requiresPayment: boolean;
    onAction: (
      action: RegistrationVerificationAction,
      reason?: string,
    ) => Promise<void>;
  };
};

export type RegistrationVerificationAction =
  | "approve"
  | "reject"
  | "approve-payment"
  | "reject-payment";

const EMPTY_PROOF_FILES: RegistrationFile[] = [];

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
  registrationId,
  proofFiles = EMPTY_PROOF_FILES,
  verification,
}: UserDetailModalProps) {
  const [busyAction, setBusyAction] =
    useState<RegistrationVerificationAction | null>(null);
  const [verificationError, setVerificationError] = useState("");
  const [localRegistrationStatus, setLocalRegistrationStatus] = useState(
    verification?.registrationStatus ?? "",
  );
  const [localPaymentStatus, setLocalPaymentStatus] = useState(
    verification?.paymentStatus ?? "",
  );
  const [showProofs, setShowProofs] = useState(false);
  const [proofViews, setProofViews] = useState<
    Record<number, { url?: string; type?: string; error?: boolean }>
  >({});
  const whatsappNumber = phone.replace(/\D/g, "");
  const whatsappLinkNumber = whatsappNumber.startsWith("0")
    ? `62${whatsappNumber.slice(1)}`
    : whatsappNumber;

  const runVerification = async (action: RegistrationVerificationAction) => {
    if (!verification) return;
    const isReject = action === "reject" || action === "reject-payment";
    const reason = isReject
      ? window.prompt("Masukkan alasan penolakan (wajib):")?.trim()
      : undefined;
    if (isReject && !reason) return;
    setBusyAction(action);
    setVerificationError("");
    try {
      await verification.onAction(action, reason);
      if (action === "approve") setLocalRegistrationStatus("approved");
      if (action === "reject") setLocalRegistrationStatus("rejected");
      if (action === "approve-payment") setLocalPaymentStatus("paid");
      if (action === "reject-payment") setLocalPaymentStatus("rejected");
      onClose();
    } catch {
      setVerificationError("Aksi gagal disimpan. Silakan coba lagi.");
    } finally {
      setBusyAction(null);
    }
  };
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !showProofs || !registrationId || proofFiles.length === 0) {
      return;
    }

    let cancelled = false;
    const objectUrls: string[] = [];

    proofFiles.forEach(async (file) => {
      try {
        const blob = await downloadRegistrationFile(registrationId, file.id);
        const url = URL.createObjectURL(blob);
        if (cancelled) {
          URL.revokeObjectURL(url);
          return;
        }
        objectUrls.push(url);
        setProofViews((current) => ({
          ...current,
          [file.id]: { url, type: blob.type || file.mimeType },
        }));
      } catch {
        if (!cancelled) {
          setProofViews((current) => ({
            ...current,
            [file.id]: { error: true },
          }));
        }
      }
    });

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [open, showProofs, registrationId, proofFiles]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-detail-title"
      style={{ animation: "proof-fade-in 0.25s ease-out" }}
    >
      <div
        className="relative flex w-full max-w-255 max-h-[90vh] flex-col overflow-hidden rounded-[1.8rem] border border-white/30 bg-[radial-gradient(circle_at_15%_15%,rgba(248,113,113,0.38),transparent_28%),radial-gradient(circle_at_78%_78%,rgba(96,165,250,0.28),transparent_30%),linear-gradient(120deg,#3b0d1a_0%,#5d0d22_20%,#1d2c4a_58%,#114ba5_100%)] text-white shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
        style={{
          animation: "proof-zoom-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-2 h-44 w-44 rounded-full bg-[#5b7cff]/20 blur-3xl" />

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

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-7">
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
              <SectionCard title="Information">
                <div
                  className="space-y-3"
                  style={{
                    animation: "proof-fade-in 0.3s 0.22s ease-out both",
                  }}
                >
                  <InfoLine label="Name :" value={name} />
                  <InfoLine label="Email :" value={email} />
                  <div className="flex flex-wrap items-center gap-2 text-[1.04rem] leading-7 text-white/95 sm:text-[1.08rem]">
                    <span className="min-w-19 font-semibold text-white/90">
                      WhatsApp :
                    </span>

                    {whatsappNumber ? (
                      <>
                        <a
                          href={`https://wa.me/${whatsappLinkNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Contact via WhatsApp"
                          title="WhatsApp"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white"
                        >
                          <FaWhatsapp className="h-5 w-5" />
                        </a>

                        <span className="text-white">{phone}</span>
                      </>
                    ) : (
                      <span className="text-white/60">Belum ada</span>
                    )}
                  </div>
                  <InfoLine label="Institution :" value={school} />
                </div>

                <div
                  className="mt-6 flex flex-wrap items-center gap-3"
                  style={{ animation: "proof-fade-in 0.3s 0.3s ease-out both" }}
                >
                  {/* <StatusPill tone="success">Finalis</StatusPill> */}

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
              <SectionCard title="Competition">
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
                        {competition.title === "Hackathon" && (
                          <p className="flex flex-wrap gap-2">
                            <span className="font-bold">Tim</span>
                            <span>:</span>
                            <span>{competition.team}</span>
                          </p>
                        )}

                        {competition.title === "Hackathon" &&
                          competition.role && (
                            <p className="flex flex-wrap gap-2">
                              <span className="font-bold">Role</span>
                              <span>:</span>
                              <span>{competition.role}</span>
                            </p>
                          )}

                        {verification && (
                          <div className="mt-5 flex flex-wrap items-start gap-3">
                            {(
                              [
                                {
                                  kind: "ktm",
                                  title: "Verifikasi KTM",
                                  status: localRegistrationStatus,
                                  approve: "approve",
                                  reject: "reject",
                                },
                                {
                                  kind: "payment",
                                  title: "Verifikasi Pembayaran",
                                  status: localPaymentStatus,
                                  approve: "approve-payment",
                                  reject: "reject-payment",
                                },
                              ] as const
                            )
                              .filter((item) =>
                                item.kind === "ktm"
                                  ? verification.requiresKtm
                                  : verification.requiresPayment,
                              )
                              .map((item) => (
                                <section
                                  key={item.title}
                                  className="w-fit max-w-full rounded-2xl border border-white/15 bg-black/10 p-4"
                                >
                                  <h5 className="text-sm font-bold text-white/65">
                                    {item.title}
                                  </h5>
                                  <p className="mt-1 text-xs text-white/80">
                                    Status: {item.status || "pending"}
                                  </p>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <button
                                      type="button"
                                      disabled={busyAction !== null}
                                      onClick={() =>
                                        void runVerification(item.approve)
                                      }
                                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-100 transition hover:bg-emerald-400/20 disabled:opacity-50"
                                    >
                                      <Check className="h-3.5 w-3.5" />{" "}
                                      {busyAction === item.approve
                                        ? "Menyimpan..."
                                        : "Setujui"}
                                    </button>
                                    <button
                                      type="button"
                                      disabled={busyAction !== null}
                                      onClick={() =>
                                        void runVerification(item.reject)
                                      }
                                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-300/30 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-100 transition hover:bg-red-400/20 disabled:opacity-50"
                                    >
                                      <X className="h-3.5 w-3.5" />{" "}
                                      {busyAction === item.reject
                                        ? "Menyimpan..."
                                        : "Tolak"}
                                    </button>
                                  </div>
                                </section>
                              ))}
                          </div>
                        )}

                        {registrationId !== undefined && (
                          <section className="mt-5 rounded-2xl border border-white/15 bg-black/10 p-4">
                            <button
                              type="button"
                              aria-expanded={showProofs}
                              onClick={() => {
                                if (!showProofs) setProofViews({});
                                setShowProofs((visible) => !visible);
                              }}
                              className="flex w-full items-center justify-between gap-3 text-left font-black text-white transition hover:text-cyan-100"
                            >
                              <span className="inline-flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Bukti
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${showProofs ? "rotate-180" : ""}`}
                              />
                            </button>

                            {showProofs &&
                              (proofFiles.length > 0 ? (
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                  {proofFiles.map((file) => {
                                    const view = proofViews[file.id];
                                    const mimeType =
                                      view?.type ?? file.mimeType;
                                    const fileName =
                                      file.originalName ?? `berkas-${file.id}`;

                                    return (
                                      <article
                                        key={file.id}
                                        className="overflow-hidden rounded-xl border border-white/15 bg-black/20 p-3"
                                      >
                                        <p className="mb-2 truncate text-sm font-bold text-white/85">
                                          {file.kind === "payment_proof"
                                            ? "Bukti pembayaran"
                                            : "KTM / Identitas"}
                                          {file.originalName
                                            ? ` · ${file.originalName}`
                                            : ""}
                                        </p>
                                        {view?.error ? (
                                          <p
                                            role="alert"
                                            className="text-sm text-red-200"
                                          >
                                            Berkas gagal dimuat.
                                          </p>
                                        ) : !view?.url ? (
                                          <p className="text-sm text-white/55">
                                            Memuat berkas...
                                          </p>
                                        ) : mimeType.startsWith("image/") ? (
                                          <a
                                            href={view.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            title="Buka foto ukuran penuh"
                                          >
                                            <img
                                              src={view.url}
                                              alt={fileName}
                                              className="max-h-72 w-full rounded-lg object-contain"
                                            />
                                          </a>
                                        ) : mimeType === "application/pdf" ? (
                                          <iframe
                                            title={fileName}
                                            src={view.url}
                                            className="h-72 w-full rounded-lg bg-white"
                                          />
                                        ) : (
                                          <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-white/20 text-sm text-white/60">
                                            File siap diunduh
                                          </div>
                                        )}
                                        {view?.url && (
                                          <a
                                            href={view.url}
                                            download={fileName}
                                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs font-bold text-white/80 transition hover:bg-white/10"
                                          >
                                            <Download className="h-4 w-4" />{" "}
                                            Unduh{" "}
                                            {mimeType.startsWith("image/")
                                              ? "foto"
                                              : "file"}
                                          </a>
                                        )}
                                      </article>
                                    );
                                  })}
                                </div>
                              ) : (
                                <p className="mt-4 text-sm text-white/60">
                                  Belum ada dokumen yang diunggah.
                                </p>
                              ))}
                          </section>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
                {verificationError && (
                  <p role="alert" className="mt-3 text-sm text-red-200">
                    {verificationError}
                  </p>
                )}
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
