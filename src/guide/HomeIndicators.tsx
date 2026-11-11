import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '../onboarding/Icon';

// Main-page cards from the supplied review: total income and room occupancy.
// Room-specific yield/ROI belongs in My Numbers and must not appear here.
export function HomeIndicators() {
  return <View style={styles.stack}>
    <View style={styles.income}>
      <View style={styles.growth}><Icon name="trend" color="#FFFFFF" size={17} /><Text style={styles.growthText}>+3% к предыдущему месяцу</Text></View>
      <Text style={styles.amount}>1 836 950 ₽</Text>
      <Text style={styles.incomeCaption}>Совокупный доход за всё время</Text>
    </View>
    <View style={styles.dots}>{[0, 1, 2].map(index => <View key={index} style={[styles.dot, index === 0 && styles.activeDot]} />)}</View>
    <Text style={styles.hint}>Смотрите загрузку по помещениям с Главной страницы.</Text>
    <View style={styles.occupancy}>
      <View style={styles.headingRow}>
        <Text style={styles.title}>Загрузка номера</Text>
        <View style={styles.roomSelector}><Text style={styles.room}>707</Text><View style={{ transform: [{ rotate: '90deg' }] }}><Icon name="chevron" size={14} color="#395CF5" /></View></View>
      </View>
      <Text style={styles.month}>Сентябрь 2026</Text>
      <View style={styles.columns}>
        <OccupancyColumn title="План" subtitle="на месяц" value="24" unit="дня" period="1–4 сентября" />
        <OccupancyColumn title="Факт" subtitle="на 26 сентября" value="25" unit="дней" period="1–26 сентября" />
      </View>
    </View>
  </View>;
}
function OccupancyColumn({ title, subtitle, value, unit, period }: { title: string; subtitle: string; value: string; unit: string; period: string }) {
  return <View style={styles.column}>
    <Text style={styles.columnTitle}>{title}</Text><Text style={styles.small}>{subtitle}</Text>
    <View style={styles.valueRow}><Text style={styles.days}>{value}</Text><Text style={styles.small}>{unit}</Text></View>
    <View style={styles.period}><Icon name="calendar" color="#85858B" size={15} /><Text style={styles.small}>{period}</Text></View>
  </View>;
}
const styles = StyleSheet.create({
  stack: { gap: 12 },
  income: { backgroundColor: '#395CF5', borderRadius: 26, paddingHorizontal: 18, paddingVertical: 24, alignItems: 'center', gap: 8 },
  growth: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' },
  growthText: { fontSize: 14, lineHeight: 20, color: '#FFFFFF', fontWeight: '500', textAlign: 'center' },
  amount: { color: '#FFFFFF', fontSize: 38, lineHeight: 48, fontWeight: '700', letterSpacing: 0.3, textAlign: 'center' },
  incomeCaption: { color: '#C4CEFF', fontSize: 16, lineHeight: 23, fontWeight: '600', textAlign: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D2D3D9' },
  activeDot: { width: 20, backgroundColor: '#395CF5' },
  hint: { fontSize: 15, lineHeight: 22, color: '#657088', marginTop: 6 },
  occupancy: { padding: 14, borderRadius: 26, borderWidth: 1, borderColor: '#E1E2E8', backgroundColor: '#FFFFFF', shadowColor: '#182139', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  title: { color: '#000000', fontSize: 17, lineHeight: 24, fontWeight: '600', flexShrink: 1 },
  roomSelector: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  room: { color: '#395CF5', fontSize: 16, lineHeight: 23, fontWeight: '600' },
  month: { color: '#85858B', fontSize: 14, lineHeight: 21, marginTop: 2, marginBottom: 12 },
  columns: { flexDirection: 'row', gap: 10 },
  column: { flex: 1, minWidth: 0, padding: 12, borderRadius: 18, backgroundColor: '#F5F5F8' },
  columnTitle: { color: '#000000', fontSize: 15, lineHeight: 22, fontWeight: '600' },
  small: { color: '#85858B', fontSize: 13, lineHeight: 19, flexShrink: 1 },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5, marginVertical: 12, flexWrap: 'wrap' },
  days: { color: '#000000', fontSize: 44, lineHeight: 52, fontWeight: '700', letterSpacing: -1 },
  period: { flexDirection: 'row', alignItems: 'flex-start', gap: 5 },
});
