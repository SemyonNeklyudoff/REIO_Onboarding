import { Animated, Easing, View } from 'react-native';
import { useNativeMotion } from '../useMotion';
import { Icon } from '../Icon';
import { colors } from '../theme';
import { ReioCard, reio, r } from './reioUI';
import { Backdrop, Label, Reveal, s, type SceneProps } from './primitives';

// A finite native timeline keeps composition, attachment and reply distinct.
const chatTiming = { message: 650, attachment: 1100, typing: 1370, reply: 2050, end: 2300 };

function TypingDots({ timeline }: { timeline: Animated.Value }) {
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, height: 17 }}>
    {[0, 1, 2].map(index => {
      const offset = index * 0.035;
      const pulse = timeline.interpolate({
        inputRange: [0, 0.07 + offset, 0.13 + offset, 0.2 + offset, 0.55, 0.63 + offset, 0.69 + offset, 0.76 + offset, 1],
        outputRange: [0, 0, -3, 0, 0, 0, -3, 0, 0],
        extrapolate: 'clamp',
      });
      return <Animated.View key={index} style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.muted, transform: [{ translateY: pulse }] }} />;
    })}
  </View>;
}

export function ChatScene({ progress }: SceneProps) {
  const timeline = useNativeMotion({ duration: chatTiming.end, easing: Easing.linear });
  const composing = timeline.interpolate({ inputRange: [0, 0.07, 0.24, chatTiming.message / chatTiming.end, 1], outputRange: [0, 1, 1, 0, 0] });
  const placeholder = timeline.interpolate({ inputRange: [0, 0.07, 0.24, chatTiming.message / chatTiming.end, 1], outputRange: [1, 0, 0, 1, 1] });
  const replying = timeline.interpolate({ inputRange: [0, chatTiming.typing / chatTiming.end, 0.64, 0.84, chatTiming.reply / chatTiming.end, 1], outputRange: [0, 0, 1, 1, 0, 0] });
  return <>
    <Backdrop />
    <Reveal progress={progress} style={{ position: 'absolute', top: 6, left: 16, width: 328 }}>
      <ReioCard style={{ padding: 0, backgroundColor: '#F5F5F7', overflow: 'hidden' }}>
        <View style={[s.horizontal, { padding: 16, justifyContent: 'space-between', backgroundColor: '#F5F5F7' }]}><View style={r.chevron}><Icon name="arrowLeft" size={16} color={reio.ink} /></View><Label style={{ color: reio.ink, fontSize: 17, fontWeight: '600' }}>Чат Room 15</Label><View style={{ width: 24 }} /></View>
        <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16 }}>
          <Reveal progress={progress} delayMs={chatTiming.message} from={{ x: 18, y: 4, scale: 0.96 }} style={{ alignSelf: 'flex-end', maxWidth: '94%' }}>
            <View style={{ backgroundColor: reio.accent, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 }}><Label style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 21 }}>Здравствуйте! Подскажите{ '\n' }данные по моему номеру.</Label></View>
            <Label style={{ textAlign: 'right', color: reio.secondary, marginTop: 4, fontSize: 12, lineHeight: 16 }}>10:24</Label>
          </Reveal>
          <Reveal progress={progress} delayMs={chatTiming.attachment} from={{ x: 14, y: 3 }} style={{ alignSelf: 'flex-end', marginTop: 10 }}>
            <View style={[s.horizontal, { padding: 10, gap: 12, backgroundColor: reio.accent, borderRadius: 18 }]}><View><Label style={{ color: '#FFFFFF', fontSize: 15 }}>Отчёт.pdf</Label><Label style={{ color: '#E3E8FF', fontSize: 14 }}>PDF · 240 КБ</Label></View><View style={{ backgroundColor: '#6A84F8', borderRadius: 15, padding: 7 }}><Icon name="arrowUp" size={16} color="#FFFFFF" /></View></View>
            <Label style={{ textAlign: 'right', color: reio.secondary, marginTop: 4, fontSize: 12, lineHeight: 16 }}>10:24</Label>
          </Reveal>
          <View style={{ marginTop: 10 }}>
            <Animated.View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, opacity: replying, backgroundColor: '#FFFFFF', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 13 }}><TypingDots timeline={timeline} /></Animated.View>
            <Reveal progress={progress} delayMs={chatTiming.reply} from={{ x: -18, y: 4, scale: 0.96 }} style={{ alignSelf: 'flex-start' }}><View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18 }}><Label style={{ color: reio.ink, fontSize: 15, lineHeight: 21 }}>Здравствуйте! Проверим.</Label></View><Label style={{ color: reio.secondary, marginTop: 4, fontSize: 12, lineHeight: 16 }}>10:25 Управляющая компания</Label></Reveal>
          </View>
        </View>
        <View style={[s.horizontal, { padding: 12, gap: 8, backgroundColor: '#F5F5F7' }]}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}><Icon name="plus" size={20} color={reio.ink} /></View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 22, paddingHorizontal: 12, paddingVertical: 9 }}><Animated.View style={{ opacity: placeholder }}><Label style={{ color: reio.secondary }}>Сообщение</Label></Animated.View><Animated.View style={{ position: 'absolute', left: 12, top: 9, flexDirection: 'row', alignItems: 'center', gap: 7, opacity: composing }}><Label style={{ color: reio.secondary }}>Печатает</Label><TypingDots timeline={timeline} /></Animated.View></View>
          <View style={{ width: 36, height: 36, backgroundColor: reio.accent, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}><Icon name="arrowUp" color="#FFFFFF" size={19} /></View>
        </View>
      </ReioCard>
    </Reveal>
  </>;
}
