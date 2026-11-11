import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { reioVectors } from './reioVectors';
import { Backdrop, Label, Reveal, Value, type SceneProps } from './primitives';
import { IncomeCard, ReioCard, ReioSegments, reio } from './reioUI';
const metrics = [['124k', 'Средний доход'], ['89%', 'Загрузка'], ['42.8%', 'Доходность']];
export function DashboardScene({ progress }: SceneProps) {
  return <>
    <Backdrop />
    <View style={{ position: 'absolute', top: 9, left: 18, width: 324, height: 334, justifyContent: 'center' }}>
    <Reveal progress={progress}>
      <IncomeCard monthly />
    </Reveal>
    <Reveal progress={progress} at={0.28} style={{ marginTop: 16 }}>
      <ReioCard><ReioSegments labels={['Объекты', 'Графики']} />
        <View style={{ flexDirection: 'row', gap: 7, marginTop: 16 }}>{metrics.map(([value, label], index) => <View key={label} style={{ flex: 1 }}><SvgXml xml={[reioVectors.income, reioVectors.occupancy, reioVectors.yield][index]} width={16} height={16} /><Value style={{ fontSize: 23, lineHeight: 30, color: reio.ink }}>{value}</Value><Label style={{ color: reio.secondary, fontSize: 14 }}>{label}</Label></View>)}</View>
      </ReioCard>
    </Reveal>
    </View>
  </>;
}
