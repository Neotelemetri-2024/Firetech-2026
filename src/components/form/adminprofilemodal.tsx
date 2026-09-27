import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Shield,
  Building2,
  LogOut,
  LogIn,
  ZoomIn,
} from "lucide-react";

import { useTheme } from "../../context/themecontext";
import { useEffect, useState } from "react";

import ProfileItem from "../profile/profileitem";
import ProfilePreview from "../profile/profilepreview";

import { getEmailStatus } from "../../utils/status";

interface AdminData {
  avatarUrl: string;
  name: string;
  email: string;
  phone?: string;

  role: string;
  department: string;
}

interface AdminProfileModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onEdit: () => void;
  user: AdminData;
}

export default function AdminProfileModal({
  open,
  onClose,
  user,
  onLogout,
  onLogin,
}: AdminProfileModalProps) {
  const { darkMode } = useTheme();

  const [previewPhoto, setPreviewPhoto] = useState(false);

  const emailStatus = getEmailStatus(user.email);

  const isLoggedIn = Boolean(user.email);

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
          {/* Background Glow */}
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

          {/* Header */}
          <div
            className={`relative flex items-center justify-between border-b px-4 py-4 sm:px-6 sm:py-5 ${
              darkMode ? "border-slate-200" : "border-white/10"
            }`}
          >
            <h2
              className={`text-lg sm:text-xl font-bold ${
                darkMode ? "text-slate-800" : "text-white"
              }`}
            >
              Admin Profile
            </h2>

            <button
              onClick={onClose}
              className={`rounded-full p-2 transition ${
                darkMode ? "hover:bg-slate-200" : "hover:bg-white/10"
              }`}
            >
              <X
                className={`h-5 w-5 ${
                  darkMode ? "text-slate-700" : "text-white"
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="profile-scroll relative max-h-[calc(92vh-80px)] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreviewPhoto(true)}
                  className="group relative block cursor-pointer"
                >
                  <motion.img
                    src={user.avatarUrl}
                    alt={user.name}
                    className={`h-24 w-24 rounded-full border-4 object-cover shadow-xl transition-all duration-300 ${
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

              <h3
                className={`mt-4 text-2xl font-bold ${
                  darkMode ? "text-slate-800" : "text-white"
                }`}
              >
                {user.name}
              </h3>

              <p
                className={`mt-1 text-center text-sm break-all ${
                  darkMode ? "text-slate-500" : "text-slate-300"
                }`}
              >
                {user.email}
              </p>
            </div>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ProfileItem
                icon={<Shield size={18} />}
                title="Role"
                value={user.role}
              />

              <ProfileItem
                icon={<Building2 size={18} />}
                title="Department"
                value={user.department}
              />

              <ProfileItem
                icon={<Phone size={18} />}
                title="WhatsApp"
                value={user.phone || "Not Set"}
              />

              <ProfileItem
                icon={<Mail size={18} />}
                title="Email Status"
                value={emailStatus.label}
                statusColor={emailStatus.tone}
              />
            </div>

            {/* Logout/Login */}
            <button
              onClick={isLoggedIn ? onLogout : onLogin}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-r from-red-600 to-blue-600 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] sm:text-base"
            >
              {isLoggedIn ? (
                <>
                  <LogOut size={18} />
                  Logout
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>

      <ProfilePreview
        open={previewPhoto}
        avatarUrl={user.avatarUrl}
        name={user.name}
        onClose={() => setPreviewPhoto(false)}
      />
    </AnimatePresence>
  );
}
