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
  Pencil,
  Phone,
} from "lucide-react";
import { useTheme } from "../../context/themecontext";
import {
  getPaymentTone,
  getSubmissionTone,
  getEmailStatus,
} from "../../utils/status";

import { useEffect, useState } from "react";
import ProfileItem from "../profile/profileitem";
import type { PaymentStatus, SubmissionStatus } from "../../types/user";
import ProfileAlert from "../profile/profilealert";
import ProfilePreview from "../profile/profilepreview";

interface TimelineData {
  title: string;
  date: string;
}

interface UserData {
  photo: string;
  name: string;
  email: string;

  whatsapp?: string;

  participantId: string;
  competition: string;
  team: string;
  payment: PaymentStatus;
  submission: SubmissionStatus;

  timeline: TimelineData;
}

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  onEdit: () => void;
  user: UserData;
}

export default function ProfileModal({
  open,
  onClose,
  user,
  onLogout,
  onEdit,
}: ProfileModalProps) {
  const { darkMode } = useTheme();
  const [previewPhoto, setPreviewPhoto] = useState(false);
  const emailStatus = getEmailStatus(user.email);

  const getTimelineReminder = () => {
    const today = new Date();

    const eventDate = new Date(user.timeline.date);

    const diffTime = eventDate.getTime() - today.getTime();

    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return null;
    }

    if (daysLeft <= 7) {
      return `${user.timeline.title} starts in ${daysLeft} days`;
    }

    return null;
  };
  const profileAlerts = [
    user.whatsapp === "" && "WhatsApp number has not been added",
    user.payment !== "Paid" && "Payment has not been completed",
    user.submission !== "Submitted" && "Submission has not been uploaded",
    getTimelineReminder(),
  ].filter((alert): alert is string => Boolean(alert));
  
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
          <div className="profile-scroll relative max-h-[calc(92vh-80px)] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
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
              <ProfileAlert alerts={profileAlerts} />
            </div>

            {/* Grid Card */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2 cursor-pointer">
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
                statusColor={getPaymentTone(user.payment)}
              />
              <ProfileItem
                icon={<FileText size={18} />}
                title="Submission"
                value={user.submission}
                statusColor={getSubmissionTone(user.submission)}
              />
              <ProfileItem
                icon={<CalendarDays size={18} />}
                title="Next Timeline"
                value={`${user.timeline.title} • ${user.timeline.date}`}
              />
              <ProfileItem
                icon={<Phone size={18} />}
                title="WhatsApp"
                value={user.whatsapp || "Not set"}
              />

              <ProfileItem
                icon={<Mail size={18} />}
                title="Email Status"
                value={emailStatus.label}
                statusColor={emailStatus.tone}
              />
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => {
                onEdit();
              }}
              className={`mt-8 cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-semibold transition hover:scale-[1.02] sm:gap-3 sm:text-base ${
                darkMode
                  ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                  : "border-white/20 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <Pencil size={18} />
              Edit Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="mt-3 cursor-pointer flex w-full items-center justify-center gap-3 text-sm sm:mt-3 sm:gap-3 sm:text-base rounded-xl bg-linear-to-r from-red-600 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Preview Photo Modal */}
      <ProfilePreview
        open={previewPhoto}
        photo={user.photo}
        name={user.name}
        onClose={() => setPreviewPhoto(false)}
      />
    </AnimatePresence>
  );
}
