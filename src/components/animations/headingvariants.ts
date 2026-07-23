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

  // ⭐ Untuk track marquee
  marqueeContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  } satisfies Variants,

  // ⭐ Untuk setiap logo
  marqueeItem: {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } satisfies Variants,
};
