import ProfileModal from "../form/profilemodal";
import EditProfile from "../form/editprofile";
import type { UserRegistrationStatus } from "../../types/user";

interface ProfileUser {
  avatarUrl: string;

  name: string;

  email: string;

  phone: string;

  participantId: string;

  competition: string;

  team: string;

  registrationStatuses: UserRegistrationStatus[];

  timeline: {
    title: string;
    date: string;
  };
}

interface NavbarModalContainerProps {
  profileOpen: boolean;
  editProfileOpen: boolean;

  user: ProfileUser;
  hasRegistration: boolean;

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
  hasRegistration,

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
        hasRegistration={hasRegistration}
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
