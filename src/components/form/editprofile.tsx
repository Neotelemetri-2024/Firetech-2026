import { AnimatePresence, motion } from "framer-motion";
import { X, Camera, Pencil, Loader2 } from "lucide-react";
import { useTheme } from "../../context/themecontext";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

interface UserData {
  avatarUrl: string;
  name: string;
  email: string;

  phone?: string;
}

interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  user: UserData;

  onSave: (data: {
    avatarUrl: string;
    name: string;
    phone: string;
  }) => Promise<void>;

  isSaving?: boolean;
}

export default function EditProfile({
  open,
  onClose,
  user,
  onSave,
  isSaving = false,
}: EditProfileProps) {
  const { darkMode } = useTheme();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState(() => ({
    photo: user.avatarUrl,
    name: user.name,
    whatsapp: user.phone ?? "",
  }));

  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") return;

      setForm((prev) => ({
        ...prev,
        photo: result,
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = async () => {
    const phone = form.whatsapp.trim();

    if (!/^08\d{8,11}$/.test(phone)) {
      setSuccess("");
      setError("Nomor WhatsApp harus diawali 08 dan hanya berisi angka");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await onSave({
        name: form.name.trim() || user.name,
        phone,
        avatarUrl: form.photo,
      });

      setSuccess("Profil berhasil diperbarui");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch {
      setSuccess("");
      setError("Gagal memperbarui profil");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
            className={`relative w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border shadow-2xl max-h-[92vh] ${
              darkMode
                ? "bg-white border-slate-300"
                : "bg-slate-900 border-white/10"
            }`}
          >
            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

            {/* Header */}
            <div
              className={`relative flex items-center justify-between border-b px-4 py-4 sm:px-6 sm:py-5 ${
                darkMode ? "border-slate-200" : "border-white/10"
              }`}
            >
              <h2
                className={`text-lg sm:text-xl font-bold ${darkMode ? "text-slate-800" : "text-white"}`}
              >
                Edit Profile
              </h2>

              <button
                onClick={onClose}
                className={`rounded-full p-2 ${darkMode ? "hover:bg-slate-200" : "hover:bg-white/10"}`}
                aria-label="Tutup edit profile"
              >
                <X
                  className={`h-5 w-5 cursor-pointer ${darkMode ? "text-slate-700" : "text-white"}`}
                />
              </button>
            </div>

            {/* Modal Body */}
            <div className="profile-scroll relative max-h-[calc(92vh-80px)] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col items-center">
                {/* Photo — editable */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative block cursor-pointer"
                    aria-label="Ubah foto profil"
                  >
                    <motion.img
                      src={form.photo}
                      alt={form.name}
                      className={`h-24 w-24 sm:h-24 sm:w-24 rounded-full border-4 object-cover shadow-xl transition-all duration-300 ${
                        darkMode
                          ? "border-blue-500 shadow-blue-300/40"
                          : "border-red-500 shadow-red-500/30"
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <Camera
                        size={20}
                        className="text-white transition-transform duration-200 group-hover:scale-110"
                      />
                    </div>
                  </motion.button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

                <p
                  className={`mt-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] ${
                    darkMode ? "text-slate-400" : "text-slate-400"
                  }`}
                >
                  Click to change photo
                </p>

                {/* Name — editable */}
                <div className="mt-2 w-full max-w-md">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Your name"
                    aria-label="Full name"
                    className={`w-full rounded-xl border-b-2 bg-transparent px-2 py-1 text-center text-xl sm:text-2xl font-bold outline-none transition ${
                      darkMode
                        ? "text-slate-800 border-slate-300 focus:border-blue-600"
                        : "text-white border-white/20 focus:border-red-500"
                    }`}
                  />
                </div>

                {/* WhatsApp */}
                <div className="mt-4 w-full max-w-md">
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 13);

                      setForm((prev) => ({
                        ...prev,
                        whatsapp: value,
                      }));
                    }}
                    placeholder="WhatsApp number"
                    className={`w-full rounded-xl border-b-2 
                    bg-transparent px-2 py-2 text-center
                    text-base font-semibold outline-none ${
                      darkMode
                        ? "text-slate-800 border-slate-300"
                        : "text-white border-white/20"
                    }`}
                  />
                </div>

                {/* Email — read only */}
                <p
                  className={`mt-1 text-center text-xs sm:text-sm break-all ${darkMode ? "text-slate-500" : "text-slate-300"}`}
                >
                  {user.email}
                </p>
              </div>

              {/* Notif */}
              {success && (
                <div
                  className={`mt-6 w-full rounded-xl border px-4 py-3 text-sm ${
                    darkMode
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-green-500/30 bg-green-500/10 text-green-400"
                  }`}
                >
                  {success}
                </div>
              )}

              {error && (
                <div
                  className={`mt-6 w-full rounded-xl border px-4 py-3 text-sm ${
                    darkMode
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 ${
                    darkMode
                      ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                      : "border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-r from-red-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Pencil size={18} />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
