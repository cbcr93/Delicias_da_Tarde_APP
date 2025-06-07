import React from 'react';

import { StackRoutes } from './StackNavigation';
import { HomeStrackRecord } from './screensRecord';

export const HomeStack = () => {
  return <StackRoutes stackScreens={HomeStrackRecord} />;
};
