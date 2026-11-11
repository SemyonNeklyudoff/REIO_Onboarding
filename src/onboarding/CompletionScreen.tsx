import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './theme';
import { SceneMotionContext, useReducedMotion, useSceneMotion } from './useMotion';
import { Reveal } from './scenes/primitives';

export type OnboardingCompletionProps = {
  onStart: () => void;
  onReplay: () => void;
  skipped?: boolean;
};

/** Optional completion screen. The host owns the actual application route. */
export function OnboardingCompletion({ onStart, onReplay, skipped = false }: OnboardingCompletionProps) {
  const { fontScale } = useWindowDimensions();
  const preference = useReducedMotion();
  const { progress, context } = useSceneMotion(preference !== false);
  return <SafeAreaView key={fontScale} style={styles.safe}>
    <SceneMotionContext.Provider value={context}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.layout}>
          {preference === null ? <View style={styles.artwork} /> : <Reveal progress={progress} from={{ y: 18, scale: 0.96 }}>
            <Image source={require('./assets/completion-property.png')} style={styles.artwork} resizeMode="contain" accessible={false} />
          </Reveal>}
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.5} style={styles.title}>Приложение REIO</Text>
          <Text style={styles.description}>Ваши инвестиции — под контролем</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Начать пользоваться" onPress={onStart} style={({ pressed }) => [styles.button, pressed && { backgroundColor: '#2E4DDB' }]}>
            <Text style={styles.buttonText}>Начать пользоваться</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Посмотреть онбординг ещё раз" onPress={onReplay} style={({ pressed }) => [styles.replay, pressed && { opacity: 0.6 }]}>
            <Text style={styles.replayText}>Посмотреть ещё раз</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SceneMotionContext.Provider>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 26, paddingVertical: 28 },
  layout: { width: '100%', maxWidth: 380, alignItems: 'center' },
  artwork: { width: 270, height: 240, maxWidth: '100%', alignSelf: 'center' },
  title: { fontSize: 32, lineHeight: 39, fontWeight: '700', color: colors.ink, letterSpacing: -1, textAlign: 'center', marginTop: 17 },
  description: { color: colors.muted, fontSize: 16, lineHeight: 24, textAlign: 'center', marginTop: 13 },
  button: { marginTop: 31, minHeight: 56, width: '100%', borderRadius: 999, backgroundColor: colors.accent, paddingVertical: 16, paddingHorizontal: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 11 },
  buttonText: { color: '#FFFFFF', fontSize: 16, lineHeight: 22, fontWeight: '600', flexShrink: 1, textAlign: 'center' },
  replay: { marginTop: 10, minHeight: 44, paddingHorizontal: 14, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  replayText: { fontSize: 14, color: colors.muted, fontWeight: '500', textAlign: 'center' },
});
