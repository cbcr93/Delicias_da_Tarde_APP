import { TabScreenConfig } from '@models/types';
import { AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { HomeStack } from '@routes/stacks/HomeStack';

export const HomeTabsRecord: Record<string, TabScreenConfig> = {
  HomeTabStack: {
    component: HomeStack,
    isPrivate: true,
    options: {
      tabBarIcon: ({ color, size }) =>
        AdvancedIcon('Feather', translate('ROUTER.HOMETAB.ICON'), size, color),
    },
  },
};
