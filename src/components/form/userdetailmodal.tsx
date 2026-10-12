import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "../ui/toast";
import type { UserCompetition } from "../../types/user";
import {
  downloadRegistrationFile,
  type RegistrationFile,
} from "../../services/registration.services";
import {
  getUserById,
  getUsers,
  findPhoneNumber,
  type AdminUser,
} from "../../services/user.services";
import { UserInfoSection } from "./userdetail/userinfosection";
import { CompetitionSection } from "./userdetail/competitionsection";

export type UserDetailModalProps = {
  open: boolean;
  onClose: () => void;
  userId?: number;
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

export default function UserDetailModal({
  open,
  onClose,
  userId,
  name,
  email,
  phone,
  school,
  competitions,
  registrationId,
  proofFiles = EMPTY_PROOF_FILES,
  verification,
}: UserDetailModalProps) {
  const [fetchedUser, setFetchedUser] = useState<AdminUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userFetchError, setUserFetchError] = useState("");
  const [busyAction, setBusyAction] =
    useState<RegistrationVerificationAction | null>(null);
  const [rejectionAction, setRejectionAction] =
    useState<RegistrationVerificationAction | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionReasonError, setRejectionReasonError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [localRegistrationStatus, setLocalRegistrationStatus] = useState(
    verification?.registrationStatus ?? "",
  );
  const [localPaymentStatus, setLocalPaymentStatus] = useState(
    verification?.paymentStatus ?? "",
  );
  const [successToast, setSuccessToast] = useState("");
  const [completedVerificationKinds, setCompletedVerificationKinds] = useState<
    Array<"ktm" | "payment">
  >([]);
  const [showProofs, setShowProofs] = useState(false);
  const [proofViews, setProofViews] = useState<
    Record<number, { url?: string; type?: string; error?: boolean }>
  >({});

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    const fetchUserData = async () => {
      setIsLoadingUser(true);
      setUserFetchError("");
      try {
        if (userId) {
          try {
            const detail = await getUserById(userId);
            if (!cancelled) {
              setFetchedUser(detail);
              setIsLoadingUser(false);
              return;
            }
          } catch {
            // Fallback if getUserById returns 404 or fails
          }
        }
        const allUsers = await getUsers();
        if (!cancelled) {
          const matched = allUsers.find(
            (u) =>
              (userId && u.id === userId) ||
              u.email.toLowerCase() === email.toLowerCase(),
          );
          if (matched) {
            setFetchedUser(matched);
          }
        }
      } catch {
        if (!cancelled) {
          setUserFetchError("Gagal memuat detail user dari server.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingUser(false);
        }
      }
    };

    void fetchUserData();

    return () => {
      cancelled = true;
    };
  }, [open, userId, email]);

  const resolvedId = fetchedUser?.id ?? userId;
  const resolvedEmail = fetchedUser?.email ?? email;
  const resolvedPhone =
    findPhoneNumber(fetchedUser) ||
    fetchedUser?.phone ||
    fetchedUser?.whatsapp ||
    phone;
  const resolvedUpdatedAt = fetchedUser?.updatedAt
    ? new Date(fetchedUser.updatedAt).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  const whatsappNumber = resolvedPhone.replace(/\D/g, "");
  const hasValidWhatsappNumber =
    whatsappNumber.length >= 8 && whatsappNumber.length <= 15;
  const whatsappLinkNumber = whatsappNumber.startsWith("0062")
    ? whatsappNumber.slice(2)
    : whatsappNumber.startsWith("0")
      ? `62${whatsappNumber.slice(1)}`
      : whatsappNumber.startsWith("8")
        ? `62${whatsappNumber}`
        : whatsappNumber;

  const runVerification = async (action: RegistrationVerificationAction) => {
    if (!verification) return;
    const isReject = action === "reject" || action === "reject-payment";
    if (isReject) {
      setRejectionAction(action);
      setRejectionReason("");
      setRejectionReasonError("");
      setVerificationError("");
      return;
    }

    await submitVerification(action);
  };

  const submitVerification = async (
    action: RegistrationVerificationAction,
    reason?: string,
  ) => {
    if (!verification) return;
    setBusyAction(action);
    setVerificationError("");
    try {
      await verification.onAction(action, reason);
      const nextRegistrationStatus =
        action === "approve"
          ? "approved"
          : action === "reject"
            ? "rejected"
            : localRegistrationStatus;
      const nextPaymentStatus =
        action === "approve-payment"
          ? "paid"
          : action === "reject-payment"
            ? "rejected"
            : localPaymentStatus;

      setLocalRegistrationStatus(nextRegistrationStatus);
      setLocalPaymentStatus(nextPaymentStatus);

      const actionKind =
        action === "approve" || action === "reject" ? "ktm" : "payment";
      const nextCompletedKinds = new Set<"ktm" | "payment">([
        ...completedVerificationKinds,
        actionKind,
      ]);
      setCompletedVerificationKinds([...nextCompletedKinds]);

      const isUiUxCompetition = competitions.some((competition) =>
        /ui\s*\/?\s*ux/i.test(competition.title),
      );
      const mustCompleteBothUiUxVerifications =
        isUiUxCompetition &&
        verification.requiresKtm &&
        verification.requiresPayment;
      const bothUiUxActionsCompleted =
        (!verification.requiresKtm || nextCompletedKinds.has("ktm")) &&
        (!verification.requiresPayment || nextCompletedKinds.has("payment"));

      if (!mustCompleteBothUiUxVerifications || bothUiUxActionsCompleted) {
        setRejectionAction(null);
        onClose();
      } else {
        setRejectionAction(null);
        setSuccessToast(
          "Verifikasi tersimpan. Silakan lanjutkan verifikasi berikutnya.",
        );
      }
    } catch {
      setVerificationError("Aksi gagal disimpan. Silakan coba lagi.");
    } finally {
      setBusyAction(null);
    }
  };

  const handleRejectSubmit = () => {
    const reason = rejectionReason.trim();
    if (!reason) {
      setRejectionReasonError("Alasan penolakan wajib diisi.");
      return;
    }
    if (!rejectionAction) return;

    setRejectionReasonError("");
    void submitVerification(rejectionAction, reason);
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="user-detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-10000 flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-detail-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex w-full max-w-255 max-h-[90vh] flex-col overflow-hidden rounded-[1.8rem] border border-white/30 bg-[radial-gradient(circle_at_15%_15%,rgba(248,113,113,0.38),transparent_28%),radial-gradient(circle_at_78%_78%,rgba(96,165,250,0.28),transparent_30%),linear-gradient(120deg,#3b0d1a_0%,#5d0d22_20%,#1d2c4a_58%,#114ba5_100%)] text-white shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
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
                {successToast && (
                  <div className="mb-4">
                    <Toast
                      open
                      message={successToast}
                      duration={3000}
                      onClose={() => setSuccessToast("")}
                    />
                  </div>
                )}
                <div
                  className="mb-5 border-b border-white/80 pb-4"
                  style={{
                    animation: "proof-slide-down 0.3s 0.08s ease-out both",
                  }}
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
                  <UserInfoSection
                    resolvedId={resolvedId}
                    name={name}
                    resolvedEmail={resolvedEmail}
                    resolvedPhone={resolvedPhone}
                    isLoadingUser={isLoadingUser}
                    hasValidWhatsappNumber={hasValidWhatsappNumber}
                    whatsappLinkNumber={whatsappLinkNumber}
                    school={school}
                    resolvedUpdatedAt={resolvedUpdatedAt}
                    userFetchError={userFetchError}
                  />

                  <CompetitionSection
                    competitions={competitions}
                    verification={verification}
                    localRegistrationStatus={localRegistrationStatus}
                    localPaymentStatus={localPaymentStatus}
                    busyAction={busyAction}
                    runVerification={runVerification}
                    registrationId={registrationId}
                    proofFiles={proofFiles}
                    showProofs={showProofs}
                    setShowProofs={setShowProofs}
                    proofViews={proofViews}
                    setProofViews={setProofViews}
                    verificationError={verificationError}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {rejectionAction && (
              <motion.div
                key="rejection-dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-11000 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
                aria-labelledby="rejection-dialog-title"
                onClick={() => {
                  if (busyAction === null) setRejectionAction(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && busyAction === null) {
                    setRejectionAction(null);
                  }
                }}
              >
                <motion.section
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(145deg,#24121c_0%,#17233b_100%)] text-white shadow-[0_28px_80px_rgba(0,0,0,0.6)]"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-red-500/15 blur-3xl" />
                  <div className="relative p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-red-300/25 bg-red-400/10 text-red-200">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-200/80">
                            Konfirmasi penolakan
                          </p>
                          <h2
                            id="rejection-dialog-title"
                            className="mt-1 text-xl font-black sm:text-2xl"
                          >
                            Tolak{" "}
                            {rejectionAction === "reject-payment"
                              ? "pembayaran"
                              : "verifikasi KTM"}
                            ?
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={busyAction !== null}
                        onClick={() => setRejectionAction(null)}
                        aria-label="Tutup dialog penolakan"
                        className="cursor-pointer grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X className="h-4 w-4 " />
                      </button>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-white/65">
                      Jelaskan alasan penolakan agar peserta mengetahui hal yang
                      perlu diperbaiki. Alasan ini wajib diisi.
                    </p>

                    <label
                      htmlFor="rejection-reason"
                      className="mt-5 block text-sm font-bold text-white/90"
                    >
                      Alasan penolakan
                    </label>
                    <textarea
                      id="rejection-reason"
                      autoFocus
                      rows={4}
                      value={rejectionReason}
                      onChange={(event) => {
                        setRejectionReason(event.target.value);
                        if (event.target.value.trim()) {
                          setRejectionReasonError("");
                        }
                      }}
                      placeholder="Contoh: Foto KTM kurang jelas, silakan unggah ulang."
                      aria-invalid={Boolean(rejectionReasonError)}
                      aria-describedby={
                        rejectionReasonError
                          ? "rejection-reason-error"
                          : undefined
                      }
                      disabled={busyAction !== null}
                      className="mt-2 w-full resize-y rounded-2xl border border-white/20 bg-slate-950/45 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/35 focus:border-red-200/60 focus:ring-2 focus:ring-red-300/15 disabled:opacity-60"
                    />
                    {rejectionReasonError && (
                      <p
                        id="rejection-reason-error"
                        role="alert"
                        className="mt-2 text-sm font-semibold text-red-200"
                      >
                        {rejectionReasonError}
                      </p>
                    )}
                    {verificationError && (
                      <p
                        role="alert"
                        className="mt-2 text-sm font-semibold text-red-200"
                      >
                        {verificationError}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        disabled={busyAction !== null}
                        onClick={() => setRejectionAction(null)}
                        className="cursor-pointer rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        disabled={busyAction !== null}
                        onClick={handleRejectSubmit}
                        className=" cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-red-300/20 bg-linear-to-r from-red-600 to-rose-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/30 transition hover:-translate-y-0.5 hover:from-red-500 hover:to-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {busyAction === rejectionAction
                          ? "Menyimpan..."
                          : "Tolak pendaftaran"}
                      </button>
                    </div>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
