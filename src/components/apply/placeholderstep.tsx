// Placeholder step yang dipakai untuk step yang kontennya belum tersedia
// (misalnya: Add Member, Upload Portfolio, Add Partner, dll)
type PlaceholderStepProps = {
  message: string;
};

export default function PlaceholderStep({ message }: PlaceholderStepProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30 py-12 text-center hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group">
        <div className="animate-bounce">
          <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
