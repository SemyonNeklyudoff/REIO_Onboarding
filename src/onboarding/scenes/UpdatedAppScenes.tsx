import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Icon } from '../Icon';
import { PhoneMockupScene, PhoneFrameScene } from './PhoneMockupScene';
import { roomImages } from './reioUI';
import type { SceneProps } from './primitives';

// Native illustrations mirror the supplied screens. They deliberately have no
// touch targets: the onboarding's Next/Back remains the only lesson navigation.
function StatusBar() {
  return <View style={s.status}><Text style={s.time}>12:48</Text><Text style={s.time}>▮▮▮  ▰</Text></View>;
}
function BrandHeader() {
  return <View style={s.brand}><View style={s.logo}><View style={s.logoCenter} /></View><Text style={s.brandTitle}>Proptech Digital Hotel</Text><Icon name="bell" size={14} color="#000000" /></View>;
}
function ReportRow({ room, hotel, approved = false }: { room: string; hotel: string; approved?: boolean }) {
  return <View style={s.report}><Image source={approved ? roomImages.proptech : roomImages.plaza} style={s.reportImage} accessible={false} /><View style={{ flex: 1, gap: 3 }}><Text style={s.roomTitle}>{room} ({hotel})</Text><Text style={[s.reportStatus, { color: approved ? '#34C759' : '#395CF5' }]}>{approved ? '✓ Отчёты согласованы' : 'На согласование: 1 отчёт'}</Text><Text style={s.subtle}>сентябрь 2026 г.</Text></View><View style={{ transform: [{ rotate: '90deg' }] }}><Icon name="chevron" size={10} color="#85858B" /></View></View>;
}
export function MainPageScene(props: SceneProps) {
  return <PhoneMockupScene {...props} source={require('../assets/reio/main-page-updated.png')} />;
}
export function RoomsListScene(props: SceneProps) {
  return <PhoneMockupScene {...props} source={require('../assets/reio/rooms-list-screen.png')} />;
}
export function RoomDetailScene(props: SceneProps) {
  return <PhoneFrameScene {...props}><View style={s.screen}><StatusBar />
    <View style={s.hero}><Image source={roomImages.plaza} style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]} resizeMode="cover" accessible={false} />
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}><Defs><LinearGradient id="room-detail-fade" x1="0" y1="0" x2="0" y2="1"><Stop offset="0.25" stopColor="#000000" stopOpacity={0} /><Stop offset="1" stopColor="#000000" stopOpacity={0.95} /></LinearGradient></Defs><Rect width="100%" height="100%" fill="url(#room-detail-fade)" /></Svg>
      <View style={s.heroCopy}><Text style={s.heroTitle}>Hotel Plaza Room 15</Text><Text style={s.heroContract}>189273986 PDF ↓</Text><View style={s.between}><Text style={s.heroCaption}>НОМЕР ДОГОВОРА</Text><Text style={s.heroGain}>+1 251 555 ₽ · 18,23%</Text></View></View>
    </View>
    <View style={s.quickLinks}>{(['chat', 'plus', 'file'] as const).map((icon, index) => <View key={icon} style={s.quickLink}><Icon name={icon} size={19} color="#000000" /><Text style={s.quickLabel}>{['Чат', 'Создать заявку', 'Документы'][index]}</Text></View>)}</View>
    <View style={s.investment}><Text style={s.cardTitle}>Эффективность инвестиций</Text><View style={s.investmentRow}><View style={s.wallet}><Icon name="archive" size={17} color="#34C759" /></View><View><Text style={s.investmentValue}>1 970 662 ₽</Text><Text style={s.subtle}>Текущая стоимость</Text></View></View><View style={s.investmentRow}><View style={[s.wallet, { backgroundColor: '#DFF8F5' }]}><Icon name="file" size={17} color="#00BFAE" /></View><View><Text style={s.investmentValue}>1 422 286 ₽</Text><Text style={s.subtle}>Ваши инвестиции</Text></View></View></View>
  </View></PhoneFrameScene>;
}
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  status: { height: 31, paddingHorizontal: 15, paddingTop: 9, flexDirection: 'row', justifyContent: 'space-between' },
  time: { color: '#000000', fontSize: 9, fontWeight: '600' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, paddingTop: 4 },
  logo: { width: 21, height: 21, borderRadius: 11, backgroundColor: '#395CF5', borderLeftWidth: 6, borderLeftColor: '#BBD1EA', alignItems: 'center', justifyContent: 'center' },
  logoCenter: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#FFFFFF', marginLeft: -4 },
  brandTitle: { fontSize: 10, color: '#000000', fontWeight: '600', flex: 1 },
  income: { borderRadius: 16, backgroundColor: '#395CF5', marginHorizontal: 10, padding: 9, alignItems: 'center', gap: 2, marginBottom: 10 },
  incomeSmall: { color: '#DFE5FF', fontSize: 7, lineHeight: 10 },
  incomeAmount: { color: '#FFFFFF', fontSize: 22, lineHeight: 29, fontWeight: '700' },
  utility: { marginHorizontal: 10, borderRadius: 18, padding: 10, borderWidth: 1, borderColor: '#E3E3E8', backgroundColor: '#FFFFFF', shadowColor: '#000000', shadowOpacity: 0.12, shadowRadius: 3, shadowOffset: { width: 0, height: 3 }, marginBottom: 12 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4 },
  cardTitle: { fontSize: 10, lineHeight: 14, fontWeight: '600', color: '#000000' },
  subtle: { color: '#85858B', fontSize: 8, lineHeight: 12 },
  debtAmount: { color: '#000000', fontWeight: '700', fontSize: 14, lineHeight: 19 },
  debt: { color: '#FF453A', fontSize: 7, lineHeight: 11 },
  pay: { borderRadius: 99, backgroundColor: '#395CF5', paddingVertical: 8, alignItems: 'center', marginTop: 9 },
  payText: { fontSize: 9, lineHeight: 12, fontWeight: '600', color: '#FFFFFF' },
  report: { marginHorizontal: 10, padding: 8, borderWidth: 1, borderColor: '#E3E3E8', borderRadius: 17, flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 7 },
  reportImage: { width: 30, height: 34, borderRadius: 9 },
  roomTitle: { fontSize: 9, lineHeight: 12, color: '#000000', fontWeight: '500' },
  reportStatus: { fontSize: 7, lineHeight: 10, fontWeight: '600' },
  listTitle: { marginHorizontal: 10, marginTop: 7, marginBottom: 8, fontSize: 21, lineHeight: 28, fontWeight: '700', color: '#000000' },
  search: { marginHorizontal: 10, borderWidth: 1, borderColor: '#E3E3E8', borderRadius: 9, padding: 7, flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10, paddingVertical: 6 },
  listImage: { width: 32, height: 32, borderRadius: 6 },
  listChevron: { width: 17, height: 17, borderRadius: 9, backgroundColor: '#F2F3F8', alignItems: 'center', justifyContent: 'center' },
  hero: { height: 187, overflow: 'hidden' },
  heroCopy: { position: 'absolute', left: 10, right: 10, bottom: 12, gap: 5 },
  heroTitle: { color: '#FFFFFF', fontSize: 17, lineHeight: 22, fontWeight: '700' },
  heroContract: { color: '#FFFFFF', fontSize: 10, lineHeight: 14, fontWeight: '600' },
  heroCaption: { color: '#B8B8BE', fontSize: 7, lineHeight: 10 },
  heroGain: { color: '#34C759', fontSize: 8, lineHeight: 11, fontWeight: '600' },
  quickLinks: { flexDirection: 'row', padding: 4, margin: 10, borderRadius: 18, backgroundColor: '#FFFFFF', shadowColor: '#182139', shadowOpacity: 0.12, shadowRadius: 5, shadowOffset: { width: 0, height: 4 }, gap: 3 },
  quickLink: { flex: 1, backgroundColor: '#F2F2F7', borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, gap: 5 },
  quickLabel: { fontSize: 7, lineHeight: 10, color: '#000000' },
  investment: { marginHorizontal: 10, borderWidth: 1, borderColor: '#E3E3E8', borderRadius: 18, padding: 10, gap: 12 },
  investmentRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wallet: { width: 30, height: 30, borderRadius: 16, backgroundColor: '#E6F8EB', alignItems: 'center', justifyContent: 'center' },
  investmentValue: { fontSize: 13, lineHeight: 18, color: '#000000' },
});
