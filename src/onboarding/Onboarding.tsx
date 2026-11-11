import { useCallback, useEffect, useRef, useState, type ComponentRef } from 'react';
import {
  AccessibilityInfo, Animated, AppState, BackHandler, Easing, PanResponder, Pressable,
  ScrollView, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pages } from './content';
import { Icon } from './Icon';
import { getNavigationResult, PAGE_COUNT, type NavigationAction } from './navigation';
import { scenes } from './scenes';
import { colors } from './theme';
import { SceneMotionContext, useReducedMotion, useSceneMotion } from './useMotion';
import { motion } from './motion';

export type OnboardingProps = { onComplete: () => void; onSkip: () => void };

export function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const exited = useRef(false);
  const moving = useRef(false);
  const pending = useRef<Animated.CompositeAnimation | null>(null);
  const settleTransition = useRef<(() => void) | null>(null);
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const transition = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const motionPreference = useReducedMotion();
  const reduced = motionPreference !== false;
  const { width, fontScale } = useWindowDimensions();
  const available = Math.min(width - 36, 400);
  const scale = Math.min(1, available / 360);
  const animatePress = (pressed: boolean) => {
    buttonAnimation.current?.stop();
    if (reduced) { buttonScale.setValue(1); return; }
    buttonAnimation.current = pressed
      ? Animated.timing(buttonScale, { toValue: 0.975, duration: 80, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      : Animated.spring(buttonScale, { toValue: 1, ...motion.press, useNativeDriver: true });
    buttonAnimation.current.start();
  };

  const navigate = useCallback((action: NavigationAction) => {
    if (exited.current) return true;
    const result = getNavigationResult(indexRef.current, action);
    if (result.unhandled) return false;
    if (result.exit) {
      if (action !== 'skip' && moving.current) return true;
      exited.current = true;
      pending.current?.stop();
      if (result.exit === 'skip') onSkip();
      else onComplete();
      return true;
    }
    if (moving.current) return true;
    moving.current = true;
    const commit = (forceStill = false) => {
      indexRef.current = result.index;
      setIndex(result.index);
      scroll.current?.scrollTo({ y: 0, animated: false });
      if (reduced || forceStill) { moving.current = false; transition.setValue(1); settleTransition.current = null; return; }
      transition.setValue(0);
      pending.current = Animated.timing(transition, { toValue: 1, duration: motion.enterDuration, easing: Easing.out(Easing.cubic), useNativeDriver: true });
      pending.current.start(() => { moving.current = false; settleTransition.current = null; });
    };
    settleTransition.current = () => commit(true);
    if (reduced) commit();
    else {
      pending.current = Animated.timing(transition, { toValue: 0, duration: motion.exitDuration, useNativeDriver: true });
      pending.current.start(({ finished }) => { if (finished) commit(); });
    }
    return true;
  }, [onComplete, onSkip, reduced, transition]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => navigate('back'));
    return () => subscription.remove();
  }, [navigate]);
  useEffect(() => () => { pending.current?.stop(); buttonAnimation.current?.stop(); }, []);
  useEffect(() => {
    if (reduced) {
      buttonAnimation.current?.stop();
      buttonScale.setValue(1);
      if (moving.current) {
        const settle = settleTransition.current;
        pending.current?.stop();
        settle?.();
      }
    }
  }, [reduced, buttonScale]);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state !== 'active') { buttonAnimation.current?.stop(); buttonScale.setValue(1); }
      if (state !== 'active' && moving.current) {
        const settle = settleTransition.current;
        pending.current?.stop();
        settle?.();
      }
    });
    return () => subscription.remove();
  }, [buttonScale]);
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(`Страница ${index + 1} из ${PAGE_COUNT}. ${pages[index].title.replace('\n', ' ')}`);
  }, [index]);

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const pan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 25 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.8,
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dx) > 65) navigateRef.current(gesture.dx < 0 ? 'next' : 'back');
    },
  })).current;

  const page = pages[index];
  return <SafeAreaView key={fontScale} edges={['top', 'bottom', 'left', 'right']} style={styles.safe}>
    <View style={styles.header}>
      {index === 0 ? <View style={styles.headerSpacer} /> : <Pressable accessibilityRole="button" accessibilityLabel="Предыдущая страница" onPress={() => navigate('back')} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Icon name="arrowLeft" size={22} /></Pressable>}
      <Text style={styles.counter} accessibilityLabel={`Страница ${index + 1} из ${PAGE_COUNT}`} maxFontSizeMultiplier={1.5}>{String(index + 1).padStart(2, '0')}<Text style={{ color: '#B3B8C5' }}> / {String(PAGE_COUNT).padStart(2, '0')}</Text></Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Пропустить онбординг" onPress={() => navigate('skip')} style={({ pressed }) => [styles.skip, pressed && styles.pressed]}><Text style={styles.skipText} maxFontSizeMultiplier={1.4}>Пропустить</Text></Pressable>
    </View>
    <ScrollView ref={scroll} style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} {...pan.panHandlers}>
      <Animated.View style={{ width: '100%', alignItems: 'center', opacity: transition, transform: [{ translateY: reduced ? 0 : transition.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }}>
        <SceneStage key={index} index={index} reduced={reduced} ready={motionPreference !== null} width={available} scale={scale} />
        <View style={styles.copy}>
          <Text style={styles.eyebrow} maxFontSizeMultiplier={1.6}>{page.section}</Text>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.5} style={[styles.title, width < 360 && { fontSize: 29, lineHeight: 35 }]}>{page.title}</Text>
          <Text style={styles.description}>{fontScale > 1.15 || width < 360 ? page.description.replace('\n', ' ') : page.description}</Text>
        </View>
      </Animated.View>
    </ScrollView>
    <View style={styles.footer}>
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
      <Pressable accessibilityRole="button" accessibilityLabel={index === 0 ? 'Познакомиться с возможностями' : 'Далее'} testID="onboarding-next" onPressIn={() => animatePress(true)} onPressOut={() => animatePress(false)} onPress={() => navigate('next')} style={({ pressed }) => [styles.cta, pressed && { backgroundColor: '#2E4DDB' }]}>
        <Text style={styles.ctaText}>{index === 0 ? 'Познакомиться' : 'Далее'}</Text>
      </Pressable>
      </Animated.View>
    </View>
  </SafeAreaView>;
}

