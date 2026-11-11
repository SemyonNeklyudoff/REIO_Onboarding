import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, AppState, Easing } from 'react-native';
import { motion } from './motion';
import { createMotionScope } from './motionScope';

type MotionScope = ReturnType<typeof createMotionScope>;
const fadeEasing = Easing.out(Easing.cubic);
export const SceneMotionContext = createContext<{ scope: MotionScope | null; reduced: boolean }>({ scope: null, reduced: true });

type NativeMotionOptions = {
  delay?: number;
  duration?: number;
  spring?: { stiffness: number; damping: number; mass: number };
  easing?: (value: number) => number;
};

function useScopedValue(scope: MotionScope | null, reduced: boolean, { delay = 0, duration = motion.fadeDuration, spring, easing = fadeEasing }: NativeMotionOptions) {
  const value = useRef(new Animated.Value(reduced ? 1 : 0)).current;
  useEffect(() => {
    if (reduced || !scope) { value.setValue(1); return; }
    value.setValue(0);
    const animation = spring
      ? Animated.spring(value, { toValue: 1, ...spring, delay, restDisplacementThreshold: 0.001, restSpeedThreshold: 0.01, isInteraction: false, useNativeDriver: true })
      : Animated.timing(value, { toValue: 1, duration, delay, easing, isInteraction: false, useNativeDriver: true });
    return scope.run(animation, () => value.setValue(1));
  }, [scope, reduced, delay, duration, spring, easing, value]);
  return value;
}

export function useNativeMotion(options: NativeMotionOptions) {
  const { scope, reduced } = useContext(SceneMotionContext);
  return useScopedValue(scope, reduced, options);
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState<boolean | null>(null);
  useEffect(() => {
    let mounted = true;
    let changed = false;
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', value => {
      changed = true;
      if (mounted) setReduced(value);
    });
    AccessibilityInfo.isReduceMotionEnabled().then(value => {
      if (mounted && !changed) setReduced(value);
    }).catch(() => { if (mounted && !changed) setReduced(true); });
    return () => { mounted = false; subscription.remove(); };
  }, []);
  return reduced;
}

export function useSceneMotion(reduced: boolean) {
  const scope = useRef<MotionScope | null>(null);
  if (!scope.current) scope.current = createMotionScope(AppState.currentState === 'active');
  const controller = scope.current;
  const progress = useScopedValue(controller, reduced, { duration: motion.sceneDuration, easing: Easing.linear });
  useLayoutEffect(() => {
    // Layout setup precedes descendant passive effects, including a StrictMode remount.
    controller.activate(AppState.currentState === 'active');
    const subscription = AppState.addEventListener('change', state => {
      controller.setActive(state === 'active');
    });
    return () => { controller.dispose(); subscription.remove(); };
  }, [controller]);
  const context = useMemo(() => ({ scope: controller, reduced }), [controller, reduced]);
  return { progress, context };
}
