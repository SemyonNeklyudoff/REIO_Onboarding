import { StyleSheet, View } from 'react-native';
import { Icon } from '../Icon';
import { Backdrop, Label, Reveal, Value, type SceneProps } from './primitives';

const accent = '#395CF5';
export function SettingsScene({ progress }: SceneProps) {
  return <>
    <Backdrop />
    <Reveal progress={progress} style={styles.theme} from={{ y: 16, scale: 0.95 }}>
      <View style={styles.lightSide}>
        <Label style={styles.caption}>Оформление</Label>
        <View style={styles.sun}><Icon name="sun" size={38} color={accent} strokeWidth={1.6} /></View>
        <Label style={styles.lightLabel}>Светлая</Label>
      </View>
      <View style={styles.darkSide}>
        <View style={styles.auto}><Icon name="monitor" size={13} color="#CED6FF" /><Label style={{ color: '#CED6FF' }}>Авто</Label></View>
        <View style={styles.moon}><Icon name="moon" size={36} color="#DFE5FF" strokeWidth={1.6} /></View>
        <Label style={styles.darkLabel}>Тёмная</Label>
        <View style={[styles.star, { top: 62, right: 24 }]} /><View style={[styles.star, { top: 97, left: 22, width: 3, height: 3 }]} />
      </View>
    </Reveal>
    <Reveal progress={progress} at={0.28} style={styles.language} from={{ x: -12, y: 10, rotate: -3 }}>
      <View style={styles.heading}><Icon name="globe" size={18} color={accent} /><Label style={styles.caption}>Язык</Label></View>
      <View style={styles.letters}><Value style={styles.cyrillic}>А</Value><Value style={styles.latin}>A</Value></View>
      <View style={styles.languageCodes}><Label style={{ color: accent, fontWeight: '600' }}>RU</Label><View style={styles.codeDivider} /><Label style={{ color: '#737B91' }}>EN</Label></View>
    </Reveal>
    <Reveal progress={progress} at={0.52} style={styles.notifications} from={{ x: 12, y: 10, rotate: 3 }}>
      <View style={styles.heading}><Icon name="bell" size={18} color="#FFFFFF" /><Label style={{ color: '#FFFFFF', fontWeight: '600' }}>Уведомления</Label></View>
      <View style={styles.channels}>
        <View style={styles.channel}><Icon name="bell" size={19} color="#FFFFFF" /><Label style={styles.channelText}>Push</Label><View style={styles.notificationDot} /></View>
        <View style={styles.channel}><Icon name="mail" size={19} color="#FFFFFF" /><Label style={styles.channelText}>Email</Label><Icon name="check" size={15} color="#DDE5FF" /></View>
      </View>
    </Reveal>
  </>;
}
const shadow = { shadowColor: '#23345B', shadowOpacity: 0.09, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 3 };
const styles = StyleSheet.create({
  theme: { position: 'absolute', top: 24, left: 18, width: 324, height: 174, borderRadius: 32, flexDirection: 'row', backgroundColor: '#FFFFFF', ...shadow },
  lightSide: { flex: 1, borderTopLeftRadius: 32, borderBottomLeftRadius: 32, borderWidth: 1, borderRightWidth: 0, borderColor: '#E8ECF6', padding: 16, backgroundColor: '#FFFFFF' },
  darkSide: { flex: 1, borderTopRightRadius: 32, borderBottomRightRadius: 32, padding: 16, backgroundColor: '#202944' },
  caption: { color: '#4D5872', fontWeight: '600', fontSize: 14, lineHeight: 20 },
  sun: { width: 66, height: 66, borderRadius: 33, backgroundColor: '#F1F4FF', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 13 },
  moon: { width: 66, height: 66, borderRadius: 33, backgroundColor: '#303B5A', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 13 },
  lightLabel: { color: '#26334E', textAlign: 'center', marginTop: 10 },
  darkLabel: { color: '#DFE5FF', textAlign: 'center', marginTop: 10 },
  auto: { flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'flex-end' },
  star: { position: 'absolute', width: 4, height: 4, borderRadius: 2, backgroundColor: '#A6B5F5' },
  language: { position: 'absolute', left: 18, top: 214, width: 154, height: 138, backgroundColor: '#FFFFFF', borderRadius: 28, borderWidth: 1, borderColor: '#E8ECF6', padding: 16, ...shadow },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  letters: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 5, marginTop: 6 },
  cyrillic: { color: accent, fontSize: 37, lineHeight: 43, letterSpacing: -1.5 },
  latin: { color: '#ACB9EB', fontSize: 30, lineHeight: 38, letterSpacing: -1 },
  languageCodes: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 3 },
  codeDivider: { width: 1, height: 12, backgroundColor: '#DFE5F3' },
  notifications: { position: 'absolute', left: 188, top: 214, width: 154, height: 138, borderRadius: 28, backgroundColor: accent, padding: 14, ...shadow },
  channels: { marginTop: 12, gap: 8 },
  channel: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.13)', borderRadius: 12, paddingHorizontal: 9, height: 31 },
  channelText: { color: '#FFFFFF', flex: 1 },
  notificationDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDE5FF' },
});
