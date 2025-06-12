/**
 * Reusable Framer Motion animation configurations for the application
 */

// Container variants for staggered children animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Item variants for elements within a container
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Page transition variants for step changes
export const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2, ease: "easeInOut" },
};

// Button animation variants
export const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.15 } },
  tap: { scale: 0.95, transition: { duration: 0.08 } },
  disabled: { scale: 1, opacity: 0.6 },
};

// Error message animation variants
export const errorVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

// List item animation variants
export const listItemVariants = {
  initial: { opacity: 0, x: -5 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.15, delay: 0.05 },
};
