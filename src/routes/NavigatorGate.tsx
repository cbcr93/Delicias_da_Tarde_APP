import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@contexts/AuthContext';

import { StackRoutes } from './stacks/StackNavigation';
import { AuthStrackRecord } from './stacks/screensRecord';
import { DrawerNavigation } from './drawer/DrawerNavigation';
import { drawerScreens } from './drawer/screensRecord';

export const NavigatorGate = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <DrawerNavigation drawerScreens={drawerScreens} />
      ) : (
        <StackRoutes stackScreens={AuthStrackRecord} />
      )}
    </>
  );
};
