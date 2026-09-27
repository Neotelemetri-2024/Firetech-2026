import ProfileModal from "../form/profilemodal";
import EditProfile from "../form/editprofile";
import type { PaymentStatus, SubmissionStatus } from "../../types/user";

interface ProfileUser {
  avatarUrl: string;

  name: string;

  email: string;

  phone: string;

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

  user: ProfileUser;

  onCloseProfile: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onOpenEditProfile: () => void;
  onCloseEditProfile: () => void;

  onSaveProfile: (data: {
    avatarUrl: string;
    name: string;
    phone: string;
  }) => Promise<void>;
}
export default function NavbarModalContainer({
  profileOpen,

  editProfileOpen,

  user,

  onCloseProfile,

  onLogout,

  onLogin,

  onOpenEditProfile,

  onCloseEditProfile,

  onSaveProfile,
}: NavbarModalContainerProps) {
  return (
    <>
      <ProfileModal
        open={profileOpen}
        onLogout={onLogout}
        onLogin={onLogin}
        onClose={onCloseProfile}
        onEdit={onOpenEditProfile}
        user={user}
      />

      <EditProfile
        key={`${user.email}-${editProfileOpen}`}
        open={editProfileOpen}
        user={user}
        onClose={onCloseEditProfile}
        onSave={onSaveProfile}
      />
    </>
  );
}