function SceneStage({ index, reduced, ready, width, scale }: { index: number; reduced: boolean; ready: boolean; width: number; scale: number }) {
  const { progress, context } = useSceneMotion(reduced);
  const Scene = scenes[index];
  // Mount the scene once its initial motion mode is known, avoiding a final→hidden flash.
  if (!ready) return <View style={{ width, height: 420 * scale }} />;
  return <SceneMotionContext.Provider value={context}><View style={{ width, height: 420 * scale, alignSelf: 'center' }}>
    <View accessible accessibilityRole="image" accessibilityLabel={pages[index].sceneLabel}
      style={{ position: 'absolute', width: 360, height: 420, left: (width - 360) / 2, top: (420 * scale - 420) / 2, transform: [{ scale }] }}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants"><Scene progress={progress} reduced={reduced} /></View>
    </View>
  </View></SceneMotionContext.Provider>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  header: { height: 56, paddingHorizontal: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerSpacer: { width: 86, height: 44 },
  back: { width: 86, height: 44, justifyContent: 'center' },
  skip: { minWidth: 86, minHeight: 44, justifyContent: 'center', alignItems: 'flex-end' },
  skipText: { color: '#70788A', fontSize: 14, fontWeight: '500' },
  counter: { color: colors.ink, fontSize: 14, letterSpacing: 1.7, fontWeight: '600', fontVariant: ['tabular-nums'] },
  pressed: { opacity: 0.55 },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22, paddingTop: 6, paddingBottom: 10 },
  copy: { width: '100%', alignItems: 'center', maxWidth: 440, marginTop: 28 },
  eyebrow: { color: colors.accent, fontSize: 14, lineHeight: 20, letterSpacing: 1.1, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  title: { color: colors.ink, fontSize: 33, lineHeight: 39, letterSpacing: -1.3, fontWeight: '700', textAlign: 'center' },
  description: { color: colors.muted, fontSize: 16, lineHeight: 24, textAlign: 'center', marginTop: 15 },
  footer: { width: '100%', maxWidth: 484, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 15, paddingBottom: 12 },
  cta: { minHeight: 56, borderRadius: 999, backgroundColor: colors.accent, flexDirection: 'row', gap: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14 },
  ctaText: { color: '#FFFFFF', fontSize: 16, lineHeight: 22, fontWeight: '600', letterSpacing: -0.2, flexShrink: 1, textAlign: 'center' },
});
