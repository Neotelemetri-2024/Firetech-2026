import { X } from "lucide-react";
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
    const reason = isReject
      ? window.prompt("Masukkan alasan penolakan (wajib):")?.trim()
      : undefined;
    if (isReject && !reason) return;
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
        onClose();
      } else {
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
      )}
    </AnimatePresence>,
    document.body,
  );
}
