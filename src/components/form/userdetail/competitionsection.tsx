import { Check, X } from "lucide-react";
import type { UserCompetition } from "../../../types/user";
import type { RegistrationFile } from "../../../services/registration.services";
import type { RegistrationVerificationAction, UserDetailModalProps } from "../userdetailmodal";
import { SectionCard } from "./sectioncard";
import { ProofsSection } from "./proofssection";

const isTeamCompetition = (title: string) =>
  /hackathon|ui\s*\/?\s*ux/i.test(title);

export type CompetitionSectionProps = {
  competitions: UserCompetition[];
  verification?: UserDetailModalProps["verification"];
  localRegistrationStatus: string;
  localPaymentStatus: string;
  busyAction: RegistrationVerificationAction | null;
  runVerification: (action: RegistrationVerificationAction) => Promise<void>;
  registrationId?: number;
  proofFiles: RegistrationFile[];
  showProofs: boolean;
  setShowProofs: React.Dispatch<React.SetStateAction<boolean>>;
  proofViews: Record<number, { url?: string; type?: string; error?: boolean }>;
  setProofViews: React.Dispatch<
    React.SetStateAction<
      Record<number, { url?: string; type?: string; error?: boolean }>
    >
  >;
  verificationError: string;
};

export function CompetitionSection({
  competitions,
  verification,
  localRegistrationStatus,
  localPaymentStatus,
  busyAction,
  runVerification,
  registrationId,
  proofFiles,
  showProofs,
  setShowProofs,
  proofViews,
  setProofViews,
  verificationError,
}: CompetitionSectionProps) {
  return (
    <div style={{ animation: "proof-slide-up 0.35s 0.2s ease-out both" }}>
      <SectionCard title="Competition">
        <div
          className="space-y-4"
          style={{
            animation: "proof-fade-in 0.3s 0.28s ease-out both",
          }}
        >
          {competitions.map((competition) => {
            const teamCompetition = isTeamCompetition(competition.title);

            return (
              <article
                key={`${competition.title}-${competition.team}`}
                className="py-4 text-white/85"
              >
                <h4 className="text-lg font-black uppercase tracking-wide sm:text-xl">
                  {competition.title}
                </h4>

                <div className="mt-4 space-y-3 text-[1rem] sm:text-[1.02rem]">
                  {teamCompetition && (
                    <p className="flex flex-wrap gap-2">
                      <span className="font-bold">Tim</span>
                      <span>:</span>
                      <span>{competition.team}</span>
                    </p>
                  )}

                  {teamCompetition && competition.role && (
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
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-100 transition hover:bg-emerald-400/20 disabled:opacity-50"
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
                                className="inline-flex items-center cursor-pointer gap-1.5 rounded-lg border border-red-300/30 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-100 transition hover:bg-red-400/20 disabled:opacity-50"
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

                  <ProofsSection
                    registrationId={registrationId}
                    proofFiles={proofFiles}
                    showProofs={showProofs}
                    setShowProofs={setShowProofs}
                    proofViews={proofViews}
                    setProofViews={setProofViews}
                  />
                </div>
              </article>
            );
          })}
        </div>
        {verificationError && (
          <p role="alert" className="mt-3 text-sm text-red-200">
            {verificationError}
          </p>
        )}
      </SectionCard>
    </div>
  );
}
