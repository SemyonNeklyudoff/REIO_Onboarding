import Svg, { Path } from 'react-native-svg';
import { colors } from './theme';

const paths = {
  calendar: 'M3 5h18v16H3ZM7 2v6m10-6v6M3 10h18M7 14h1m3 0h1m3 0h1m-9 4h1m3 0h1',
  search: 'M16.5 16.5 21 21M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',
  arrowRight: 'M5 12h14m-6-6 6 6-6 6',
  arrowUp: 'M12 19V5m-6 6 6-6 6 6',
  person: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2Z',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z',
  phone: 'M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4c0 2-3 3-5 2A24 24 0 0 1 3 8C2 6 3 3 5 3Z',
  arrowLeft: 'M19 12H5m6-6-6 6 6 6',
  chevron: 'm9 5 7 7-7 7',
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  building: 'M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17M3 21h18M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 21v-3h4v3',
  chart: 'M4 3v17h17M8 15l4-5 4 2 5-7',
  receipt: 'M5 3l2 2 2-2 3 2 3-2 2 2 2-2v18l-2-2-2 2-3-2-3 2-2-2-2 2ZM8 9h8m-8 4h8m-8 4h4',
  chat: 'M21 11a9 9 0 0 1-9 9H5l-3 2 1-6a9 9 0 1 1 18-5ZM8 10h8m-8 4h5',
  file: 'M14 2H5v20h14V7Zm0 0v6h5M8 12h8m-8 4h6',
  check: 'm5 12 4 4L19 6',
  moon: 'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  monitor: 'M3 4h18v13H3ZM8 21h8m-4-4v4',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M9 21h6',
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',
  help: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.5 8.5a2.5 2.5 0 1 1 4 2c-1.5 1-1.5 1-1.5 2.5m0 3h.01',
  send: 'm22 2-7 20-4-9L2 9Zm0 0L11 13',
  paperclip: 'm8 12 6-6a3 3 0 0 1 4 4L9 19a5 5 0 0 1-7-7L13 1m-2 12 5-5',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  share: 'M12 16V2m-5 5 5-5 5 5M5 11H3v11h18V11h-2',
  plus: 'M12 5v14M5 12h14',
  refresh: 'M20 8a8 8 0 1 0 0 8m0-13v5h-5',
  trend: 'm3 17 6-6 4 4 8-10m-6 0h6v6',
  grid: 'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',
  shield: 'm12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Zm-4 10 3 3 5-6',
  mail: 'M3 5h18v14H3Zm0 0 9 8 9-8',
  archive: 'M3 3h18v4H3Zm2 4v14h14V7M9 12h6',
  water: 'M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z',
  bolt: 'm13 2-9 12h7l-1 8 10-13h-7Z',
  key: 'M15 3a6 6 0 1 1-4 10L3 21H1v-4l8-8a6 6 0 0 1 6-6Zm2 4h.01',
};

export type IconName = keyof typeof paths;
export function Icon({ name, size = 22, color = colors.ink, strokeWidth = 1.7 }: {
  name: IconName; size?: number; color?: string; strokeWidth?: number;
}) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessible={false}>
    <Path d={paths[name]} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>;
}
