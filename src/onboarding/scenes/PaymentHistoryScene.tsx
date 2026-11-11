import type { SceneProps } from './primitives';
import { PhoneMockupScene } from './PhoneMockupScene';

export function PaymentHistoryScene(props: SceneProps) {
  return <PhoneMockupScene {...props} source={require('../assets/reio/payment-history-screen.jpg')} />;
}
