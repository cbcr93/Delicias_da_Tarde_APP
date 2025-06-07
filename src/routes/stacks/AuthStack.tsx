import React from 'react';

import { StackRoutes } from './StackNavigation';
import { AuthStrackRecord } from './screensRecord';

export const AuthStack = () => {
  return <StackRoutes stackScreens={AuthStrackRecord} />;
};
