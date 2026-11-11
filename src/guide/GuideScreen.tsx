import { useCallback, useEffect, useMemo, useRef, useState, type ComponentRef } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../onboarding/Icon';
import { chapters, searchGuide } from './content';
import { GuideSectionIcon } from './GuideSectionIcon';
import { GuidePreview } from './GuidePreview';
import { moveGuide, type GuidePosition } from './navigation';

const accent = '#395CF5';
const stepCount = (count: number) => `${count} ${count === 1 ? 'шаг' : count < 5 ? 'шага' : 'шагов'}`;
export function GuideScreen({ onBack }: { onBack: () => void }) {
  const [position, setPosition] = useState<GuidePosition | null>(null);
  const [query, setQuery] = useState('');
  const [viewed, setViewed] = useState<Set<string>>(() => new Set());
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const { width, fontScale } = useWindowDimensions();
  const contentWidth = Math.min(width, 484) - 40;
  const results = useMemo(() => searchGuide(query), [query]);
  const chapter = position ? chapters[position.chapter] : null;
  const step = position ? chapter!.steps[position.step] : null;
  const open = useCallback((next: GuidePosition | null) => {
    setPosition(next);
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, []);
  const markViewed = useCallback(() => {
    if (step) setViewed(previous => new Set(previous).add(step.id));
  }, [step]);
  const next = () => {
    if (!position) return;
    markViewed();
    open(moveGuide(chapters, position, 1));
  };
  const back = useCallback(() => {
    if (position) open(moveGuide(chapters, position, -1));
    else onBack();
  }, [position, onBack, open]);
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => { back(); return true; });
    return () => subscription.remove();
  }, [back]);
  const chapterDone = (index: number) => chapters[index].steps.every(item => viewed.has(item.id));
  const lastInChapter = !!position && position.step === chapter!.steps.length - 1;
  const lastOverall = lastInChapter && position!.chapter === chapters.length - 1;

  return <SafeAreaView key={fontScale} style={styles.safe}>
    <View style={styles.header}>
      <Pressable onPress={() => position ? open(null) : onBack()} accessibilityRole="button" accessibilityLabel={position ? 'К списку тем' : 'Назад в раздел Ещё'} style={styles.headerButton}><Icon name="arrowLeft" color={accent} size={23} /></Pressable>
      <Text style={styles.headerTitle}>Инструкция</Text>
      {position ? <View style={styles.headerButton} /> : <View style={styles.headerButton} />}
    </View>
    <ScrollView ref={scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {!position ? <>
        <View style={styles.search}>
          <Icon name="search" color="#7A849A" size={20} />
          <TextInput testID="guide-search" accessibilityLabel="Поиск по инструкции" value={query} onChangeText={setQuery} placeholder="Например, архив или оплата" placeholderTextColor="#7A849A" returnKeyType="search" style={styles.searchInput} />
          {!!query && <Pressable accessibilityRole="button" accessibilityLabel="Очистить поиск" onPress={() => setQuery('')} style={styles.clear}><Text style={{ fontSize: 22, color: '#657088' }}>×</Text></Pressable>}
        </View>
        {query.trim() ? <>
          <Text accessibilityLiveRegion="polite" style={styles.listCaption}>Найдено: {results.length}</Text>
          {results.length ? results.map(hit => <Pressable key={chapters[hit.chapter].steps[hit.step].id} onPress={() => open(hit)} accessibilityRole="button" style={({ pressed }) => [styles.searchResult, pressed && styles.pressed]}><Text style={styles.resultCategory}>{chapters[hit.chapter].title}</Text><Text style={styles.itemTitle}>{chapters[hit.chapter].steps[hit.step].title}</Text><Text style={styles.resultRoute}>{chapters[hit.chapter].steps[hit.step].route}</Text></Pressable>) : <View style={styles.empty}><Icon name="help" size={30} color={accent} /><Text style={styles.itemTitle}>Ничего не найдено</Text><Text style={styles.body}>Попробуйте название раздела или действия: «документы», «файл», «тема».</Text><Pressable onPress={() => setQuery('')} accessibilityRole="button" style={styles.linkButton}><Text style={styles.link}>Показать все темы</Text></Pressable></View>}
        </> : <>
          <View style={styles.chapterList}>{chapters.map((item, index) => <Pressable key={item.title} testID={`guide-chapter-${index}`} onPress={() => open({ chapter: index, step: 0 })} accessibilityRole="button" accessibilityLabel={`${index + 1}. ${item.title}. ${stepCount(item.steps.length)}${item.isNew ? '. Новый раздел' : ''}${chapterDone(index) ? '. Просмотрено' : ''}`} style={({ pressed }) => [styles.chapter, pressed && styles.pressed]}>
            <View style={styles.chapterIcon}><GuideSectionIcon chapter={index} size={24} /></View>
            <View style={{ flex: 1 }}><Text style={styles.chapterNumber}>{String(index + 1).padStart(2, '0')} / {stepCount(item.steps.length)}</Text><Text style={styles.itemTitle}>{item.title}</Text>{item.isNew && <Text style={styles.newBadge}>Новый раздел</Text>}<Text style={styles.itemSubtitle}>{item.subtitle}</Text></View><Icon name="chevron" color="#9AA4B9" size={16} />
          </Pressable>)}</View>
        </>}
      </> : <>
        <View style={styles.stepMeta}><Text style={styles.listCaption}>{chapter!.title}</Text><Text style={styles.progressText}>Шаг {position.step + 1} из {chapter!.steps.length}</Text></View>
        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${(position.step + 1) / chapter!.steps.length * 100}%` }]} /></View>
        <Text accessibilityRole="header" style={styles.stepTitle}>{step!.title}</Text>
        <View style={styles.route}><GuideSectionIcon chapter={position.chapter} size={20} /><Text style={styles.routeText}>{step!.route}</Text></View>
        <Text style={styles.body}>{step!.body}</Text>
        <View style={styles.preview}><GuidePreview key={step!.id} step={step!} width={contentWidth - 2} /></View>
        {!!step!.note && <View style={styles.result}><Text style={styles.resultBody}>{step!.note}</Text></View>}
        {!!step!.details?.length && <View style={styles.details}>{step!.details!.map(detail => <View key={detail.title} style={styles.detailContent}><Text style={styles.detailTitle}>{detail.title}</Text><Text style={styles.body}>{detail.body}</Text></View>)}</View>}
        {lastInChapter && <Text style={styles.nextTopic}>{lastOverall ? 'Это последний раздел. Можно вернуться к любой теме в оглавлении.' : `Далее: ${chapters[position.chapter + 1].title}`}</Text>}
      </>}
    </ScrollView>
    {position && <View style={styles.footer}>
      <Pressable testID="guide-back" accessibilityRole="button" accessibilityLabel="Предыдущий шаг инструкции" onPress={back} style={styles.contentsButton}><Text style={styles.link}>Назад</Text></Pressable>
      <Pressable testID="guide-next" accessibilityRole="button" onPress={next} style={({ pressed }) => [styles.nextButton, pressed && { backgroundColor: '#2F4EDB' }]}><Text style={styles.nextText}>{lastOverall ? 'К оглавлению' : lastInChapter ? 'Следующий раздел' : 'Далее'}</Text></Pressable>
    </View>}
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, minHeight: 54 },
  headerButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { flex: 1, fontSize: 17, lineHeight: 24, fontWeight: '600', color: '#182139', textAlign: 'center' },
  content: { width: '100%', maxWidth: 484, alignSelf: 'center', padding: 20, paddingBottom: 30 },
  body: { color: '#657088', fontSize: 16, lineHeight: 24 },
  search: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, backgroundColor: '#F3F5FA', paddingLeft: 14, gap: 8 },
  searchInput: { flex: 1, minHeight: 52, fontSize: 15, lineHeight: 21, color: '#172035', paddingVertical: 12, paddingRight: 10 },
  clear: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  listCaption: { fontSize: 13, lineHeight: 19, fontWeight: '600', color: accent, flexShrink: 1 },
  progressText: { fontSize: 13, lineHeight: 19, color: '#657088', flexShrink: 1 },
  chapterList: { gap: 12, marginTop: 20 },
  chapter: { flexDirection: 'row', gap: 12, alignItems: 'center', padding: 16, backgroundColor: '#F6F7FB', borderWidth: 1, borderColor: '#EBEEF6', borderRadius: 22 },
  chapterIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EAF0FF' },
  newBadge: { alignSelf: 'flex-start', color: accent, fontSize: 12, lineHeight: 17, fontWeight: '600', backgroundColor: '#E8EDFF', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3, marginTop: 6 },
  chapterNumber: { color: '#657088', fontSize: 12, lineHeight: 17, marginBottom: 2 },
  itemTitle: { color: '#182139', fontSize: 17, lineHeight: 24, fontWeight: '600' },
  itemSubtitle: { color: '#657088', fontSize: 14, lineHeight: 21, marginTop: 3 },
  pressed: { opacity: 0.65 },
  searchResult: { padding: 16, borderBottomWidth: 1, borderColor: '#EBEEF6', gap: 4 },
  resultCategory: { fontSize: 13, lineHeight: 19, color: accent, marginTop: 6 },
  resultRoute: { fontSize: 14, lineHeight: 21, color: '#657088' },
  empty: { alignItems: 'center', gap: 14, paddingVertical: 36 },
  stepMeta: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  progressTrack: { height: 4, backgroundColor: '#ECF0FA', borderRadius: 2, marginTop: 12, marginBottom: 22, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: accent, borderRadius: 2 },
  stepTitle: { color: '#172035', fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.7 },
  route: { flexDirection: 'row', alignItems: 'flex-start', gap: 7, backgroundColor: '#F0F3FF', borderRadius: 12, padding: 10, marginTop: 14, marginBottom: 15 },
  routeText: { color: '#405791', flex: 1, fontSize: 13, lineHeight: 19 },
  preview: { marginTop: 24 },
  result: { backgroundColor: '#F0F4FF', borderRadius: 20, padding: 16, marginTop: 18 },
  resultBody: { color: '#4D5E82', fontSize: 16, lineHeight: 24, marginTop: 0 },
  linkButton: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'flex-start' },
  link: { color: accent, fontSize: 15, lineHeight: 22, fontWeight: '600' },
  details: { borderTopWidth: 1, borderColor: '#E8ECF4', marginTop: 20, paddingTop: 16 },
  detailContent: { marginBottom: 16, gap: 8 },
  detailTitle: { color: '#263451', fontSize: 16, lineHeight: 23, fontWeight: '600' },
  nextTopic: { color: '#657088', fontSize: 14, lineHeight: 21, marginTop: 18 },
  footer: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10, maxWidth: 484, width: '100%', alignSelf: 'center', borderTopWidth: 1, borderColor: '#EEF0F6' },
  contentsButton: { minHeight: 52, paddingHorizontal: 6, justifyContent: 'center' },
  nextButton: { minHeight: 52, flex: 1, borderRadius: 999, backgroundColor: accent, paddingVertical: 14, paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center' },
  nextText: { color: '#FFFFFF', fontSize: 16, lineHeight: 23, fontWeight: '600', textAlign: 'center' },
});
