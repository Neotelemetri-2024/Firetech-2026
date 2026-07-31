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
  LogOut,
  ZoomIn,
  CircleCheckBig,
  CircleDashed,
  CircleX,
} from "lucide-react";
import { useTheme } from "../../context/themecontext";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface UserData {
  photo: string;
  name: string;
  email: string;
  participantId: string;
  competition: string;
  team: string;
  payment: string;
  submission: string;
  timeline: string;
}

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: UserData;
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
    <>
      {/* Card Profile */}
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
    </>
  );
}

export default function ProfileModal({
  open,
  onClose,
  user,
  onLogout,
}: ProfileModalProps) {
  const { darkMode } = useTheme();
  const [previewPhoto, setPreviewPhoto] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {/* Container Modal */}
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
            {/* Title */}
            <h2
              className={`text-lg sm:text-xl font-bold ${darkMode ? "text-slate-800" : "text-white"}`}
            >
              My Profile
            </h2>

            <button
              onClick={onClose}
              className={`rounded-full p-2 ${darkMode ? "hover:bg-slate-200" : "hover:bg-white/10"}`}
            >
              <X
                className={`h-5 w-5 cursor-pointer ${darkMode ? "text-slate-700" : "text-white"}`}
              />
            </button>
          </div>

          {/* Modal */}
          <div className="relative max-h-[calc(92vh-80px)] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col items-center ">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreviewPhoto(true)}
                  className="group relative block cursor-pointer"
                  aria-label={`Preview foto ${user.name}`}
                >
                  <motion.img
                    src={user.photo}
                    alt={user.name}
                    className={`h-24 w-24 sm:h-24 sm:w-24 rounded-full border-4 object-cover shadow-xl transition-all duration-300 ${
                      darkMode
                        ? "border-blue-500 shadow-blue-300/40"
                        : "border-red-500 shadow-red-500/30"
                    }`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-all duration-200 group-hover:bg-black/40">
                    <ZoomIn
                      size={20}
                      className="text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </div>
                </motion.button>
              </div>

              {/* User Name */}
              <h3
                className={`mt-3 text-xl sm:mt-4 sm:text-2xl font-bold ${darkMode ? "text-slate-800" : "text-white"}`}
              >
                {user.name}
              </h3>

              <p
                className={`mt-1 text-center text-xs sm:text-sm break-all ${darkMode ? "text-slate-500" : "text-slate-300"}`}
              >
                {user.email}
              </p>
            </div>

            {/* Grid Card */}
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
                value={user.timeline}
              />
              <ProfileItem
                icon={<Mail size={18} />}
                title="Email Status"
                value="Verified"
                statusColor="red"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="mt-8 cursor-pointer flex w-full items-center justify-center gap-3 text-sm sm:mt-8 sm:gap-3 sm:text-base rounded-xl bg-linear-to-r from-red-600 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Preview Photo Modal */}
      {previewPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPreviewPhoto(false)}
          className="fixed inset-0 z-10000 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <img
              src={user.photo}
              alt={`Foto ${user.name}`}
              className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full rounded-2xl border-4 border-white object-cover shadow-2xl"
            />

            <button
              onClick={() => setPreviewPhoto(false)}
              className="absolute right-2 top-2 rounded-full bg-white p-2 text-slate-800 shadow-lg transition hover:scale-110"
              aria-label="Tutup preview foto"
            >
              <X className="h-5 w-5 cursor-pointer" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
