import { Users } from "lucide-react";

interface ParticipantsEmptyStateProps {
  selectedEvent: string | null;
  search: string;
}

export default function ParticipantsEmptyState({
  selectedEvent,
  search,
}: ParticipantsEmptyStateProps) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 text-center">
      <Users className="mb-4 h-12 w-12 text-white/40" />
      <p className="max-w-md text-sm text-white/60">
        {selectedEvent
          ? search
            ? `Tidak ada peserta "${search}" yang ditemukan untuk acara ${selectedEvent}.`
            : `Tidak ada peserta yang terdaftar untuk event "${selectedEvent}".`
          : search
            ? `Tidak ada peserta yang cocok dengan kata kunci "${search}".`
            : "Belum ada peserta yang mendaftar."}
      </p>
    </div>
  );
}
