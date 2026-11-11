import type { ReactNode } from 'react';
import { Animated, Easing, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop, Line, Circle } from 'react-native-svg';
import { Icon, type IconName } from '../Icon';
import { cardShadow, colors } from '../theme';
import { motion } from '../motion';
import { useNativeMotion } from '../useMotion';

export type SceneProps = { progress: Animated.Value; reduced: boolean };

export function Reveal({ at = 0, delayMs, children, style, from = {} }: {
  progress: Animated.Value; at?: number; delayMs?: number; children: ReactNode; style?: StyleProp<ViewStyle>;
  from?: { x?: number; y?: number; scale?: number; rotate?: number };
}) {
  const delay = delayMs ?? Math.round(at * motion.staggerWindow);
  const position = useNativeMotion({ delay, spring: motion.card });
  const opacity = useNativeMotion({ delay, duration: motion.fadeDuration });
  return <Animated.View style={[style, {
    opacity,
    transform: [
      { translateX: position.interpolate({ inputRange: [0, 1], outputRange: [from.x ?? 0, 0] }) },
      { translateY: position.interpolate({ inputRange: [0, 1], outputRange: [from.y ?? 16, 0] }) },
      { scale: position.interpolate({ inputRange: [0, 1], outputRange: [from.scale ?? 0.975, 1] }) },
      { rotate: position.interpolate({ inputRange: [0, 1], outputRange: [`${from.rotate ?? 0}deg`, '0deg'] }) },
    ],
  }]}>{children}</Animated.View>;
}

