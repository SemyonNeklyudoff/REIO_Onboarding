import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Onboarding, OnboardingCompletion } from './src/onboarding';
import { MoreScreen } from './src/demo/MoreScreen';
import { GuideScreen } from './src/guide/GuideScreen';

export default function App() {
  const [screen, setScreen] = useState<'onboarding' | 'complete' | 'skip' | 'home' | 'instruction'>('onboarding');
  return <SafeAreaProvider>
    <StatusBar style="dark" />
    {screen === 'onboarding'
      ? <Onboarding onComplete={() => setScreen('complete')} onSkip={() => setScreen('skip')} />
      : screen === 'home'
        ? <MoreScreen onInstruction={() => setScreen('instruction')} onExit={() => setScreen('onboarding')} />
        : screen === 'instruction'
          ? <GuideScreen onBack={() => setScreen('home')} />
        : <OnboardingCompletion skipped={screen === 'skip'} onStart={() => setScreen('home')} onReplay={() => setScreen('onboarding')} />}
  </SafeAreaProvider>;
}
