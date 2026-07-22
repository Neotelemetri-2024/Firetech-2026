// Reusable animated input field dipakai oleh semua form kategori event
type FormFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animationClass?: string;
  animationDelay?: string;
};

export default function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  animationClass = "animate-slideInLeft",
  animationDelay = "0s",
}: FormFieldProps) {
  return (
    <div className={`group ${animationClass}`} style={{ animationDelay }}>
      <label className="mb-3 block text-sm font-semibold text-slate-300 transition-all duration-300 group-focus-within:translate-x-1 group-focus-within:text-cyan-400 group-hover:text-cyan-400">
        {label}
      </label>
      <div className="relative overflow-hidden rounded-xl transition-transform duration-300 focus-within:scale-[1.02]">
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="peer relative z-10 w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-200 placeholder-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/50 hover:border-slate-600 hover:bg-slate-800/70"
        />
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/20 group-hover:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
        <span className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-linear-to-r from-cyan-400 to-blue-500 transition-all duration-500 peer-focus:w-full" />
      </div>
    </div>
  );
}
