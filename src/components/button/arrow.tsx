import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../../context/themecontext";

export default function ArrowButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll ke atas"
      className={`
        group 
        fixed 
        bottom-6 
        right-6 
        z-50
        inline-flex 
        h-12 
        w-12 
        cursor-pointer 
        items-center 
        justify-center
        rounded-full 
        border-2 
        ${darkMode ? "border-blue-600 bg-blue-600 text-white" : "border-red-600 bg-red-600 text-white"}
        shadow-[0_4px_0_rgba(0,0,0,0.3)]
        transition-all 
        duration-300
        hover:-translate-y-1 
        ${darkMode ? "hover:bg-blue-500 hover:border-blue-500" : "hover:bg-red-500 hover:border-red-500"}
        hover:shadow-[0_6px_0_rgba(0,0,0,0.3)]
        active:translate-y-0 
        active:shadow-[0_2px_0_rgba(0,0,0,0.3)]
        ${darkMode ? "dark:border-blue-600 dark:bg-blue-600 dark:hover:border-blue-500 dark:hover:bg-blue-500" : ""}
        ${
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }
      `}
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
