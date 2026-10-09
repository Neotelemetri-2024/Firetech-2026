import type { RegistrationFile, getMyRegistrationById } from "../../services/registration.services";

export type ReviewRegistrationNoticeProps = {
  activeRegistrationId: number | null;
  existingFiles: RegistrationFile[];
  existingRegistration: Awaited<ReturnType<typeof getMyRegistrationById>> | null;
};

export function ReviewRegistrationNotice({
  activeRegistrationId,
  existingFiles,
  existingRegistration,
}: ReviewRegistrationNoticeProps) {
  if (!activeRegistrationId) return null;

  return (
    <div className="mb-5 min-w-0 max-w-full rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-sm text-white">
      <p className="font-bold">Tinjau kembali pendaftaran</p>
      <p className="mt-1 text-white/75">
        Data sudah diisi dari pendaftaran sebelumnya. Berkas yang tidak diganti
        akan tetap digunakan.
      </p>
      {existingFiles.length > 0 && (
        <ul className="mt-2 space-y-1 text-white/80">
          {existingFiles.map((file) => (
            <li key={file.id} className="[overflow-wrap:anywhere]">
              {file.kind === "identity" ? "KTM" : "Bukti pembayaran"}:{" "}
              {file.originalName ?? "Berkas tersimpan"}
            </li>
          ))}
        </ul>
      )}
      {existingRegistration?.message && (
        <p className="mt-2 [overflow-wrap:anywhere] text-amber-200">
          Catatan panitia: {existingRegistration.message}
        </p>
      )}
    </div>
  );
}
