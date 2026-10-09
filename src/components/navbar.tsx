import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/themecontext";
import { LayoutGroup } from "framer-motion";
import NavbarBrand from "./navbar/brand";
import DesktopNavMenu from "./navbar/menu";
import NavbarActions from "./navbar/actions";
import MobileMenu from "./navbar/mobilemenu";
import Hamburger from "./navbar/hamburger";
import { useUserProfile } from "../hooks/useUserProfile";
import NavbarModalContainer from "./navbar/modalcontainer";
import { logout } from "../services/auth.services";
import { getMyRegistrations } from "../services/registration.services";
import { navItems, getMainMenu } from "../constants/navbar";
import type { Registration } from "../services/registration.services";
import type { UserRegistrationStatus } from "../types/user";
import type { NavItem } from "../constants/navbar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  const [showAos, setShowAos] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isProgrammaticScrolling, setIsProgrammaticScrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken"),
  );

  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const { user, updateProfile } = useUserProfile();
  const accessToken = isLoggedIn ? localStorage.getItem("accessToken") : null;
  const [registrationData, setRegistrationData] = useState<{
    accessToken: string;
    registrations: Registration[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!accessToken) return;

    const loadRegistrations = () => {
      getMyRegistrations()
        .then((registrations) => {
          if (!cancelled) setRegistrationData({ accessToken, registrations });
        })
        .catch((error) => {
          console.error("Failed to load registrations:", error);
          if (!cancelled) setRegistrationData({ accessToken, registrations: [] });
        });
    };

    const reloadWhenVisible = () => {
      if (document.visibilityState === "visible") loadRegistrations();
    };

    loadRegistrations();
    window.addEventListener("focus", loadRegistrations);
    window.addEventListener("firetech-registration-updated", loadRegistrations);
    document.addEventListener("visibilitychange", reloadWhenVisible);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", loadRegistrations);
      window.removeEventListener(
        "firetech-registration-updated",
        loadRegistrations,
      );
      document.removeEventListener("visibilitychange", reloadWhenVisible);
    };
  }, [accessToken]);

  const registrations =
    accessToken && registrationData?.accessToken === accessToken
      ? registrationData.registrations
      : [];

  const hasRegistration = registrations.length > 0;
  const registrationStatuses = registrations.map(
    (registration): UserRegistrationStatus => {
      const competition =
        registration.competition?.name ??
        `Competition ${registration.competitionId}`;
      const normalizedCompetition = competition.toLowerCase();
      const isHackathon = normalizedCompetition.includes("hackathon");
      const isEFootball = /e[\s-]?football/.test(normalizedCompetition);
      const requiresPayment =
        registration.competition?.requiresPayment ?? !isHackathon;
      const requiresKtm =
        registration.competition?.requiresKtm ?? !isEFootball;
      const usesTeam =
        registration.competition?.type !== undefined
          ? registration.competition.type.toLowerCase() === "team"
          : isHackathon;

      return {
        registrationId: registration.id,
        competition,
        payment:
          registration.paymentStatus === "paid"
            ? "Paid"
            : registration.paymentStatus === "rejected"
              ? "Declined"
              : "Pending",
        submission:
          registration.ktmStatus === "approved"
            ? "Approved"
            : registration.ktmStatus === "rejected"
              ? "Rejected"
              : "Pending",
        requiresPayment,
        requiresKtm,
        usesTeam,
        team: registration.teamName,
      };
    },
  );

  const approvedRegistrations = registrationStatuses.filter(
    (registration) =>
      (!registration.requiresPayment || registration.payment === "Paid") &&
      (!registration.requiresKtm || registration.submission === "Approved"),
  );

  const registrationAlertCount = isLoggedIn
    ? registrationStatuses.reduce(
        (count, registration) =>
          count +
          Number(
            registration.requiresPayment && registration.payment !== "Paid",
          ) +
          Number(
            registration.requiresKtm &&
              registration.submission !== "Approved",
          ),
        0,
      )
    : Number(!user.email) + Number(!user.phone);

  const profileUser = {
    ...user,
    registrationStatuses,
    team:
      registrationStatuses
        .filter(
          (registration): registration is UserRegistrationStatus & { team: string } =>
            registration.usesTeam && Boolean(registration.team),
        )
        .map((registration) => `${registration.team} (${registration.competition})`)
        .join(", ") || "—",
    competition:
      approvedRegistrations
        .map((registration) => registration.competition)
        .join(", ") || "—",
  };

  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeEvent, setActiveEvent] = useState(
    () => sessionStorage.getItem("activeEvent") || "",
  );

  const [activeSection, setActiveSection] = useState(() =>
    sessionStorage.getItem("activeEvent") ? "event" : "home",
  );

  useEffect(() => {
    const handleEventChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setActiveEvent(customEvent.detail);
      setActiveSection("event");
    };

    window.addEventListener("firetech-event-change", handleEventChange);

    return () => {
      window.removeEventListener("firetech-event-change", handleEventChange);
    };
  }, []);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("auth-state-changed", syncAuthState);

    return () => {
      window.removeEventListener("auth-state-changed", syncAuthState);
    };
  }, []);

  useEffect(() => {
    const openProfileModal = () => setProfileOpen(true);
    window.addEventListener("firetech-open-profile-modal", openProfileModal);

    return () => {
      window.removeEventListener(
        "firetech-open-profile-modal",
        openProfileModal,
      );
    };
  }, []);

  const handleSaveProfile = async (data: {
    avatarUrl: string;
    name: string;
    phone: string;
  }) => {
    await updateProfile(data);
  };

  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      setShowAos(false);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrolling) return;

        if (window.scrollY < 150) {
          setActiveSection("home");
          return;
        }

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          setActiveSection(getMainMenu(entry.target.id));

          if (
            ["hackathon", "informaticsolympiad", "ft", "ef", "uiux"].includes(
              entry.target.id,
            )
          ) {
            setActiveEvent(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isProgrammaticScrolling]);

  const handleLoginClick = async () => {
    setMenuOpen(false);

    if (isLoggedIn) {
      try {
        await logout();
      } catch (error) {
        console.error(error);
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      setIsLoggedIn(false);
      window.dispatchEvent(new Event("auth-state-changed"));

      navigate("/", {
        replace: true,
      });

      return;
    }

    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth-state-changed"));
    setProfileOpen(false);

    navigate("/", {
      replace: true,
    });
  };

  const handleNavClick = (item: NavItem, childHash?: string) => {
    const hash = childHash ?? item.label.toLowerCase();

    if (
      ["hackathon", "informaticsolympiad", "ft", "ef", "uiux"].includes(hash)
    ) {
      setActiveEvent(hash);
      sessionStorage.setItem("activeEvent", hash);
      window.dispatchEvent(
        new CustomEvent("firetech-event-change", {
          detail: hash,
        }),
      );
    }

    setActiveSection(getMainMenu(hash));

    if (location.pathname !== "/home") {
      sessionStorage.setItem("scrollTo", hash);
      navigate("/home");
      setOpenDropdown(null);
      return;
    }

    setIsProgrammaticScrolling(true);
    const element = document.getElementById(hash);

    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 140;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsProgrammaticScrolling(false);
      }, 1200);
    } else {
      setIsProgrammaticScrolling(false);
    }

    setOpenDropdown(null);
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
        className={`fixed left-4 right-4 top-6 z-50 w-auto max-w-6xl translate-x-0 md:left-1/2 md:right-auto md:top-8 md:w-full md:-translate-x-1/2 rounded-2xl border-[1.5px] transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "shadow-[0_8px_32px_-6px_rgba(99,102,241,0.2)] backdrop-blur-xl bg-white/80"
              : "shadow-[0_8px_32px_-6px_rgba(236,72,153,0.25)] backdrop-blur-xl bg-black/80"
            : darkMode
              ? "shadow-[0_4px_20px_-4px_rgba(99,102,241,0.12)] backdrop-blur-lg bg-white/70"
              : "shadow-[0_4px_20px_-4px_rgba(236,72,153,0.15)] backdrop-blur-lg bg-black/70"
        } ${darkMode ? "border-slate-300/60 " : "border-white/15"}`}
      >
        <nav className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <NavbarBrand darkMode={darkMode} />

          {/* Desktop Menu */}
          <LayoutGroup>
            <DesktopNavMenu
              navItems={navItems}
              darkMode={darkMode}
              activeSection={activeSection}
              activeEvent={activeEvent}
              openDropdown={openDropdown}
              onDropdownEnter={handleDropdownEnter}
              onDropdownLeave={handleDropdownLeave}
              onDropdownToggle={(label) =>
                setOpenDropdown(openDropdown === label ? null : label)
              }
              onNavClick={handleNavClick}
            />
          </LayoutGroup>

          <NavbarActions
            darkMode={darkMode}
            profileAlerts={registrationAlertCount}
            isLoggedIn={isLoggedIn}
            onProfileClick={() => setProfileOpen(true)}
            onLoginClick={handleLoginClick}
          />

          {/* Mobile Hamburger */}
          <Hamburger
            menuOpen={menuOpen}
            darkMode={darkMode}
            onClick={() => setMenuOpen((v) => !v)}
          />
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          menuOpen={menuOpen}
          navItems={navItems}
          darkMode={darkMode}
          activeSection={activeSection}
          activeEvent={activeEvent}
          mobileExpanded={mobileExpanded}
          isLoggedIn={isLoggedIn}
          onToggleMobileExpand={(label) =>
            setMobileExpanded(mobileExpanded === label ? null : label)
          }
          onNavClick={handleNavClick}
          onLoginClick={handleLoginClick}
        />
      </header>

      <NavbarModalContainer
        profileOpen={profileOpen}
        editProfileOpen={editProfileOpen}
        user={profileUser}
        hasRegistration={hasRegistration}
        onLogout={handleLogout}
        onLogin={handleLoginClick}
        onCloseProfile={() => setProfileOpen(false)}
        onOpenEditProfile={() => setEditProfileOpen(true)}
        onReviewRegistration={(registrationId, competition) => {
          setProfileOpen(false);
          navigate("/home/apply", {
            state: { registrationId, competition, reviewRegistration: true },
          });
        }}
        onCloseEditProfile={() => setEditProfileOpen(false)}
        onSaveProfile={handleSaveProfile}
      />
    </>
  );
}
