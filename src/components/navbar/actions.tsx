import ThemeSwitcher from "../themeswitcher";
import LanguageSwitcher from "../languageswitcher";
import LoginButton from "../button/login";

import Tooltip from "../ui/tooltip";

import UserProfileButton from "./userprofilebutton";

interface NavbarActionsProps {
  darkMode: boolean;
  profileAlerts: number;

  onProfileClick: () => void;
  onLoginClick: () => void;
}

export default function NavbarActions({
  darkMode,
  profileAlerts,
  onProfileClick,
  onLoginClick,
}: NavbarActionsProps) {
  return (
    <div
      className="
        ml-auto
        flex
        items-center
        gap-1
        sm:gap-2
        overflow-visible
      "
    >
      {/* Theme Switcher */}
      <Tooltip text="Change Theme">
        <ThemeSwitcher />
      </Tooltip>

      {/* Language Switcher */}
      <Tooltip text="Change Language">
        <LanguageSwitcher />
      </Tooltip>

      {/* User Profile */}
      <UserProfileButton
        count={profileAlerts}
        darkMode={darkMode}
        onClick={onProfileClick}
      />

      {/* Login Desktop */}
      <LoginButton onClick={onLoginClick} />
    </div>
  );
}
