import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { colors } from '../onboarding/theme';
import { integrationPrompt } from './integrationPrompt';

const steps = [
  ['Откройте основное приложение', 'Откройте его проект в Codex и добавьте рядом исходник этого онбординга: папку onboarding-app или скачанный репозиторий.'],
  ['Скопируйте промпт', 'Вставьте его в чат Codex в проекте основного приложения. Он определит стек и подключит онбординг: для SwiftUI перенесёт нативно, для React Native — готовым модулем.'],
  ['Проверьте подключение', 'Запустите приложение: пройдите обзор, перезапустите приложение и проверьте повторный просмотр в настройках.'],
];

/** Developer handoff lives only in the preview application. */
export function IntegrationScreen({ onReplay }: { onReplay: () => void }) {
  const { fontScale } = useWindowDimensions();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  async function copyPrompt() {
    setStatus('copying');
    try {
      const copied = await Clipboard.setStringAsync(integrationPrompt);
      setStatus(copied ? 'copied' : 'error');
    } catch { setStatus('error'); }
  }
  return <SafeAreaView key={fontScale} style={styles.safe}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.layout}>
        <Text style={styles.eyebrow}>ДЛЯ РАЗРАБОТЧИКА</Text>
        <Text accessibilityRole="header" maxFontSizeMultiplier={1.5} style={styles.title}>Подключите{ '\n' }к приложению.</Text>
        <Text style={styles.description}>Готовые 5 экранов и анимации.{ '\n' }Передайте интеграцию Codex.</Text>
        <View style={styles.steps}>
          {steps.map(([title, detail], index) => <View key={title} style={styles.step}>
            <View style={styles.number}><Text maxFontSizeMultiplier={1.5} style={styles.numberText}>{index + 1}</Text></View>
            <View style={styles.stepBody}><Text style={styles.stepTitle}>{title}</Text><Text style={styles.detail}>{detail}</Text></View>
          </View>)}
        </View>
        <View style={styles.promptCard}>
          <Text accessibilityRole="header" style={styles.stepTitle}>Промпт для Codex</Text>
          <Text selectable style={styles.prompt} numberOfLines={expanded ? undefined : 4}>{integrationPrompt}</Text>
          <Pressable accessibilityRole="button" accessibilityState={{ expanded }} onPress={() => setExpanded(value => !value)} style={styles.expand}>
            <Text style={styles.link}>{expanded ? 'Свернуть промпт' : 'Показать полностью'}</Text>
          </Pressable>
        </View>
        <Text style={styles.note}>Исходник должен быть доступен Codex. Одного промпта без файлов онбординга недостаточно.</Text>
      </View>
    </ScrollView>
    <View style={styles.footer}>
      <Text accessibilityLiveRegion="polite" style={[styles.feedback, status === 'error' && { color: '#B33E3E' }]}>{status === 'copied' ? 'Готово — вставьте в чат Codex' : status === 'error' ? 'Не удалось скопировать. Попробуйте ещё раз.' : ''}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={status === 'copied' ? 'Промпт скопирован. Копировать ещё раз' : 'Копировать промпт'} accessibilityState={{ disabled: status === 'copying' }} disabled={status === 'copying'} onPress={copyPrompt} style={({ pressed }) => [styles.button, pressed && { backgroundColor: '#2E4DDB' }]}>
        <Text style={styles.buttonText}>{status === 'copied' ? 'Промпт скопирован' : status === 'copying' ? 'Копируем…' : 'Копировать промпт'}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onReplay} style={styles.replay}><Text style={styles.secondary}>Посмотреть онбординг ещё раз</Text></Pressable>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 25, paddingTop: 27, paddingBottom: 12, alignItems: 'center' },
  layout: { width: '100%', maxWidth: 480 },
  eyebrow: { fontSize: 14, fontWeight: '600', letterSpacing: 1.5, color: colors.accent },
  title: { marginTop: 13, fontSize: 32, lineHeight: 38, fontWeight: '700', letterSpacing: -1.1, color: colors.ink },
  description: { marginTop: 12, fontSize: 16, lineHeight: 24, color: colors.muted },
  steps: { marginTop: 27, gap: 21 },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  number: { minWidth: 29, minHeight: 29, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: colors.blueWash, alignItems: 'center', justifyContent: 'center' },
  numberText: { color: colors.accent, fontSize: 14, fontWeight: '600' },
  stepBody: { flex: 1, paddingTop: 3 },
  stepTitle: { fontSize: 16, lineHeight: 23, fontWeight: '600', color: colors.ink },
  detail: { fontSize: 16, lineHeight: 24, color: colors.muted, marginTop: 4 },
  promptCard: { marginTop: 25, backgroundColor: '#F6F7FC', borderRadius: 20, padding: 17, borderWidth: 1, borderColor: colors.line },
  prompt: { fontSize: 14, lineHeight: 22, color: '#536078', marginTop: 10 },
  expand: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' },
  link: { color: colors.accent, fontSize: 14, fontWeight: '600' },
  note: { fontSize: 14, lineHeight: 22, color: colors.muted, marginTop: 12 },
  footer: { paddingHorizontal: 24, paddingBottom: 5, width: '100%', maxWidth: 530, alignSelf: 'center' },
  feedback: { minHeight: 23, fontSize: 14, lineHeight: 22, color: colors.accent, textAlign: 'center', marginBottom: 5 },
  button: { borderRadius: 999, backgroundColor: colors.accent, minHeight: 56, padding: 17, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 16, lineHeight: 22, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
  replay: { minHeight: 44, paddingVertical: 13, alignItems: 'center', justifyContent: 'center' },
  secondary: { color: colors.muted, fontSize: 14, textAlign: 'center' },
});
