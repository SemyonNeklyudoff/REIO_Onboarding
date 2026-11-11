import type { ReactNode } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Reveal, type SceneProps } from './primitives';

// Keep the device and its entrance inside the illustration; the copy lives below it.
export function PhoneMockupScene({ source, ...props }: SceneProps & { source: ImageSourcePropType }) {
  return <PhoneFrameScene {...props}><Image source={source} resizeMode="cover" style={styles.screenshot} accessible={false} /></PhoneFrameScene>;
}
export function PhoneFrameScene({ progress, children }: SceneProps & { children: ReactNode }) {
  return <View style={styles.scene}>
    <Reveal progress={progress} style={styles.device} from={{ y: 14, scale: 0.98 }}>
      <View style={styles.bezel}>
        <View style={styles.screen}>
          {children}
          <View style={styles.island} />
        </View>
      </View>
    </Reveal>
    <Svg width={360} height={420} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs><LinearGradient id="welcome-device-fade" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset="0.63" stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset="0.78" stopColor="#FFFFFF" stopOpacity={0.35} />
        <Stop offset="0.92" stopColor="#FFFFFF" stopOpacity={0.94} />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity={1} />
      </LinearGradient></Defs>
      <Rect width={360} height={420} fill="url(#welcome-device-fade)" />
    </Svg>
  </View>;
}
const styles = StyleSheet.create({
  scene: { width: 360, height: 420, overflow: 'hidden' },
  device: { position: 'absolute', top: 8, left: 45, width: 270, height: 554, borderRadius: 48, padding: 5, borderWidth: 1, borderColor: '#CBD0D9', backgroundColor: '#E4E7ED', shadowColor: '#13213C', shadowOpacity: 0.14, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 4 },
  bezel: { flex: 1, padding: 7, borderRadius: 43, backgroundColor: '#15171B' },
  screen: { flex: 1, borderRadius: 36, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  screenshot: { width: '100%', height: '100%' },
  island: { position: 'absolute', top: 8, left: 86, width: 72, height: 19, borderRadius: 12, backgroundColor: '#15171B' },
});
