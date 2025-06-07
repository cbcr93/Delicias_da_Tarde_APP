import React from 'react';

import { StackRoutes } from './StackNavigation';
import { ProfleStrackRecord } from './screensRecord';

export const ProfileStack = () => {
  return <StackRoutes stackScreens={ProfleStrackRecord} />;
};
