import { Animated, Image, View } from 'react-native';
import { Icon } from '../Icon';
import { Backdrop, Label, Reveal, Value, s, type SceneProps } from './primitives';
import { ReioCard, ReioChevron, roomImages, reio, r } from './reioUI';
export function DocumentsScene({ progress }: SceneProps) {
  const approved = progress.interpolate({ inputRange: [0.7, 0.85], outputRange: [0, 1], extrapolate: 'clamp' });
  const pending = progress.interpolate({ inputRange: [0.7, 0.85], outputRange: [1, 0], extrapolate: 'clamp' });
  return <>
    <Backdrop />
    <Reveal progress={progress} at={0.16} style={{ position: 'absolute', top: 110, left: 16, width: 328 }}>
      <Animated.View style={{ opacity: pending }}>
        <ReioCard style={{ backgroundColor: '#F2F2F7' }}>
          <PropertySummary />
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 10, marginTop: 12 }}>
            <View style={[s.horizontal, { justifyContent: 'space-between', marginBottom: 8 }]}><Label style={{ color: reio.secondary }}>Доход за Апрель</Label><Value style={{ fontSize: 22, lineHeight: 29, color: reio.ink }}>19 772 ₽</Value></View>
            {['Отчет инвестора №C789D', 'Приложение №C789D', 'Приложение №C789D'].map((title, i) => <View key={i} style={[s.horizontal, { gap: 7, paddingVertical: 3 }]}><Icon name="file" color={reio.accent} size={17} /><Label style={{ color: reio.ink }}>{title}</Label></View>)}
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}><View style={[r.button, { flex: 1 }]}><Label style={{ color: '#FFFFFF', fontWeight: '600' }}>Согласовать</Label></View><View style={[r.button, { flex: 1, backgroundColor: '#E5E5EA' }]}><Label style={{ color: reio.ink, fontWeight: '600' }}>Отклонить</Label></View></View>
        </ReioCard>
      </Animated.View>
      <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: approved }}><ReioCard style={{ backgroundColor: '#F2F2F7' }}><View style={[s.horizontal, { gap: 8 }]}><View style={{ flex: 1 }}><PropertySummary approved /></View><ReioChevron /></View></ReioCard></Animated.View>
    </Reveal>
    <Animated.View style={{ position: 'absolute', top: 255, left: 28, width: 304, opacity: approved }}><ReioCard style={{ padding: 12, borderRadius: 24 }}><View style={[s.horizontal, { gap: 10 }]}><View style={{ width: 43, height: 43, borderRadius: 22, backgroundColor: reio.accent, alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={20} color="#FFFFFF" /></View><View style={{ flex: 1 }}><Label style={{ color: reio.ink, fontSize: 16, fontWeight: '600' }}>Успешно!</Label><Label style={{ color: reio.secondary }}>Документы согласованы</Label></View></View></ReioCard></Animated.View>
  </>;
}
function PropertySummary({ approved = false }: { approved?: boolean }) {
  return <View style={[s.horizontal, { gap: 10 }]}><Image source={roomImages.plaza} style={{ width: 44, height: 44, borderRadius: 14 }} accessible={false} /><View style={{ flex: 1 }}><Label style={{ color: reio.ink, fontSize: 15, fontWeight: '600' }}>Hotel Plaza Room 15</Label><Label style={{ color: reio.accent, fontSize: 14 }}>{approved ? '✓ Согласованы: 3 документа' : 'На согласование: 3 документа'}</Label><Label style={{ color: reio.secondary }}>Апрель 2026</Label></View></View>;
}
