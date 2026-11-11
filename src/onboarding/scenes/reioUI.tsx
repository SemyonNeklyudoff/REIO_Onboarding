import type { ReactNode } from 'react';
import { Animated, Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Line, Circle } from 'react-native-svg';
import { Icon } from '../Icon';
import { useNativeMotion } from '../useMotion';
import { Label, Value, s } from './primitives';

// Translated from REIO/Core/DesignSystem.swift and the corresponding SwiftUI views.
export const reio = { accent: '#395CF5', blue: '#0088FF', green: '#34C759', purple: '#CB30E0', pink: '#FF2D55', orange: '#FF8D28', ink: '#000000', secondary: '#85858B', background: '#F2F2F7', separator: '#E6E6E6', fill: '#F4F4F6' };
export const roomImages = {
  plaza: require('../assets/reio/room_15.png'),
  roskosh: require('../assets/reio/room_24.png'),
  proptech: require('../assets/reio/room_83.png'),
};
export function ReioCard({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[r.card, style]}>{children}</View>;
}
export function ReioChevron() {
  return <View style={r.chevron}><Icon name="chevron" size={12} color={reio.accent} /></View>;
}
export function ReioRoomRow({ title = 'Room 15', subtitle = 'Plaza Delux', image = roomImages.plaza, badge = false }: { title?: string; subtitle?: string; image?: number; badge?: boolean }) {
  return <View style={[s.horizontal, { gap: 12 }]}>
    <Image source={image} style={{ width: 48, height: 48, borderRadius: 16 }} accessible={false} />
    <View style={{ flex: 1, gap: 2 }}><Label style={{ color: reio.ink, fontSize: 15, fontWeight: '600' }}>{title}</Label><Label style={{ color: reio.secondary }}>{subtitle}</Label></View>
    {badge && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: reio.pink }} />}
    <ReioChevron />
  </View>;
}
export function IncomeCard({ monthly = false }: { monthly?: boolean }) {
  return <ReioCard style={{ backgroundColor: monthly ? reio.blue : reio.accent, alignItems: 'center', paddingVertical: 25, borderWidth: 0 }}>
    <View style={[s.horizontal, { gap: 6 }]}><Icon name="trend" size={16} color="#FFFFFF" /><Label style={{ color: '#FFFFFF', fontSize: 14 }}>{monthly ? '+6% от предыдущего месяца' : '+120 тыс. за Март'}</Label></View>
    <Value style={{ fontSize: 38, lineHeight: 48, color: '#FFFFFF', marginTop: 3, letterSpacing: 0.2 }}>{monthly ? '121 921 ₽' : '1 121 921 ₽'}</Value>
    <Label style={{ fontSize: 18, lineHeight: 24, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{monthly ? 'Доход за Март' : 'Получено всего дохода'}</Label>
  </ReioCard>;
}
export function ReioSegments({ labels, active = 0 }: { labels: string[]; active?: number }) {
  return <View style={r.segments}>{labels.map((label, index) => <View key={label} style={[r.segment, index === active && { backgroundColor: '#FFFFFF', shadowColor: '#000000', shadowOpacity: 0.08, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }]}><Label style={{ color: reio.ink, fontWeight: index === active ? '600' : '500', textAlign: 'center' }}>{label}</Label></View>)}</View>;
}
export function ReioHero() {
  return <View style={{ height: 192, overflow: 'hidden', borderRadius: 24 }}>
    <Image source={roomImages.plaza} style={{ width: '100%', height: '100%' }} resizeMode="cover" accessible={false} />
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}><Defs><LinearGradient id="room-shade" x1="0" y1="0" x2="0" y2="1"><Stop offset="0.15" stopColor="#000000" stopOpacity={0} /><Stop offset="1" stopColor="#000000" stopOpacity={0.9} /></LinearGradient></Defs><Rect width="100%" height="100%" fill="url(#room-shade)" /></Svg>
    <View style={{ position: 'absolute', right: 0, top: 14, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: reio.accent, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}><Label style={{ color: '#FFFFFF' }}>до 45% доходность</Label></View>
    <View style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}><Value style={{ fontSize: 23, lineHeight: 29, color: '#FFFFFF', letterSpacing: -0.4 }}>Hotel Plaza Room 15</Value><Label style={{ fontSize: 14, color: '#B9B9BD', marginTop: 5 }}>ВСЕГО ИНВЕСТИЦИЙ</Label><View style={[s.horizontal, { justifyContent: 'space-between' }]}><Label style={{ color: '#FFFFFF', fontWeight: '600' }}>6 712 882 ₽</Label><Label style={{ color: reio.green }}>+18,23 %</Label></View></View>
  </View>;
}
export function ReioChart({ height = 100 }: { height?: number }) {
  const entrance = useNativeMotion({ duration: 850, delay: 140 });
  return <View style={{ height, overflow: 'hidden' }}>
    <Svg width="100%" height={height - 21} viewBox="0 0 284 92" preserveAspectRatio="none">
      {[18, 45, 72].map(y => <Line key={y} x1={0} x2={284} y1={y} y2={y} stroke="#DADAE0" strokeDasharray="2 3" />)}
      <Path d="M0 76L56 67L112 57L168 45L224 50L284 37" stroke={reio.purple} strokeWidth={2} strokeDasharray="4 3" fill="none" />
      <Path d="M0 72L56 60L112 46L168 25L224 34L284 16" stroke={reio.accent} strokeWidth={2.4} fill="none" />
      <Circle cx={168} cy={25} r={4} fill={reio.accent} />
    </Svg>
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: '#FFFFFF', transform: [{ translateX: entrance.interpolate({ inputRange: [0, 1], outputRange: [0, 320] }) }] }]} />
    <View style={[s.horizontal, { justifyContent: 'space-between' }]}>{['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН'].map(month => <Label key={month} style={{ fontSize: 11, lineHeight: 16, color: reio.secondary }}>{month}</Label>)}</View>
  </View>;
}
export const r = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 32, padding: 16, borderWidth: 1, borderColor: '#E9E9ED', shadowColor: '#18274B', shadowOpacity: 0.10, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, elevation: 3 },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '600', color: reio.ink, letterSpacing: -0.45 },
  divider: { height: 1, backgroundColor: reio.separator, marginVertical: 12 },
  chevron: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F3F3F5', alignItems: 'center', justifyContent: 'center' },
  segments: { flexDirection: 'row', padding: 3, borderRadius: 16, backgroundColor: '#EFEFF2' },
  segment: { flex: 1, borderRadius: 13, paddingVertical: 8, justifyContent: 'center' },
  button: { minHeight: 44, borderRadius: 999, backgroundColor: reio.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
});
