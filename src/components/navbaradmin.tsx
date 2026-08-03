import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import LogoutButton from "./button/logout";
import Tooltip from "./ui/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import FiretechLogo from "../assets/firetech.webp";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "User", href: "/admin/users" },
  { label: "Event", href: "/admin/event" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname.startsWith(href);
}

export default function NavbarAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const aosAttrs = (delay: number) => ({
    "data-aos": "fade-down" as const,
    "data-aos-duration": "600",
    "data-aos-delay": String(delay),
  });

  const trackNavigation = (item: NavItem) => {
    window.dispatchEvent(
      new CustomEvent("admin-navbar-click", {
        detail: {
          label: item.label,
          href: item.href,
          from: location.pathname,
          timestamp: new Date().toISOString(),
        },
      }),
    );
  };

  const handleNavigate = (item: NavItem) => {
    trackNavigation(item);
    setMenuOpen(false);
    navigate(item.href);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    navigate("/dashboard", { replace: true });
  };

  return (
    <header className="relative mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8 lg:px-10">
      <div
        {...aosAttrs(0)}
        className="relative overflow-visible rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.24)] ring-1 ring-white/10 backdrop-blur-md sm:px-5"
      >
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div {...aosAttrs(100)} className="flex min-w-0 items-center gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center">
              <img
                src={FiretechLogo}
                alt="Firetech"
                className="h-14 w-14 object-contain drop-shadow-[0_0_10px_rgba(255,80,80,0.35)]"
              />
            </div>

            <div className="min-w-0 leading-none">
              <h1 className="text-[1.55rem] font-extrabold tracking-tight sm:text-[1.7rem]">
                <span className="text-[#ff4d4d]">FIRE</span>
                <span className="text-[#0ea5e9]">TECH</span>
              </h1>
              <p className="mt-1 text-[0.68rem] font-medium tracking-[0.18em] text-white/65 uppercase">
                Harmonizing Tech and Humanity
              </p>
            </div>
          </div>

          <nav
            {...aosAttrs(200)}
            className="hidden md:block"
            aria-label="Admin navigation"
          >
            <LayoutGroup>
              <ul className="flex items-center gap-6 rounded-full lg:gap-12">
                {navItems.map((item) => {
                  const isActive = isActivePath(location.pathname, item.href);

                  return (
                    <li
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavigate(item)}
                        className="group relative cursor-pointer px-6 py-3 text-sm font-semibold tracking-wide"
                      >
                        {/* Hover Tracker */}
                        {hoveredItem === item.href && !isActive && (
                          <motion.div
                            layoutId="navbar-hover"
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 450,
                              damping: 35,
                              mass: 0.8,
                            }}
                            className="
                  absolute
                  inset-y-0
                  left-1
                  right-1
                  rounded-full
                  border
                  border-white/10
                  bg-white/8
                  backdrop-blur-md
                  shadow-[0_4px_12px_rgba(255,255,255,0.08)]
                "
                          />
                        )}

                        {/* Active Tracker */}
                        {isActive && (
                          <motion.div
                            layoutId="navbar-active"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                            className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-white/30
                  bg-white/20
                  shadow-[0_8px_20px_rgba(255,255,255,0.18)]
                "
                          />
                        )}

                        <span
                          className={`
                relative z-10 transition-all duration-300
                ${
                  isActive
                    ? "text-white"
                    : "text-white/75 group-hover:text-white"
                }
              `}
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </nav>
          <div {...aosAttrs(300)} className="flex items-center gap-2">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/35 bg-white/10 text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-[0_14px_28px_rgba(0,0,0,0.28)] md:hidden"
            >
              {menuOpen ? (
                <X className="h-6 w-6" strokeWidth={2.4} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2.4} />
              )}
            </button>

            <Tooltip text="Logout">
              <LogoutButton
                onClick={handleLogout}
                className="
              border-red-400/40
              bg-red-500/10
              text-red-300
              shadow-[0_10px_24px_rgba(0,0,0,0.22)]
              hover:-translate-y-0.5
              hover:bg-red-500/20
              hover:text-red-200
              hover:shadow-[0_14px_28px_rgba(239,68,68,0.28)]
            "
              />
            </Tooltip>
          </div>
        </div>

        <div
          className={`relative z-10 mt-3 overflow-hidden rounded-3xl border border-white/15 bg-black/20 shadow-[0_16px_30px_rgba(0,0,0,0.18)] transition-all duration-300 md:hidden ${
            menuOpen
              ? "max-h-96 translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <ChevronDown
              className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          <nav className="p-3" aria-label="Admin mobile navigation">
            <ul className="grid gap-2">
              {navItems.map((item) => {
                const isActive = isActivePath(location.pathname, item.href);
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => handleNavigate(item)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold tracking-wide transition ${
                        isActive
                          ? "border-white/30 bg-white/18 text-white shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
                          : "border-white/10 bg-white/5 text-white/85 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
