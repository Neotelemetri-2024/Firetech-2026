import type { Variants } from "framer-motion";

export const headingVariants = {
  title: {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } satisfies Variants,

  subtitle: {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15,
        duration: 0.7,
        ease: "easeOut",
      },
    },
  } satisfies Variants,

  card: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } satisfies Variants,

  // Container untuk Media Partner & Sponsor
  marqueeContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  } satisfies Variants,

  // Item logo Media Partner & Sponsor
  marqueeItem: {
    hidden: {
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
      rotate: -6,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } satisfies Variants,
};
