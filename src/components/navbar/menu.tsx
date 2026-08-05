import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface NavChild {
  label: string;
  hash: string;
}

interface NavItem {
  label: string;
  children?: NavChild[];
}

interface DesktopNavMenuProps {
  navItems: NavItem[];

  darkMode: boolean;

  activeSection: string;

  openDropdown: string | null;

  onDropdownEnter: (label: string) => void;

  onDropdownLeave: () => void;

  onNavClick: (item: NavItem, childHash?: string) => void;

  onDropdownToggle: (label: string) => void;
}

export default function Menu({
  navItems,
  darkMode,
  activeSection,
  openDropdown,
  onDropdownEnter,
  onDropdownLeave,
  onNavClick,
  onDropdownToggle,
}: DesktopNavMenuProps) {
  const isActive = (item: NavItem) =>
    item.label.toLowerCase() === activeSection ||
    (item.children?.some((child) => child.hash === activeSection) ?? false);

  return (
    <ul className="mx-auto hidden md:flex">
      {navItems.map((item) => {
        const hasChildren = !!item.children && item.children.length > 0;

        const isDropdownOpen = openDropdown === item.label;

        const itemActive = isActive(item);

        return (
          <li
            key={item.label}
            className="relative mx-1"
            onMouseEnter={() => onDropdownEnter(item.label)}
            onMouseLeave={onDropdownLeave}
          >
            <a
              onClick={(e) => {
                e.preventDefault();

                if (hasChildren) {
                  onDropdownToggle(item.label);
                } else {
                  onNavClick(item);
                }
              }}
              className={`
  group relative inline-flex
  items-center gap-1
  rounded-full px-6 py-2
  text-sm font-semibold
  cursor-pointer

  border
  border-transparent

  transition-all duration-300

  ${
    darkMode
      ? `
        hover:border-slate-300
        hover:bg-slate-100
        hover:text-slate-900
      `
      : `
        hover:border-white/30
        hover:bg-white/10
        hover:text-white
      `
  }

  ${
    itemActive
      ? darkMode
        ? "text-blue-700"
        : "text-red-700"
      : darkMode
        ? "text-black"
        : "text-white"
  }
`}
            >
              {itemActive && (
                <motion.div
                  layoutId="navbar-underline"
                  className={`
                  absolute
                  -bottom-1
                  left-1/2
                  h-0.5 w-12
                  -translate-x-1/2
                  rounded-full

                  ${
                    darkMode
                      ? "bg-linear-to-r from-blue-700 to-blue-600"
                      : "bg-linear-to-r from-red-700 to-red-600"
                  }
              `}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                {itemActive && (
                  <motion.span
                    layoutId={`dot-${item.label}`}
                    className={`
        absolute
        -top-3
        left-1/2
        -translate-x-1/2

        h-2 w-2
        rounded-full

        ${darkMode ? "bg-blue-600" : "bg-red-600"}
      `}
                  />
                )}

                {item.label}

                {hasChildren && (
                  <ChevronDown
                    className={`
                    h-3.5 w-3.5
                    transition-transform

                    ${isDropdownOpen ? "rotate-180" : ""}
                  `}
                  />
                )}
              </span>
            </a>

            <AnimatePresence>
              {hasChildren && isDropdownOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  className={`
                    absolute left-1/2
                    -translate-x-1/2
                    top-full mt-2
                    min-w-50
                    rounded-xl
                    border p-1.5
                    shadow-xl

                    ${
                      darkMode
                        ? "bg-white border-slate-200"
                        : "bg-black border-white/15"
                    }
                  `}
                >
                  {item.children!.map((child) => {
                    const isChildActive = activeSection === child.hash;

                    return (
                      <a
                        key={child.hash}
                        onClick={(e) => {
                          e.preventDefault();

                          onNavClick(item, child.hash);
                        }}
                        className={`
        flex items-center gap-3
        rounded-lg
        px-4 py-2.5
        text-sm
        cursor-pointer
        transition-all duration-200

        ${darkMode ? "hover:bg-slate-100" : "hover:bg-white/10"}

        ${
          isChildActive
            ? darkMode
              ? "text-blue-600 font-semibold"
              : "text-red-600 font-semibold"
            : darkMode
              ? "text-black"
              : "text-white"
        }
      `}
                      >
                        <span
                          className={`
                    h-2 w-2 rounded-full transition-all duration-300
                    ${
                      isChildActive
                        ? darkMode
                          ? "bg-blue-600"
                          : "bg-red-600"
                        : darkMode
                          ? "bg-slate-300"
                          : "bg-white/30"
                    }
                  `}
                        />

                        {child.label}
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
