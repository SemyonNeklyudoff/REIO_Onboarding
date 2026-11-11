import type { ReactNode } from 'react';
import { Animated, Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { HomeIndicators } from './HomeIndicators';
import { Icon } from '../onboarding/Icon';
import { PhoneMockupScene } from '../onboarding/scenes/PhoneMockupScene';
import { roomImages } from '../onboarding/scenes/reioUI';
import { SceneMotionContext, useNativeMotion, useReducedMotion, useSceneMotion } from '../onboarding/useMotion';
import type { GuideStep } from './content';
import { getSuppliedComponents, SuppliedComponents } from './SuppliedComponents';

const accent = '#395CF5';
const shots = {
  home: require('../onboarding/assets/reio/home-screen.png'),
  room: require('../onboarding/assets/reio/room-screen.png'),
  utility: require('../onboarding/assets/reio/utility-screen.jpg'),
};
const paidCards = [
  require('../onboarding/assets/reio/payment-room-15-july.png'),
  require('../onboarding/assets/reio/payment-room-13-june.png'),
  require('../onboarding/assets/reio/payment-room-09-may.png'),
];
export function GuidePreview({ step, width }: { step: GuideStep; width: number }) {
  const reduced = useReducedMotion();
  const { context } = useSceneMotion(reduced !== false);
  const supplied = getSuppliedComponents(step);
  const welcome = step.id === 'welcome';
  const chatMockup = step.panel === 'chat' && step.id !== 'chat-events';
  const homeIndicators = step.id === 'home-metrics';
  const screenshot = !supplied && step.shot && step.focus;
  return <SceneMotionContext.Provider value={context}>
    <View style={styles.previewHeader}><Text style={styles.previewCaption}>{supplied || homeIndicators ? 'КОМПОНЕНТЫ ПРИЛОЖЕНИЯ' : screenshot || welcome || chatMockup ? 'ЭКРАН ПРИЛОЖЕНИЯ' : 'СХЕМА РАЗДЕЛА'}</Text></View>
    <PreviewEntrance>{homeIndicators ? <HomeIndicators /> : welcome || chatMockup ? <GuidePhoneMockup width={width} source={chatMockup ? require('./assets/chat-screen.jpg') : shots.home} label={chatMockup ? 'Чат Hotel Plaza Room 15: переписка, документ и поле сообщения в макете телефона' : 'Главная страница приложения в макете телефона'} /> : supplied ? <SuppliedComponents placements={supplied} width={width} /> : screenshot
      ? <ScreenshotDetail step={step} width={width} />
      : <View style={styles.schema}><PanelContent step={step} width={width - 38} /></View>}
    </PreviewEntrance>
  </SceneMotionContext.Provider>;
}
// Reuse the first onboarding scene, including the device frame and bottom fade.
function GuidePhoneMockup({ width, source, label }: { width: number; source: ImageSourcePropType; label: string }) {
  const reduced = useReducedMotion();
  const progress = useNativeMotion({ duration: 240 });
  const scale = width / 360;
  const height = 420 * scale;
  return <View accessible accessibilityRole="image" accessibilityLabel={label} style={{ width, height, overflow: 'hidden' }}>
    <View style={{ position: 'absolute', width: 360, height: 420, left: (width - 360) / 2, top: (height - 420) / 2, transform: [{ scale }] }}>
      <PhoneMockupScene source={source} progress={progress} reduced={reduced !== false} />
    </View>
  </View>;
}
function PreviewEntrance({ children }: { children: ReactNode }) {
  const entrance = useNativeMotion({ duration: 180 });
  return <Animated.View style={{ opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [5, 0] }) }] }}>{children}</Animated.View>;
}
function ScreenshotDetail({ step, width }: { step: GuideStep; width: number }) {
  const [, y, , h] = step.focus!;
  const height = Math.max(240, Math.min(400, width * 3248 / 1500 * h + 50));
  const imageHeight = width * 3248 / 1500;
  const top = Math.min(0, Math.max(height - imageHeight, height / 2 - (y + h / 2) * imageHeight));
  return <View style={[styles.screenshotWindow, { height }]}>
    <Image source={shots[step.shot!]} resizeMode="contain" style={{ position: 'absolute', top, left: 0, width, height: imageHeight }} accessible accessibilityRole="image" accessibilityLabel={step.title + '. ' + step.route} />
  </View>;
}
function PanelContent({ step, width }: { step: GuideStep; width: number }) {
  const row = (label: string, value?: string) => <View key={label} style={styles.row}><Text style={styles.rowText}>{label}</Text>{value && <Text style={styles.rowValue}>{value}</Text>}</View>;
  const tabs = (labels: string[], selected: string) => <View style={styles.documentTabs}>{labels.map(label => <View key={label} style={[styles.documentTab, label === selected && { backgroundColor: '#FFFFFF' }]}><Text style={{ fontSize: 14, lineHeight: 20, fontWeight: label === selected ? '600' : '400', color: label === selected ? accent : '#657088' }}>{label}</Text></View>)}</View>;
  switch (step.panel) {
    case 'overview': return <>
      <Text style={styles.panelTitle}>Новые возможности</Text>
      {([['grid', 'Удобная навигация', 'Обновлённые страницы и новые разделы «Мои номера» и «Коммунальные расходы».'], ['file', 'Наглядные статусы', 'Добавлены статусы документов и платежей.'], ['chart', 'Больше аналитики', 'Графики и показатели доходности ваших объектов.'], ['settings', 'Обновлённые настройки', 'Настраивайте уведомления и темы приложения.']] as const).map(([icon, title, description]) => <View key={title} style={styles.file}><Icon name={icon} color={accent} size={25} /><View style={{ flex: 1 }}><Text style={styles.rowText}>{title}</Text><Text style={styles.secondary}>{description}</Text></View></View>)}
    </>;
    case 'navigation': return <>
      <Text style={styles.panelTitle}>Ваш личный кабинет</Text><View style={styles.navGrid}>{(['home', 'building', 'chat', 'file', 'grid'] as const).map((icon, i) => <View key={icon} style={styles.navItem}><Icon name={icon} color={i === 0 ? accent : '#778099'} size={23} /><Text style={styles.navText}>{['Главная', 'Мой номер', 'Чаты', 'Документы', 'Ещё'][i]}</Text></View>)}</View>
    </>;
    case 'metrics': return <Text style={styles.panelTitle}>Доходность и загрузка</Text>;
    case 'requests': return <><Text style={styles.panelTitle}>Заявки в УК</Text>{row('Обращение по Room 15', 'В работе')}</>;
    case 'utility': return <>
      <Text style={styles.panelTitle}>Коммунальные расходы</Text>{tabs(['Ждёт оплаты', 'Оплачено'], 'Ждёт оплаты')}
      {[['Room 15', '26 450 ₽'], ['Room 13', '19 552 ₽']].map(([room, sum]) => <View key={room} style={styles.file}><Image source={roomImages.plaza} style={{ width: 48, height: 58, borderRadius: 12 }} accessible={false} /><View style={{ flex: 1 }}><Text style={styles.rowText}>{room}</Text><Text style={styles.secondary}>Plaza Delux · Май 2026</Text><Text style={{ color: '#D53931', fontSize: 14, lineHeight: 21 }}>Ждёт оплаты</Text></View><Text style={styles.rowValue}>{sum}</Text></View>)}
    </>;
    case 'history': return <>
      <Text style={styles.panelTitle}>Коммунальные расходы</Text>{tabs(['Ждёт оплаты', 'Оплачено'], 'Оплачено')}
      {paidCards.map((source, index) => <Image key={index} source={source} resizeMode="contain" style={{ width, height: width * 352 / 1372 }} accessible accessibilityLabel={['Room 15, июль 2026, оплачено 26 450 рублей', 'Room 13, июнь 2026, оплачено 19 552 рубля', 'Room 09, май 2026, оплачено 16 422 рубля'][index]} />)}
    </>;
    case 'payment': return <><Text style={styles.panelTitle}>Состав платежа</Text>{row('Room 15', '26 450 ₽')}</>;
    case 'reports': return <>
      <Text style={styles.panelTitle}>Отчёт по номеру</Text><Text style={styles.secondary}>Hotel Plaza Room 15</Text><View style={styles.status}><Icon name="file" color={accent} /><Text style={styles.statusText}>На согласование</Text></View>
      {row('Отчёт инвестора', 'PDF')}
      <View style={styles.row}><View style={styles.file}><Icon name="download" color={accent} /><Text style={styles.secondary}>Скачать</Text></View><View style={styles.file}><Icon name="share" color={accent} /><Text style={styles.secondary}>Поделиться</Text></View></View>
      <View style={styles.status}><Text style={styles.statusText}>Подробнее</Text><Icon name="chevron" color={accent} size={16} /></View>
    </>;
    case 'rooms': return <><Image source={roomImages.plaza} style={styles.roomPhoto} accessible={false} /><Text style={styles.panelTitle}>Hotel Plaza Room 15</Text></>;
    case 'investment': return <>{row('Текущая стоимость', '1 970 662 ₽')}{row('Ваши инвестиции', '1 422 286 ₽')}</>;
    case 'chart': return <Text style={styles.panelTitle}>Доходность и аналитика</Text>;
    case 'documents': {
      const archive = step.id === 'documents-archive', general = step.id === 'documents-general';
      return <><Text style={styles.panelTitle}>Документы</Text>{tabs(['Текущие', 'Общие', 'Архив'], archive ? 'Архив' : general ? 'Общие' : 'Текущие')}
        <View style={styles.file}><Icon name="file" color={accent} size={28} /><View style={{ flex: 1 }}><Text style={styles.rowText}>{general ? 'Документы по объекту' : 'Отчёт инвестора'}</Text><Text style={styles.secondary}>Hotel Plaza · Room 15</Text><Text style={styles.secondary}>{archive ? 'Документы старше 3 месяцев' : general ? 'Общие материалы УК' : 'Актуальный пакет документов'}</Text></View></View>
        {!archive && !general && <View style={styles.status}><Icon name="file" color={accent} size={18} /><Text style={styles.statusText}>На согласование</Text></View>}
        {step.id === 'documents-approve' && <Text style={styles.secondary}>Откройте и прочитайте отчёт и приложения перед согласованием.</Text>}
      </>;
    }
    case 'chat': return <>
      {step.id === 'room-contact' && <><Text style={styles.secondary}>В карточке номера</Text><View style={styles.documentTabs}>{(['chat', 'plus'] as const).map((icon, index) => <View key={icon} style={[styles.documentTab, { gap: 5, padding: 10 }]}><Icon name={icon} color={accent} size={22} /><Text style={styles.secondary}>{['Чат', 'Создать заявку'][index]}</Text></View>)}</View></>}
      <Text style={styles.panelTitle}>Чат Room 15</Text><Text style={styles.secondary}>Plaza Delux · Управляющая компания</Text>
      <View style={styles.message}><Text style={styles.rowText}>Здравствуйте! Подскажите данные по моему номеру.</Text></View>
      {step.id === 'chat-file' && <View style={[styles.message, styles.file]}><Icon name="file" color={accent} size={26} /><View style={{ flex: 1 }}><Text style={styles.rowText}>Отчёт.pdf</Text><Text style={styles.secondary}>PDF · 240 КБ</Text></View></View>}
      <View style={styles.incoming}><Text style={styles.rowText}>Здравствуйте! Проверим информацию.</Text></View>
      {step.id === 'chat-events' && <View style={styles.status}><Icon name="file" color={accent} size={22} /><View style={{ flex: 1 }}><Text style={styles.statusText}>Новый отчёт на согласование</Text><Text style={styles.secondary}>Документы по Room 15 доступны для просмотра.</Text></View></View>}
      <View style={styles.composer}><Icon name="plus" color={accent} size={22} /><View style={styles.composerField}><Text style={styles.secondary}>Сообщение</Text></View><View style={styles.send}><Icon name="arrowUp" color="#FFFFFF" size={18} /></View></View>
    </>;
    case 'more': return <><Text style={styles.panelTitle}>Ещё</Text>{row('Опросы')}{row('Контакты')}{row('Аналитика')}{row('Счётчики')}<View style={styles.status}><Icon name="help" color={accent} /><Text style={styles.statusText}>Инструкция</Text></View>{row('Профиль')}{row('Настройки')}</>;
    case 'theme': return <><Text style={styles.panelTitle}>Тема приложения</Text><View style={styles.themeGrid}><View style={styles.day}><Icon name="sun" color={accent} size={32} /><Text style={styles.rowText}>Светлая</Text></View><View style={styles.night}><Icon name="moon" color="#DBE3FF" size={32} /><Text style={{ fontSize: 16, color: '#FFFFFF' }}>Тёмная</Text></View></View>{row('Системная', '✓')}</>;
    case 'language': return <><Text style={styles.panelTitle}>Язык приложения</Text>{row('Русский', '✓')}{row('English')}</>;
    case 'notifications': return <><Text style={styles.panelTitle}>Уведомления</Text>{row('Push', 'Включены')}{row('Email', 'Включены')}<Text style={styles.secondary}>События по вашим объектам</Text></>;
    case 'share': return <><View style={styles.file}><Icon name="file" color={accent} size={32} /><View style={{ flex: 1 }}><Text style={styles.rowText}>Отчёт инвестора.pdf</Text><Text style={styles.secondary}>Hotel Plaza · Room 15</Text></View></View><View style={styles.shareGrid}>{(['download', 'share'] as const).map((icon, index) => <View key={icon} style={{ alignItems: 'center', gap: 8 }}><Icon name={icon} size={28} color={accent} /><Text style={styles.rowText}>{['Скачать', 'Поделиться'][index]}</Text></View>)}</View></>;
  }
}
const styles = StyleSheet.create({
  previewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 },
  previewCaption: { fontSize: 12, lineHeight: 18, fontWeight: '600', color: '#657088', letterSpacing: 0.7 },
  schema: { backgroundColor: '#FFFFFF', borderRadius: 24, borderWidth: 1, borderColor: '#E1E6F2', padding: 18, gap: 12 },
  screenshotWindow: { borderRadius: 24, overflow: 'hidden', backgroundColor: '#F2F3F7', borderWidth: 1, borderColor: '#E1E6F2' },
  panelTitle: { color: '#182139', fontSize: 18, lineHeight: 25, fontWeight: '600' },
  secondary: { color: '#657088', fontSize: 14, lineHeight: 21 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, gap: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#E6EAF2' },
  rowText: { color: '#26324A', fontSize: 15, lineHeight: 22, flexShrink: 1 },
  rowValue: { color: '#26324A', fontSize: 15, lineHeight: 22, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  navGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, gap: 3 },
  navItem: { flex: 1, alignItems: 'center', gap: 7 },
  navText: { fontSize: 11, lineHeight: 15, color: '#657088', textAlign: 'center' },
  metricGrid: { flexDirection: 'row', gap: 12 },
  metric: { flex: 1, padding: 14, borderRadius: 18, backgroundColor: '#F2F5FF', gap: 5 },
  bigValue: { fontSize: 26, lineHeight: 34, fontWeight: '700', color: '#17213A' },
  tabRow: { flexDirection: 'row', gap: 8 },
  tab: { flex: 1, padding: 12, backgroundColor: '#F2F3F7', borderRadius: 14, justifyContent: 'center' },
  status: { backgroundColor: '#F0F3FF', flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 14 },
  statusText: { fontSize: 14, lineHeight: 21, color: accent, flexShrink: 1 },
  roomPhoto: { width: '100%', height: 100, borderRadius: 16 },
  legend: { flexDirection: 'row', gap: 16 },
  documentTabs: { flexDirection: 'row', gap: 4, padding: 3, borderRadius: 12, backgroundColor: '#F2F3F7' },
  documentTab: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 44, borderRadius: 10, padding: 3 },
  file: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 12 },
  message: { padding: 12, borderRadius: 16, backgroundColor: '#E8EDFF', marginLeft: 20 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  composerField: { flex: 1, padding: 12, borderRadius: 14, backgroundColor: '#F2F3F7' },
  send: { width: 28, height: 28, borderRadius: 14, backgroundColor: accent, alignItems: 'center', justifyContent: 'center' },
  incoming: { padding: 12, borderRadius: 16, backgroundColor: '#F2F3F7', marginRight: 20 },
  themeGrid: { flexDirection: 'row', borderRadius: 18, overflow: 'hidden' },
  day: { flex: 1, height: 110, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#F1F4FF' },
  night: { flex: 1, height: 110, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#202944' },
  shareGrid: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, borderRadius: 18, backgroundColor: '#F2F5FF' },
});
