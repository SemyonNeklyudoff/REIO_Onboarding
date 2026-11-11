# Assets from the actual REIO interface

Copied without image modification from `/Users/essenay/Projects/REIO/REIO/Assets.xcassets/Home/`:

- `room_15.imageset/room_15.png`
- `room_24.imageset/room_24.png`
- `room_83.imageset/room_83.png`

Original SVG logo (`reio_logo.imageset/reio_logo.svg`) and analytics artwork (`Home/icon_analytics_*.imageset/`) are preserved as XML strings in `scenes/reioVectors.ts`, rendered with react-native-svg.

Source references for the translated React Native previews:

| Preview | SwiftUI source |
| --- | --- |
| Overview / home | `Features/HomeScreen.swift`, `Components/TopNavigationBar.swift` |
| Property | `Features/MyNumbers/MyNumberDetailScreen.swift`, `Features/Home/HomeOverviewChartView.swift` |
| Expenses | `Features/Home/HomeUtilityExpensesCard.swift`, `Features/Home/HomeUtilityExpensesDetailScreen.swift` |
| Chat | `Features/Chats/ChatDetailScreen.swift` |
| Documents | `Features/Documents/DocumentDetailScreen.swift` |
| More | `Features/More/MoreScreen.swift` |

Colors, card radii and type hierarchy follow `Core/DesignSystem.swift`. Layouts are excerpts sized for the onboarding canvas, not complete application screens. Financial values are source sample data, not an API connection. SwiftUI views cannot be directly imported into React Native or vice versa; production SwiftUI integration requires a native implementation or an explicitly chosen bridge.


`home-screen.png` — скриншот главной, предоставленный пользователем 10 ноября 2026 (`Не в управлении.png`). В первом экране вставлен в кодовый мокап телефона; исходные пиксели сохранены, белый градиент наложен отдельно в сцене.

`room-screen.png` — скриншот раздела «Мой номер», предоставленный пользователем 10 ноября 2026 (`Если отель один.png`). Второй экран использует тот же мокап и белый градиент, что и первый.

`utility-screen.jpg` — предоставленный пользователем скриншот состава начисления (`iPhone 13 mini - 153.jpg`, 10 ноября 2026). В третьем экране используется общий мокап телефона с белым градиентом.

`payment-room-15.png`, `payment-room-13.png`, `payment-room-09.png` — компоненты пользователя `Frame 11808828.png`, `Frame 11808829.png`, `Frame 11808830.png` от 10 ноября 2026. В четвёртом экране отображаются без изменения исходных пикселей и пропорций; анимация появления и внешняя тень наложены отдельно.

Актуальные версии карточек: `payment-room-15-july.png` (июль 2026), `payment-room-13-june.png` (июнь 2026), `payment-room-09-may.png` (май 2026). Повторно предоставлены пользователем 10 ноября 2026; новые имена исключают старый кеш изображений.

## Текущие мокапы (11 ноября 2026)

Актуальная последовательность задана в `../../scenes/index.ts`. Исторические ссылки на номера экранов выше относятся к ранним версиям.

- `home-screen.png` — приветствие, страница 1.
- `main-page-updated.png` — Главная, страница 2; исходный пользовательский `3.png`.
- `rooms-list-screen.png` — список номеров, страница 3; исходный `Главная.png`.
- `room-detail-updated.png` — карточка номера без синего баннера, страница 4; исходный `4.png`.
- `payment-history-screen.jpg` — история оплат, страница 5; исходный `1.jpg`.
- `utility-screen.jpg` — детализация начисления, страница 6.

Скриншоты скопированы без изменения пикселей. Рамка, анимация и белый градиент реализованы в `PhoneMockupScene.tsx`.
