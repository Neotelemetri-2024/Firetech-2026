import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Trophy,
  Users,
  CreditCard,
  CalendarDays,
  BadgeCheck,
  FileText,
  Camera,
  CircleCheckBig,
  CircleDashed,
  CircleX,
  Pencil,
  Loader2,
} from "lucide-react";
import { useTheme } from "../../context/themecontext";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";

interface UserData {
  photo: string;
  name: string;
  email: string;

  whatsapp?: string;

  participantId: string;
  competition: string;
  team: string;
  payment: string;
  submission: string;
}

interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  user: UserData;

  onSave: (data: { photo: string; name: string; whatsapp: string }) => void;

  isSaving?: boolean;
}

interface ProfileItemProps {
  icon: ReactNode;
  title: string;
  value: string;
  statusColor?: "green" | "yellow" | "red";
}

function ProfileItem({ icon, title, value, statusColor }: ProfileItemProps) {
  const { darkMode } = useTheme();
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 sm:gap-4 sm:p-4 transition-all duration-300 ${
        darkMode
          ? "border-slate-200 bg-slate-100 hover:bg-slate-200"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      <div
        className={`transition-colors duration-300 ${
          darkMode ? "text-blue-600" : "text-red-500"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p
          className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}
        >
          {title}
        </p>

        {statusColor ? (
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold

    ${
      statusColor === "green"
        ? darkMode
          ? "bg-green-100 text-green-700"
          : "bg-green-500/15 text-green-400"
        : statusColor === "yellow"
          ? darkMode
            ? "bg-yellow-100 text-yellow-700"
            : "bg-yellow-500/15 text-yellow-400"
          : darkMode
            ? "bg-red-100 text-red-700"
            : "bg-red-500/15 text-red-400"
    }

    `}
          >
            {statusColor === "green" ? (
              <CircleCheckBig size={16} />
            ) : statusColor === "yellow" ? (
              <CircleDashed size={16} />
            ) : (
              <CircleX size={16} />
            )}

            {value}
          </div>
        ) : (
          <p
            className={`font-semibold ${
              darkMode ? "text-slate-800" : "text-white"
            }`}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EditProfile({
  open,
  onClose,
  user,
  onSave,
  isSaving = false,
}: EditProfileProps) {
  const { darkMode } = useTheme();
  const [photo, setPhoto] = useState(user.photo);
  const [name, setName] = useState(user.name);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastUserRef = useRef(user);

  /* Reset the form each time the modal opens with fresh user data */
  useEffect(() => {
    if (open && lastUserRef.current !== user) {
      lastUserRef.current = user;

      setPhoto(user.photo);
      setName(user.name);

      setWhatsapp(user.whatsapp ?? "");
    }
  }, [open, user]);

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
      if (typeof reader.result === "string") {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = () => {
    onSave({
      photo,

      name: name.trim() || user.name,

      whatsapp: whatsapp.trim(),
    });
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
                      src={photo}
                      alt={name}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
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

              {/* Grid Card — read only */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2">
                <ProfileItem
                  icon={<BadgeCheck size={18} />}
                  title="Participant ID"
                  value={user.participantId}
                />
                <ProfileItem
                  icon={<Trophy size={18} />}
                  title="Competition"
                  value={user.competition}
                />
                <ProfileItem
                  icon={<Users size={18} />}
                  title="Team"
                  value={user.team}
                />
                <ProfileItem
                  icon={<CreditCard size={18} />}
                  title="Payment"
                  value={user.payment}
                  statusColor="green"
                />
                <ProfileItem
                  icon={<FileText size={18} />}
                  title="Submission"
                  value={user.submission}
                  statusColor="yellow"
                />
                <ProfileItem
                  icon={<CalendarDays size={18} />}
                  title="Next Timeline"
                  value="Technical Meeting • 2026-08-02"
                />
                <ProfileItem
                  icon={<Mail size={18} />}
                  title="Email Status"
                  value="Verified"
                  statusColor="red"
                />
              </div>

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
                      Save Changes
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
