import { useState, useLayoutEffect, type FormEvent } from "react";
import { useTheme } from "../../context/themecontext";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
    AlertCircle,
    CheckCircle,
    } from "lucide-react";

const socialProviders = [
    {
        name: "Google",
        icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        ),
    },
    {
        name: "Facebook",
        icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.6 11.9h-2.4v8.4h-3.6v-8.4h-1.8v-3h1.8v-1.8c0-1.404.606-3.6 3.6-3.6h2.808v2.988h-2.04c-.333 0-.6.165-.6.825v1.017h2.52l-.36 3.015z" />
        </svg>
        ),
    },
    ];

export default function FormRegister() {
    const { darkMode } = useTheme();
    const [showAos, setShowAos] = useState(true);

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);

    // Hilangkan data-aos setelah render pertama
    useLayoutEffect(() => {
        setShowAos(false);
    }, []);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!registerName.trim()) {
        newErrors.name = "Nama lengkap tidak boleh kosong";
        }

        if (!registerEmail.trim()) {
        newErrors.email = "Email tidak boleh kosong";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
        newErrors.email = "Format email tidak valid";
        }

        if (!registerPassword.trim()) {
        newErrors.password = "Password tidak boleh kosong";
        } else if (registerPassword.length < 6) {
        newErrors.password = "Password minimal 6 karakter";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess(false);

        if (!validateForm()) {
        return;
        }

        setRegisterLoading(true);
        window.setTimeout(() => {
        setRegisterLoading(false);
        setSuccess(true);
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setErrors({});
        }, 1200);
    };

    const panelStyles = darkMode
        ? "border-slate-800 bg-blue-900/80"
        : "border-slate-200 bg-white/85";

    const inputStyles = darkMode
        ? "border-slate-700 bg-slate-950/70 text-white placeholder:text-slate-500 focus:border-blue-700 focus:ring-blue-400/20"
        : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20";

    const inputErrorStyles = `border-blue-700 focus:border-blue-700 focus:ring-blue-700/20`;

    return (
      <section
        {...(showAos
          ? {
              "data-aos": "fade-right",
              "data-aos-duration": "900",
              "data-aos-easing": "ease-in-out",
            }
          : {})}
        className={`rounded-4xl border p-1 shadow-[0_24px_80px_rgba(15,23,42,0.12)] ${panelStyles}`}
      >
        <div className="h-1" />
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-[0_18px_40px_rgba(59,130,246,0.3)]">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-700">
                Register
              </p>
              <h2 className="text-2xl font-black">Buat Akun</h2>
            </div>
          </div>

          {success && (
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-green-500/20 p-4 border border-green-500/50">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                Pendaftaran berhasil! Silakan login dengan akun Anda.
              </p>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                className={`block text-sm font-semibold ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Nama lengkap
              </label>
              <div className="relative">
                <User
                  className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => {
                    setRegisterName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  placeholder="Nama kamu"
                  className={`h-12 w-full rounded-2xl border px-12 text-sm outline-none transition focus:ring-4 ${inputStyles} ${
                    errors.name ? inputErrorStyles : ""
                  }`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                className={`block text-sm font-semibold ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => {
                    setRegisterEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  placeholder="nama@email.com"
                  className={`h-12 w-full rounded-2xl border px-12 text-sm outline-none transition focus:ring-4 ${inputStyles} ${
                    errors.email ? inputErrorStyles : ""
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                className={`block text-sm font-semibold ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  value={registerPassword}
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  placeholder="••••••••"
                  className={`h-12 w-full rounded-2xl border px-12 pr-14 text-sm outline-none transition focus:ring-4 ${inputStyles} ${
                    errors.password ? inputErrorStyles : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword((value) => !value)}
                  aria-label={
                    showRegisterPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                  className={`absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl transition ${
                    darkMode
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {showRegisterPassword ? (
                    <EyeOff className="h-5 w-5 cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm ">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={registerLoading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
            >
              {registerLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                  Sedang daftar...
                </>
              ) : (
                <>Daftar</>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
            <span
              className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              atau
            </span>
            <div
              className={`h-px flex-1 ${
                darkMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          </div>

          <div className="space-y-3">
            {socialProviders.map((provider) => (
              <button
                key={provider.name}
                type="button"
                className={`flex h-12 w-full items-center justify-center gap-3 rounded-2xl border text-sm font-semibold transition cursor-pointer ${
                  darkMode
                    ? "border-slate-800 bg-slate-950/70 text-slate-100 hover:bg-slate-900"
                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-200"
                }`}
              >
                {provider.icon}
                {provider.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
}
