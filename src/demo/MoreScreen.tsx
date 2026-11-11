import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '../onboarding/Icon';

const accent = '#395CF5';
type Item = { title: string; icon: IconName; color: string; onPress?: () => void };
const services: Item[] = [
  { title: 'Опросы', icon: 'receipt', color: '#FF8D28' },
  { title: 'Контакты', icon: 'phone', color: '#34C759' },
  { title: 'Аналитика', icon: 'check', color: '#CB30E0' },
  { title: 'Счётчики', icon: 'chart', color: '#6155F5' },
];
const account: Item[] = [
  { title: 'Профиль', icon: 'person', color: '#BABABA' },
  { title: 'Настройки', icon: 'settings', color: '#BABABA' },
];
const tabs: { title: string; icon: IconName; badge?: string }[] = [
  { title: 'Главная', icon: 'home' },
  { title: 'Мой номер', icon: 'archive' },
  { title: 'Чаты', icon: 'chat', badge: '3' },
  { title: 'Документы', icon: 'file', badge: '1' },
  { title: 'Ещё', icon: 'grid' },
];

export function MoreScreen({ onInstruction, onExit }: { onInstruction: () => void; onExit: () => void }) {
  const insets = useSafeAreaInsets();
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text accessibilityRole="header" style={styles.title}>Ещё</Text>
      <View style={styles.groups}>
        <MenuGroup items={services} />
        <MenuGroup items={[{ title: 'Инструкция', icon: 'help', color: accent, onPress: onInstruction }]} />
        <MenuGroup items={account} />
        <MenuGroup items={[{ title: 'Выйти', icon: 'arrowRight', color: '#DF514C', onPress: onExit }]} />
      </View>
    </ScrollView>
    <View style={[styles.tabs, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {tabs.map((tab, index) => <View key={tab.title} accessible accessibilityLabel={tab.title} accessibilityState={{ selected: index === 4 }} style={styles.tab}>
        <View><Icon name={tab.icon} size={25} color={index === 4 ? accent : '#8E8E93'} strokeWidth={2.2} />{tab.badge && <View style={styles.badge}><Text allowFontScaling={false} style={styles.badgeText}>{tab.badge}</Text></View>}</View>
        <Text maxFontSizeMultiplier={1.2} style={[styles.tabLabel, index === 4 && { color: accent }]}>{tab.title}</Text>
      </View>)}
    </View>
  </SafeAreaView>;
}
function MenuGroup({ items }: { items: Item[] }) {
  return <View style={styles.group}>{items.map(item => {
    const content = <><View style={[styles.iconTile, { backgroundColor: item.color }]}><Icon name={item.icon} size={20} color="#FFFFFF" strokeWidth={2} /></View><Text style={styles.rowTitle}>{item.title}</Text><View style={styles.chevron}><Icon name="chevron" color={accent} size={16} strokeWidth={2} /></View></>;
    return item.onPress
      ? <Pressable key={item.title} testID={item.title === 'Инструкция' ? 'more-instruction' : 'more-exit'} accessibilityRole="button" onPress={item.onPress} style={({ pressed }) => [styles.row, pressed && { backgroundColor: '#E7E9F2' }]}>{content}</Pressable>
      : <View key={item.title} style={styles.row}>{content}</View>;
  })}</View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 28, maxWidth: 600, width: '100%', alignSelf: 'center' },
  title: { fontSize: 34, lineHeight: 42, color: '#000000', fontWeight: '700', letterSpacing: -0.9, marginBottom: 28 },
  groups: { gap: 24 },
  group: { backgroundColor: '#F2F2F7', borderRadius: 24, overflow: 'hidden' },
  row: { minHeight: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 16 },
  iconTile: { width: 26, height: 26, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  rowTitle: { flex: 1, color: '#000000', fontSize: 18, lineHeight: 25, letterSpacing: -0.3 },
  chevron: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#E8E8EF', justifyContent: 'center', alignItems: 'center' },
  tabs: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#DCDCE0', paddingTop: 10, backgroundColor: '#FFFFFF' },
  tab: { flex: 1, alignItems: 'center', gap: 5 },
  tabLabel: { color: '#8E8E93', fontSize: 12, lineHeight: 17 },
  badge: { position: 'absolute', top: -7, right: -9, minWidth: 20, height: 20, paddingHorizontal: 4, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF2D55' },
  badgeText: { fontSize: 13, lineHeight: 17, color: '#FFFFFF' },
});
