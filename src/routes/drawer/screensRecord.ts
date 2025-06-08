import { AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { DrawerScreenConfig } from '@models/types/index';
import SettingsScreen from '@screens/settings/SettingsScreen';
import InfoScreen from '@screens/info/InfoScreen';
import { HomeTabs } from '@routes/tabs/HomeTabs';
import { ProfileStack } from '@routes/stacks/ProfileStack';

export const drawerScreens: Record<string, DrawerScreenConfig> = {
  HomeTab: {
    component: HomeTabs,
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
  Settings: {
    component: SettingsScreen,
    isPrivate: true,
    options: {
      drawerIcon: ({ color, size }: { color: string; size: number }) =>
        AdvancedIcon('Feather', translate('ROUTER.SETTINGS.ICON'), size, color),
    },
  },
  Info: {
    component: InfoScreen,
    isPrivate: true,
    options: {
      drawerIcon: ({ color, size }: { color: string; size: number }) =>
        AdvancedIcon('Feather', translate('ROUTER.INFO.ICON'), size, color),
    },
  },
};
