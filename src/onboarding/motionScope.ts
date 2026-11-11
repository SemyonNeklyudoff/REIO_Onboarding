type Animation = {
  start: (callback?: (result: { finished: boolean }) => void) => void;
  stop: () => void;
};

/** Owns every native animation in one mounted scene, including delayed ones. */
export function createMotionScope(initiallyActive: boolean) {
  let active = initiallyActive;
  let disposed = false;
  const entries = new Set<{ animation: Animation; settle: () => void }>();
  return {
    activate(value: boolean) {
      disposed = false;
      active = value;
    },
    run(animation: Animation, settle: () => void) {
      if (disposed) return () => {};
      if (!active) { settle(); return () => {}; }
      const entry = { animation, settle };
      entries.add(entry);
      animation.start(() => entries.delete(entry));
      return () => { entries.delete(entry); animation.stop(); };
    },
    setActive(value: boolean) {
      active = value;
      if (active || disposed) return;
      const pending = [...entries];
      entries.clear();
      for (const entry of pending) {
        entry.animation.stop();
        entry.settle();
      }
    },
    dispose() {
      disposed = true;
      const pending = [...entries];
      entries.clear();
      for (const entry of pending) entry.animation.stop();
    },
  };
}
