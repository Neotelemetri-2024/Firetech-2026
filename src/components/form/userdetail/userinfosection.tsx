import { FaWhatsapp } from "react-icons/fa";
import { InfoLine } from "./infoline";
import { SectionCard } from "./sectioncard";

export type UserInfoSectionProps = {
  resolvedId?: number;
  name: string;
  resolvedEmail: string;
  resolvedPhone: string;
  isLoadingUser: boolean;
  hasValidWhatsappNumber: boolean;
  whatsappLinkNumber: string;
  school: string;
  resolvedUpdatedAt: string;
  userFetchError: string;
};

export function UserInfoSection({
  resolvedId,
  name,
  resolvedEmail,
  resolvedPhone,
  isLoadingUser,
  hasValidWhatsappNumber,
  whatsappLinkNumber,
  school,
  resolvedUpdatedAt,
  userFetchError,
}: UserInfoSectionProps) {
  return (
    <div style={{ animation: "proof-slide-up 0.35s 0.15s ease-out both" }}>
      <SectionCard title="Information">
        <div
          className="space-y-3"
          style={{
            animation: "proof-fade-in 0.3s 0.22s ease-out both",
          }}
        >
          {resolvedId !== undefined && (
            <InfoLine label="ID :" value={String(resolvedId)} />
          )}
          <InfoLine label="Name :" value={name} />
          <InfoLine label="Email :" value={resolvedEmail} />
          <div className="flex flex-wrap items-center gap-2 text-[1.04rem] leading-7 text-white/95 sm:text-[1.08rem]">
            <span className="min-w-19 font-semibold text-white/90">
              WhatsApp :
            </span>

            {isLoadingUser && !resolvedPhone ? (
              <span className="text-white/60">Memuat nomor...</span>
            ) : hasValidWhatsappNumber ? (
              <>
                <a
                  href={`https://wa.me/${whatsappLinkNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact via WhatsApp"
                  title="WhatsApp"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-white transition hover:bg-[#1fba59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  <span className="text-sm font-bold">Chat WhatsApp</span>
                </a>

                <span className="text-white">{resolvedPhone}</span>
              </>
            ) : (
              <span className="text-white/60">Belum ada</span>
            )}
          </div>
          <InfoLine label="Institution :" value={school} />
          {resolvedUpdatedAt && (
            <InfoLine label="Diperbarui :" value={resolvedUpdatedAt} />
          )}
          {userFetchError && (
            <p className="text-xs text-amber-200">{userFetchError}</p>
          )}
        </div>

        <div
          className="mt-6 flex flex-wrap items-center gap-3"
          style={{ animation: "proof-fade-in 0.3s 0.3s ease-out both" }}
        >
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-white/85 bg-white px-4 text-sm font-black text-[#111] shadow-[0_8px_18px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            Sertifikat
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
