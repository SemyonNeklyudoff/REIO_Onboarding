import { OverviewScene } from './OverviewScene';
import { MainPageScene, RoomsListScene } from './UpdatedAppScenes';
import { PaymentsScene } from './PaymentsScene';
import { PaymentHistoryScene } from './PaymentHistoryScene';
import { SettingsScene } from './SettingsScene';
import { RoomsScene } from './RoomsScene';

export const scenes = [OverviewScene, MainPageScene, RoomsListScene, RoomsScene, PaymentHistoryScene, PaymentsScene, SettingsScene] as const;
