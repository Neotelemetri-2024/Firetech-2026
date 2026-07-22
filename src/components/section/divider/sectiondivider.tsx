import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import leftDivider from "../../../assets/divider/jaringan.svg";
import rightDivider from "../../../assets/divider/jaringan1.svg";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDivider() {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Muncul saat discroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".divider-left", {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        ".divider-right",
        {
          x: 120,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "<0.15",
      );

      // Floating kiri
      gsap.to(".divider-left", {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating kanan
      gsap.to(".divider-right", {
        y: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, dividerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={dividerRef} className="relative h-32 overflow-hidden">
      {/* Kiri */}
      <img
        src={leftDivider}
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
        src={rightDivider}
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
