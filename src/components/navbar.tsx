import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, UserRound } from "lucide-react";
import { useTheme } from "../context/themecontext";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import FiretechLogo from "../assets/firetech.webp";
import DesktopNavMenu from "./navbar/menu";
import NavbarActions from "./navbar/actions";
import { useUserProfile } from "../hooks/useUserProfile";
import NavbarModalContainer from "./navbar/modalcontainer";

interface NavChild {
  label: string;
  hash: string;
}

interface NavItem {
  label: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "Home" },
  {
    label: "About",
    children: [
      { label: "Firetech", hash: "firetech" },
      { label: "Sponsor", hash: "sponsor" },
      { label: "Partner", hash: "mediapartner" },
      { label: "Countdown", hash: "countdown" },
    ],
  },
  {
    label: "Event",
    children: [
      { label: "Hackathon", hash: "hackathon" },
      { label: "Informatics Olympiad", hash: "informaticsolympiad" },
      { label: "Fast Typing", hash: "ft" },
      { label: "E-Football", hash: "ef" },
      { label: "UI/UX", hash: "uiux" },
    ],
  },
  { label: "Timeline" },
  { label: "FAQ" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  const [showAos, setShowAos] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
  });
  const { user, profileAlerts, updateProfile } = useUserProfile();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();

  const handleSaveProfile = (data: {
    photo: string;
    name: string;
    whatsapp: string;
  }) => {
    updateProfile(data);

    setEditProfileOpen(false);

    setToast({
      open: true,
      message: "Profile updated successfully",
    });
  };

  // Hilangkan data-aos setelah render pertama
  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      setShowAos(false);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Deteksi scroll untuk shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    setMenuOpen(false);
    navigate("/auth");
  };

  const handleLogout = () => {
    setProfileOpen(false);
    navigate("/auth");
  };

  const handleNavClick = (item: NavItem, childHash?: string) => {
    const hash = childHash ?? item.label.toLowerCase();

    const element = document.getElementById(hash);

    if (element) {
      // Section exists in DOM — scroll directly (we're already on /dashboard/Home)
      const y = element.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      // Save target in sessionStorage, then navigate to /dashboard
      // Home.tsx will read sessionStorage and scroll after rendering sections
      sessionStorage.setItem("scrollTo", hash);
      navigate("/dashboard");
    }

    setActiveSection(hash);
    setMenuOpen(false);
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const isActive = (item: NavItem) =>
    item.label.toLowerCase() === activeSection ||
    (item.children?.some((c) => c.hash === activeSection) ?? false);

  return (
    <>
      <header
        {...(showAos
          ? {
              "data-aos": "fade-down",
              "data-aos-duration": "900",
              "data-aos-easing": "ease-in-out",
            }
          : {})}
        className={`fixed left-4 right-4 top-6 z-50 w-auto max-w-5xl translate-x-0 md:left-1/2 md:right-auto md:top-8 md:w-full md:-translate-x-1/2 rounded-2xl border-[1.5px] transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "shadow-[0_8px_32px_-6px_rgba(99,102,241,0.2)] backdrop-blur-xl bg-white/80"
              : "shadow-[0_8px_32px_-6px_rgba(236,72,153,0.25)] backdrop-blur-xl bg-black/80"
            : darkMode
              ? "shadow-[0_4px_20px_-4px_rgba(99,102,241,0.12)] backdrop-blur-lg bg-white/70"
              : "shadow-[0_4px_20px_-4px_rgba(236,72,153,0.15)] backdrop-blur-lg bg-black/70"
        } ${darkMode ? "border-slate-300/60 " : "border-white/15"}`}
      >
        {/* Decorative top gradient line */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 rounded-full transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          } ${
            darkMode
              ? "bg-linear-to-r from-transparent via-red-600 to-transparent"
              : "bg-linear-to-r from-transparent via-blue-600 to-transparent"
          }`}
        />

        <nav className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-0.5 w-26 md:w-32 shrink-0">
            <div className="relative">
              <img
                src={FiretechLogo}
                alt="Firetech Logo"
                className="h-10 w-10 object-contain transition-transform duration-300 hover:scale-110 hover:rotate-[-8deg] cursor-pointer"
              />
              {/* Logo glow effect */}
              <div
                className={`absolute inset-0 rounded-full blur-md -z-10 transition-opacity duration-300 opacity-0 hover:opacity-100 ${
                  darkMode ? "bg-blue-700" : "bg-red-600"
                }`}
              />
            </div>
            <span
              className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                darkMode ? "text-blue-600" : "text-red-700"
              }`}
            >
              Fire
              <span
                className={`transition-colors duration-300 ${
                  darkMode ? "text-red-700" : "text-blue-600"
                }`}
              >
                tech
              </span>
            </span>
          </div>

          {/* Desktop Menu */}
          <LayoutGroup>
            <DesktopNavMenu
              navItems={navItems}
              darkMode={darkMode}
              activeSection={activeSection}
              openDropdown={openDropdown}
              onDropdownEnter={handleDropdownEnter}
              onDropdownLeave={handleDropdownLeave}
              onDropdownToggle={(label) =>
                setOpenDropdown(openDropdown === label ? null : label)
              }
              onNavClick={handleNavClick}
            />
          </LayoutGroup>

          {/* Right side actions */}

          <NavbarActions
            darkMode={darkMode}
            profileAlerts={profileAlerts}
            onProfileClick={() => setProfileOpen(true)}
            onLoginClick={handleLoginClick}
          />

          {/* Mobile Hamburger */}

          <button
            className={`ml-2 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] p-1.5 transition-all duration-300 md:hidden ${
              darkMode
                ? "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
                : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-white hover:text-indigo-600"
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative h-4 w-4">
              <span
                className={`absolute left-0 h-0.5 w-full rounded-full transition-all duration-300 ${
                  darkMode ? "bg-white/80" : "bg-slate-600"
                } ${menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
              />

              <span
                className={`absolute left-0 h-0.5 w-full rounded-full transition-all duration-300 ${
                  darkMode ? "bg-white/80" : "bg-slate-600"
                } ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "top-1/2 -translate-y-1/2"
                }`}
              />

              <span
                className={`absolute left-0 h-0.5 rounded-full transition-all duration-300 ${
                  darkMode ? "bg-white/80" : "bg-slate-600"
                } ${
                  menuOpen
                    ? "bottom-1/2 translate-y-1/2 w-0 opacity-0"
                    : "bottom-0 w-full"
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            menuOpen
              ? "max-h-225 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-3"
          }`}
        >
          <div
            className={`relative mx-4 mb-5 overflow-hidden rounded-3xl border transition-all duration-500 ${
              darkMode
                ? "border-slate-200 bg-white/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,.12)]"
                : " bg-transparent"
            }`}
          >
            {/* Background Glow */}
            <div
              className={`pointer-events-none absolute inset-0 ${
                darkMode
                  ? "bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.18),transparent_45%)]"
                  : "bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.10),transparent_45%)]"
              }`}
            />

            <div className="relative p-4">
              <ul className="space-y-0.5">
                {navItems.map((item, index) => {
                  const isItemActive = isActive(item);
                  const hasChildren =
                    !!item.children && item.children.length > 0;
                  const isMobileOpen = mobileExpanded === item.label;

                  return (
                    <li
                      key={item.label}
                      style={{
                        transitionDelay: menuOpen ? `${index * 60}ms` : "0ms",
                      }}
                      className={`transition-all duration-300 ${
                        menuOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    >
                      <div>
                        <button
                          onClick={() => {
                            if (hasChildren) {
                              setMobileExpanded(
                                isMobileOpen ? null : item.label,
                              );
                            } else {
                              handleNavClick(item);
                            }
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                            isItemActive
                              ? darkMode
                                ? "bg-white/10 text-blue-600"
                                : "bg-indigo-50 text-red-600"
                              : darkMode
                                ? "text-black hover:bg-white/5 hover:text-white"
                                : "text-white hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {/* Dot indicator */}
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                isItemActive
                                  ? darkMode
                                    ? "bg-blue-600 scale-125"
                                    : "bg-red-600 scale-125"
                                  : darkMode
                                    ? "bg-white/20"
                                    : "bg-slate-300"
                              }`}
                            />
                            {item.label}
                          </span>
                          {hasChildren && (
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                isMobileOpen ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {hasChildren && isMobileOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div
                                className="ml-4 mt-1 space-y-0.5 border-l-2 pl-3"
                                style={{
                                  borderColor: darkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.1)",
                                }}
                              >
                                {item.children!.map((child) => {
                                  const isChildActive =
                                    activeSection === child.hash;
                                  return (
                                    <a
                                      key={child.hash}
                                      href={`#${child.hash}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item, child.hash);
                                      }}
                                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                        isChildActive
                                          ? darkMode
                                            ? "bg-black text-blue-600"
                                            : "bg-white text-red-600"
                                          : darkMode
                                            ? "text-black hover:bg-white/5 hover:text-white"
                                            : "text-white hover:bg-slate-50 hover:text-slate-700"
                                      }`}
                                    >
                                      <span
                                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                          isChildActive
                                            ? darkMode
                                              ? "bg-blue-600"
                                              : "bg-red-600"
                                            : darkMode
                                              ? "bg-white/20"
                                              : "bg-slate-300"
                                        }`}
                                      />
                                      {child.label}
                                    </a>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Divider */}
              <div
                className={`my-2 h-px w-full ${
                  darkMode ? "bg-white/10" : "bg-slate-200"
                }`}
              />

              {/* Login Button - Mobile */}
              <button
                type="button"
                onClick={handleLoginClick}
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-r from-red-600 to-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-red-500/20 active:scale-[0.98]"
              >
                <UserRound
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <NavbarModalContainer
        profileOpen={profileOpen}
        editProfileOpen={editProfileOpen}
        toast={toast}
        user={user}
        onLogout={handleLogout}
        onCloseProfile={() => setProfileOpen(false)}
        onOpenEditProfile={() => setEditProfileOpen(true)}
        onCloseEditProfile={() => setEditProfileOpen(false)}
        onSaveProfile={handleSaveProfile}
        onCloseToast={() =>
          setToast({
            open: false,
            message: "",
          })
        }
      />
    </>
  );
}
