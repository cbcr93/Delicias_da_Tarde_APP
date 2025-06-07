import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import translate from '@services/i18n';
import { colors } from '@themes/colors';
import { DrawerScreenConfig } from '@models/types';
import { withAuthGuard } from '@hooks/withAuthGuard';

const Drawer = createDrawerNavigator();

interface Props {
  drawerScreens: Record<string, DrawerScreenConfig>;
}

export const DrawerNavigation = (props: Props) => {
  const { drawerScreens } = props;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        headerTintColor: colors.text.Tertiary,
        headerStyle: {
          backgroundColor: colors.background.Secondary,
        },
        drawerActiveTintColor: colors.text.Tertiary,
        drawerActiveBackgroundColor: colors.background.Tertiary,
        drawerLabelStyle: {
          color: colors.text.Tertiary,
        },
        drawerStyle: {
          backgroundColor: colors.background.Secondary,
        },
      }}
    >
      {Object.entries(drawerScreens).map(([name, { component, options, isPrivate }]) => {
        const WrappedComponent = isPrivate ? withAuthGuard(component) : component;

        return (
          <Drawer.Screen
            key={name}
            name={name}
            component={WrappedComponent}
            options={{
              ...options,
              title: translate(`ROUTER.${name.toUpperCase()}.NAME`),
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
};
