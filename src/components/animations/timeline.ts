import { gsap } from "../../utils/gsap";

export const initTimelineAnimation = () => {
  gsap.fromTo(
    "#roadPath",
    {
      strokeDasharray: 4000,
      strokeDashoffset: 4000,
    },
    {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.out",
    },
  );
};
