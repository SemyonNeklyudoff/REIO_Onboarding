// Shared physics: foreground cards settle quickly; the larger backdrop has more mass.
export const motion = {
  sceneDuration: 1250,
  staggerWindow: 600,
  fadeDuration: 160,
  exitDuration: 70,
  enterDuration: 170,
  card: { stiffness: 440, damping: 32, mass: 0.9 },
  backdrop: { stiffness: 190, damping: 23, mass: 1.15 },
  ring: { stiffness: 155, damping: 21, mass: 1 },
  press: { stiffness: 520, damping: 32, mass: 0.8 },
} as const;
