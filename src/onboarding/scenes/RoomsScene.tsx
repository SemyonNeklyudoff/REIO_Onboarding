import type { SceneProps } from './primitives';
import { PhoneMockupScene } from './PhoneMockupScene';

export function RoomsScene(props: SceneProps) {
  return <PhoneMockupScene {...props} source={require('../assets/reio/room-detail-updated.png')} />;
}
