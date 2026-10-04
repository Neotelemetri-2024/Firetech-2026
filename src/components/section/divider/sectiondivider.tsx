import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../../context/themecontext";

import leftDivider from "../../../assets/divider/jaringan.webp";
import rightDivider from "../../../assets/divider/jaringan1.webp";
import leftDividerDark from "../../../assets/divider/jaringan_hitam.webp";
import rightDividerDark from "../../../assets/divider/jaringan1_hitam.webp";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDivider() {
  const { darkMode } = useTheme();
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = dividerRef.current;
    if (!container) return;

    const leftDividerElement = container.querySelector<HTMLImageElement>(
      ".divider-left",
    );
    const rightDividerElement = container.querySelector<HTMLImageElement>(
      ".divider-right",
    );
    if (!leftDividerElement || !rightDividerElement) return;

    const ctx = gsap.context(() => {
      // Muncul saat discroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(leftDividerElement, {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        rightDividerElement,
        {
          x: 120,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "<0.15",
      );

      // Floating kiri
      gsap.to(leftDividerElement, {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating kanan
      gsap.to(rightDividerElement, {
        y: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={dividerRef} className="relative h-72 overflow-hidden">
      {/* Kiri */}
      <img
        src={darkMode ? leftDividerDark : leftDivider}
        alt=""
        className="
          divider-left
          absolute
          left-0
          bottom-0
          w-120
          select-none
          pointer-events-none
        "
      />

      {/* Kanan */}
      <img
        src={darkMode ? rightDividerDark : rightDivider}
        alt=""
        className="
          divider-right
          absolute
          right-0
          bottom-0
          w-120
          select-none
          pointer-events-none
        "
      />
    </div>
  );
}
