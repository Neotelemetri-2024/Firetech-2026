import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, UserRound, LogOut } from "lucide-react";
import type { NavItem } from "../../constants/navbar";

interface MobileMenuProps {
  menuOpen: boolean;
  navItems: NavItem[];
  darkMode: boolean;
  activeSection: string;
  activeEvent: string;
  mobileExpanded: string | null;
  isLoggedIn: boolean;
  onToggleMobileExpand: (label: string) => void;
  onNavClick: (item: NavItem, childHash?: string) => void;
  onLoginClick: () => void;
}

export default function MobileMenu({
  menuOpen,
  navItems,
  darkMode,
  activeSection,
  activeEvent,
  mobileExpanded,
  isLoggedIn,
  onToggleMobileExpand,
  onNavClick,
  onLoginClick,
}: MobileMenuProps) {
  const isActive = (item: NavItem) =>
    item.label.toLowerCase() === activeSection;

  const eventHashes = ["hackathon", "informaticsolympiad", "ft", "ef", "uiux"];

  return (
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
              const hasChildren = !!item.children && item.children.length > 0;
              const isMobileOpen =
                item.label === "Event"
                  ? mobileExpanded === "Event" ||
                    eventHashes.includes(activeEvent)
                  : mobileExpanded === item.label;

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
                          onToggleMobileExpand(item.label);
                        } else {
                          onNavClick(item);
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
                              const isChildActive = activeEvent === child.hash;
                              return (
                                <a
                                  key={child.hash}
                                  href={`#${child.hash}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.dispatchEvent(
                                      new CustomEvent("firetech-event-change", {
                                        detail: child.hash,
                                      }),
                                    );
                                    onNavClick(item, child.hash);
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
            onClick={onLoginClick}
            className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-linear-to-r from-red-600 to-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-red-500/20 active:scale-[0.98]"
          >
            {isLoggedIn ? (
              <LogOut
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <UserRound
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            )}

            <span>{isLoggedIn ? "Logout" : "Login"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
