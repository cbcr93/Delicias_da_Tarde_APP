import { AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { DrawerScreenConfig } from '@models/types/index';
import SettingsScreen from '@screens/settings/SettingsScreen';
import InfoScreen from '@screens/info/InfoScreen';
import { ProfileStack } from '@routes/stacks/ProfileStack';
import { HomeStack } from '@routes/stacks/HomeStack';

export const drawerScreens: Record<string, DrawerScreenConfig> = {
  HomeStack: {
    component: HomeStack,
    isPrivate: true,
    options: {
      drawerIcon: ({ color, size }: { color: string; size: number }) =>
        AdvancedIcon('Feather', translate('ROUTER.HOME.ICON'), size, color),
    },
  },
  ProfileStack: {
    component: ProfileStack,
    isPrivate: true,
    options: {
      drawerIcon: ({ color, size }: { color: string; size: number }) =>
        AdvancedIcon('Feather', translate('ROUTER.PROFILESTACK.ICON'), size, color),
    },
  },
};
