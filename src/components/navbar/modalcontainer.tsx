import ProfileModal from "../form/profilemodal";
import EditProfile from "../form/editprofile";
import Toast from "../ui/toast";
import type { PaymentStatus, SubmissionStatus } from "../../types/user";

interface ProfileUser {
  photo: string;

  name: string;

  email: string;

  whatsapp: string;

  participantId: string;

  competition: string;

  team: string;

  payment: PaymentStatus;

  submission: SubmissionStatus;

  timeline: {
    title: string;
    date: string;
  };
}

interface NavbarModalContainerProps {
  profileOpen: boolean;

  editProfileOpen: boolean;

  toast: {
    open: boolean;
    message: string;
  };

  user: ProfileUser;

  onCloseProfile: () => void;

  onLogout: () => void;

  onOpenEditProfile: () => void;

  onCloseEditProfile: () => void;

  onSaveProfile: (data: {
    photo: string;
    name: string;
    whatsapp: string;
  }) => void;

  onCloseToast: () => void;
}
export default function NavbarModalContainer({
  profileOpen,

  editProfileOpen,

  toast,

  user,

  onCloseProfile,

  onLogout,

  onOpenEditProfile,

  onCloseEditProfile,

  onSaveProfile,

  onCloseToast,
}: NavbarModalContainerProps) {
  return (
    <>
      <ProfileModal
        open={profileOpen}
        onLogout={onLogout}
        onClose={onCloseProfile}
        onEdit={onOpenEditProfile}
        user={user}
      />

      <EditProfile
        open={editProfileOpen}
        user={user}
        onClose={onCloseEditProfile}
        onSave={onSaveProfile}
      />

      <Toast open={toast.open} message={toast.message} onClose={onCloseToast} />
    </>
  );
}
