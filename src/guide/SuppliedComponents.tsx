import { Image, View, type ImageSourcePropType } from 'react-native';
import type { GuideStep } from './content';

type SuppliedComponent = { source: ImageSourcePropType; width: number; height: number; description: string };
const assets = {
  report: { source: require('./assets/approved-report.png'), width: 1372, height: 1224, description: 'Hotel Plaza Delux. Документы согласованы: 3. Апрель 2026. Доход за апрель 19 772 рубля. Отчёт инвестора и два приложения.' },
  requests: { source: require('./assets/requests.png'), width: 1596, height: 1208, description: 'Заявки: 2. Два активных обращения и кнопка Создать заявку.' },
  utility: { source: require('./assets/utility-summary.png'), width: 1596, height: 968, description: 'Коммунальные расходы: к оплате на май 2026 — 55 433 рубля 38 копеек, есть долг. Оплатить всё.' },
  yield: { source: require('./assets/room-yield.png'), width: 1532, height: 1148, description: 'Доходность номера: среднемесячный доход 124 тысячи рублей, доходность инвестиций 18 процентов, загрузка 89 процентов.' },
  occupancy: { source: require('./assets/occupancy.png'), width: 1596, height: 1268, description: 'Загрузка номера Room 115 за май 2026: план 20 дней, факт 7 дней на 14 мая.' },
  investment: { source: require('./assets/investment.png'), width: 1532, height: 928, description: 'Эффективность инвестиций: текущая стоимость 1 970 662 рубля, ваши инвестиции 1 422 286 рублей. Период 12 месяцев.' },
  chart: { source: require('./assets/revenue-chart.png'), width: 1596, height: 1684, description: 'График выручки: синяя линия — факт, фиолетовая — план. Показана точка апреля и переключатели периода под графиком.' },
} satisfies Record<string, SuppliedComponent>;

type Placement = { asset: keyof typeof assets };
// Match by task: unrelated supplied cards must not replace the relevant interface.
export function getSuppliedComponents(step: GuideStep): Placement[] | null {
  switch (step.id) {
    case 'home-reports': return [{ asset: 'report' }];
    case 'home-requests': return [{ asset: 'requests' }];
    case 'home-utilities': return [{ asset: 'utility' }];
    case 'room-investment': return [{ asset: 'investment' }];
    case 'room-analytics': return [{ asset: 'chart' }];
    default: return null;
  }
}
export function SuppliedComponents({ placements, width }: { placements: Placement[]; width: number }) {
  return <View style={{ gap: 12 }}>{placements.map(({ asset }) => {
    const component = assets[asset];
    const height = width * component.height / component.width;
    return <View key={asset} style={{ width, height }}>
      <Image source={component.source} resizeMode="contain" style={{ width, height }} accessible accessibilityRole="image" accessibilityLabel={component.description} />
      {asset === 'report' && <View pointerEvents="none" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderWidth: 1, borderColor: '#DCE2EF', borderRadius: width * 0.105 }} />}
    </View>;
  })}</View>;
}
