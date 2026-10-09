import { ChevronDown, Download, FileText } from "lucide-react";
import type { RegistrationFile } from "../../../services/registration.services";

export type ProofsSectionProps = {
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
};

export function ProofsSection({
  registrationId,
  proofFiles,
  showProofs,
  setShowProofs,
  proofViews,
  setProofViews,
}: ProofsSectionProps) {
  if (registrationId === undefined) return null;

  return (
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
              const mimeType = view?.type ?? file.mimeType;
              const fileName = file.originalName ?? `berkas-${file.id}`;

              return (
                <article
                  key={file.id}
                  className="overflow-hidden rounded-xl border border-white/15 bg-black/20 p-3"
                >
                  <p className="mb-2 truncate text-sm font-bold text-white/85">
                    {file.kind === "payment_proof"
                      ? "Bukti pembayaran"
                      : "KTM / Identitas"}
                    {file.originalName ? ` · ${file.originalName}` : ""}
                  </p>
                  {view?.error ? (
                    <p role="alert" className="text-sm text-red-200">
                      Berkas gagal dimuat.
                    </p>
                  ) : !view?.url ? (
                    <p className="text-sm text-white/55">Memuat berkas...</p>
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
                      <Download className="h-4 w-4" /> Unduh{" "}
                      {mimeType.startsWith("image/") ? "foto" : "file"}
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
  );
}
