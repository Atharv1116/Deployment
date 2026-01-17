// Animation timing tokens (milliseconds)
export const ANIMATION_TIMING = {
  fast: 150,
  base: 300,
  slow: 450,
}

// Standard easing curve for smooth, professional feel
export const EASING = [0.25, 0.46, 0.45, 0.94] // custom ease-out

// Page transition variants
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.98 },
}

// Standard container stagger for list items
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

// Button press effect
export const buttonTapVariants = {
  scale: 0.97,
}

// Hover lift effect for cards
export const cardHoverVariants = {
  scale: 1.02,
  y: -4,
}

// HOC to apply prefers-reduced-motion
export const getMotionPreferences = (prefersReduced) => ({
  shouldAnimate: !prefersReduced,
  transition: (duration = ANIMATION_TIMING.base) => ({
    duration: duration / 1000,
    ease: EASING,
  }),
})
