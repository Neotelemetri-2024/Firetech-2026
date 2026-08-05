import type { Variants } from "framer-motion";

export const headingVariants = {
  // Container untuk section
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } satisfies Variants,

  // Main Heading
  title: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.96,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } satisfies Variants,

  // Subtitle
  subtitle: {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  } satisfies Variants,

  // General Card
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
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } satisfies Variants,

  // Marquee Wrapper
  marqueeContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  } satisfies Variants,

  // Marquee Item
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
