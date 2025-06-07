import { AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { DrawerScreenConfig } from '@models/types/index';
import PlusScreen from '@screens/plus/PlusScreen';
import SettingsScreen from '@screens/settings/SettingsScreen';
import AboutScreen from '@screens/about/AboutScreen';
import InfoScreen from '@screens/info/InfoScreen';
import ContactScreen from '@screens/contact/ContactScreen';
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
  Plus: {
    component: PlusScreen,
    isPrivate: true,
    options: {
      drawerIcon: ({ color, size }: { color: string; size: number }) =>
        AdvancedIcon('Feather', translate('ROUTER.PLUS.ICON'), size, color),
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
  About: {
    component: AboutScreen,
    isPrivate: true,
    options: {
      drawerIcon: ({ color, size }: { color: string; size: number }) =>
        AdvancedIcon('Feather', translate('ROUTER.ABOUT.ICON'), size, color),
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
  Contact: {
    component: ContactScreen,
    isPrivate: true,
    options: {
      drawerIcon: ({ color, size }: { color: string; size: number }) =>
        AdvancedIcon('Feather', translate('ROUTER.CONTACT.ICON'), size, color),
    },
  },
};
