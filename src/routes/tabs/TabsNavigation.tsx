import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import translate from '@services/i18n';
import { TabScreenConfig } from '@models/types';
import { withAuthGuard } from '@hooks/withAuthGuard';

const Tab = createBottomTabNavigator();

interface Props {
  tabScreens: Record<string, TabScreenConfig>;
}

export const TabRoutes = (props: Props) => {
  const { tabScreens } = props;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries(tabScreens).map(([name, { component, options, isPrivate }]) => {
        const WrappedComponent = isPrivate ? withAuthGuard(component) : component;

        return (
          <Tab.Screen
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
    </Tab.Navigator>
  );
};
