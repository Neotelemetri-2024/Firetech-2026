import ThemeSwitcher from "../themeswitcher";
import LoginButton from "../button/login";
import Tooltip from "../ui/tooltip";
import UserProfileButton from "./userprofilebutton";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarActionsProps {
  darkMode: boolean;
  profileAlerts: number;
  isLoggedIn: boolean;
  onProfileClick: () => void;
  onLoginClick: () => void;
}

export default function NavbarActions({
  darkMode,
  profileAlerts,
  isLoggedIn,
  onProfileClick,
  onLoginClick,
}: NavbarActionsProps) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = String(user.role || localStorage.getItem("role") || "").toUpperCase();
  const isAdmin = role?.includes("ADMIN") ?? false;

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

      {/* Admin Dashboard Shortcut */}
      {isAdmin && (
        <Tooltip text="Dashboard Admin">
          <button
            type="button"
            aria-label="Dashboard Admin"
            onClick={() => navigate("/admin")}
            className={`
              grid
              h-9 w-9
              sm:h-10 sm:w-10
              cursor-pointer
              place-items-center
              rounded-full
              border-[1.5px]
              transition-all
              duration-300
              hover:scale-110

              ${
                darkMode
                  ? "bg-slate-100 text-red-600 border-slate-300 hover:bg-white hover:text-red-700"
                  : "bg-white/10 text-red-400 border-white/25 hover:bg-white/20 hover:text-red-300"
              }
            `}
          >
            <Shield className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </Tooltip>
      )}

      {/* User Profile */}
      {!isAdmin && (
        <UserProfileButton
          count={profileAlerts}
          darkMode={darkMode}
          onClick={onProfileClick}
        />
      )}

      {/* Login Desktop */}
      <LoginButton isLoggedIn={isLoggedIn} onClick={onLoginClick} />
    </div>
  );
}
