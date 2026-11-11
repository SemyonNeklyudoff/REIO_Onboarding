import type { SceneProps } from './primitives';
import { PhoneMockupScene } from './PhoneMockupScene';

export function PaymentsScene(props: SceneProps) {
  return <PhoneMockupScene {...props} source={require('../assets/reio/utility-screen.jpg')} />;
}
