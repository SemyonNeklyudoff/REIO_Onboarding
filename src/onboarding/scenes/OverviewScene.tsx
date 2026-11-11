import type { SceneProps } from './primitives';
import { PhoneMockupScene } from './PhoneMockupScene';

export function OverviewScene(props: SceneProps) {
  return <PhoneMockupScene {...props} source={require('../assets/reio/home-screen.png')} />;
}
