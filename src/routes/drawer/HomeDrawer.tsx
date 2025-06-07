import React from 'react';

import { drawerScreens } from './screensRecord';
import { DrawerNavigation } from './DrawerNavigation';

export const HomeDrawer = () => {
  return <DrawerNavigation drawerScreens={drawerScreens} />;
};