export function Backdrop() {
  const halo = useNativeMotion({ spring: motion.backdrop });
  const orbit = useNativeMotion({ spring: motion.ring, delay: 50 });
  const opacity = useNativeMotion({ duration: 200 });
  return <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity }]}>
    <Animated.View style={[s.halo, { transform: [
      { scale: halo.interpolate({ inputRange: [0, 1], outputRange: [0.84, 1] }) },
      { translateX: halo.interpolate({ inputRange: [0, 1], outputRange: [-14, 0] }) },
      { translateY: halo.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
    ] }]} />
    <Animated.View style={[StyleSheet.absoluteFill, { transform: [
      { rotate: orbit.interpolate({ inputRange: [0, 1], outputRange: ['-14deg', '0deg'] }) },
      { scale: orbit.interpolate({ inputRange: [0, 1], outputRange: [1.1, 1] }) },
    ] }]}>
      <View style={s.ring} />
      <View style={[s.dot, { top: 66, left: 27 }]} />
      <View style={[s.dot, { top: 282, right: 18, width: 5, height: 5 }]} />
      <View style={[s.spark, { top: 21, right: 42 }]}><Icon name="plus" size={16} color="#B7C4FF" /></View>
    </Animated.View>
  </Animated.View>;
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Label({ children, style }: { children: ReactNode; style?: StyleProp<import('react-native').TextStyle> }) {
  return <Text allowFontScaling={false} style={[s.label, style]}>{children}</Text>;
}

export function Value({ children, style }: { children: ReactNode; style?: StyleProp<import('react-native').TextStyle> }) {
  return <Text allowFontScaling={false} style={[s.value, style]}>{children}</Text>;
}

export function IconTile({ name, size = 38, color = colors.accent, background = colors.blueWash }: {
  name: IconName; size?: number; color?: string; background?: string;
}) {
  return <View style={{ width: size, height: size, borderRadius: size * 0.3, backgroundColor: background, alignItems: 'center', justifyContent: 'center' }}>
    <Icon name={name} size={size * 0.52} color={color} />
  </View>;
}

export function Badge({ children, blue = false }: { children: ReactNode; blue?: boolean }) {
  return <View style={[s.badge, blue && { backgroundColor: colors.blueWash }]}>
    <Text allowFontScaling={false} style={[s.badgeText, blue && { color: colors.accent }]}>{children}</Text>
  </View>;
}

export function Row({ icon, title, detail, last = false }: { icon: IconName; title: string; detail?: string; last?: boolean }) {
  return <View style={[s.row, !last && { borderBottomWidth: 1, borderColor: colors.line }]}>
    <Icon name={icon} size={17} color={colors.muted} />
    <Label style={{ flex: 1, color: colors.ink, marginLeft: 9, fontSize: 14 }}>{title}</Label>
    {detail ? <Label style={{ fontSize: 14 }}>{detail}</Label> : <Icon name="chevron" size={13} color="#A1A7B5" />}
  </View>;
}

export function Chart({ progress, comparison = false, variant = false, height = 100 }: { progress: Animated.Value; comparison?: boolean; variant?: boolean; height?: number }) {
  const curve = variant ? 'M0 74C24 74 26 47 52 49S85 65 103 37 131 51 155 27 186 47 211 17 241 28 272 5' : 'M0 73C21 73 25 60 48 63S75 44 96 47 121 62 143 37 169 48 190 26 215 39 235 15 253 23 272 4';
  return <View style={{ height, overflow: 'hidden' }}>
    <Svg width="100%" height={height - 22} viewBox="0 0 272 86" preserveAspectRatio="none" accessible={false}>
      <Defs><LinearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor={colors.accent} stopOpacity={0.14} /><Stop offset="1" stopColor={colors.accent} stopOpacity={0} /></LinearGradient></Defs>
      {[16, 43, 72].map(y => <Line key={y} x1={0} x2={272} y1={y} y2={y} stroke="#ECEFF6" strokeDasharray="3 5" />)}
      {comparison ? <Path d="M0 77C28 70 35 76 60 63S90 54 120 53 149 43 180 42 220 33 272 25" stroke="#BAC5E8" strokeWidth={2} strokeDasharray="5 5" fill="none" /> : null}
      <Path d={`${curve}L272 86H0Z`} fill="url(#chart-fill)" />
      <Path d={curve} stroke={colors.accent} strokeWidth={2.8} strokeLinecap="round" fill="none" />
      <Circle cx={269} cy={6} r={4} fill={colors.accent} stroke="white" strokeWidth={2} />
    </Svg>
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.paper, transform: [{ translateX: progress.interpolate({ inputRange: [0.12, 0.55], outputRange: [0, 310], easing: Easing.out(Easing.cubic), extrapolate: 'clamp' }) }] }]} />
    <View style={s.axis}><Label style={s.axisText}>ЯНВ</Label><Label style={s.axisText}>МАР</Label><Label style={s.axisText}>МАЙ</Label><Label style={s.axisText}>ИЮЛ</Label><Label style={s.axisText}>СЕН</Label></View>
  </View>;
}

export const s = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderRadius: 22, borderWidth: 1, borderColor: '#ECEDF6', padding: 18, ...cardShadow },
  label: { fontSize: 14, lineHeight: 20, color: colors.muted, fontWeight: '500' },
  value: { fontSize: 26, lineHeight: 33, fontWeight: '700', color: colors.ink, letterSpacing: -0.8, fontVariant: ['tabular-nums'] },
  halo: { position: 'absolute', top: 9, left: 13, width: 334, height: 334, borderRadius: 167, backgroundColor: '#F0F3FF' },
  ring: { position: 'absolute', top: 38, left: 42, width: 276, height: 276, borderRadius: 138, borderWidth: 1, borderColor: '#E0E6FF' },
  dot: { position: 'absolute', width: 7, height: 7, borderRadius: 5, backgroundColor: '#C6D0FF' },
  spark: { position: 'absolute' },
  badge: { alignSelf: 'flex-start', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: colors.greenWash },
  badgeText: { color: colors.green, fontSize: 14, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 39 },
  axis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 },
  axisText: { fontSize: 11, lineHeight: 16, letterSpacing: 0.7, color: colors.muted },
  hairline: { height: 1, backgroundColor: colors.line, marginVertical: 12 },
  horizontal: { flexDirection: 'row', alignItems: 'center' },
});
