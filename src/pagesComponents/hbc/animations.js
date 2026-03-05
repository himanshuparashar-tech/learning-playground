export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export const resultsVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export const buttonTap = { scale: 0.98 };
export const buttonHover = { scale: 1.02 };

export const cardFocusVariants = {
  idle: {
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.08)",
  },
  focused: {
    opacity: 1,
    y: 0,
    scale: 1.02,
    boxShadow:
      "0 12px 32px rgba(102, 126, 234, 0.25), 0 0 0 2px rgba(102, 126, 234, 0.4)",
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const motorCardFocusVariants = {
  idle: {
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: "0 4px 15px rgba(5, 150, 105, 0.08)",
  },
  focused: {
    opacity: 1,
    y: 0,
    scale: 1.02,
    boxShadow:
      "0 12px 32px rgba(5, 150, 105, 0.3), 0 0 0 2px rgba(5, 150, 105, 0.5)",
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
