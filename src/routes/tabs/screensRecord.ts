import { TabScreenConfig } from '@models/types';
import { AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import NotificationScreen from '@screens/notification/NotificationScreen';
import { HomeStack } from '@routes/stacks/HomeStack';

export const HomeTabsRecord: Record<string, TabScreenConfig> = {
  HomeStack: {
    component: HomeStack,
    isPrivate: true,
    options: {
      tabBarIcon: ({ color, size }) =>
        AdvancedIcon('Feather', translate('ROUTER.HOMETAB.ICON'), size, color),
    },
  },
  Notification: {
    component: NotificationScreen,
    isPrivate: true,
    options: {
      tabBarIcon: ({ color, size }) =>
        AdvancedIcon('Feather', translate('ROUTER.INFO.ICON'), size, color),
    },
  },
};
