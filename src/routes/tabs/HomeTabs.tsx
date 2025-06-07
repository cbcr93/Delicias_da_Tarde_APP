import React from 'react';

import { TabRoutes } from './TabsNavigation';
import { HomeTabsRecord } from './screensRecord';

export const HomeTabs = () => {
  return <TabRoutes tabScreens={HomeTabsRecord} />;
};
