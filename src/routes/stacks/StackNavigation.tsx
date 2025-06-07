import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenConfig } from '@models/types';
import { withAuthGuard } from '@hooks/withAuthGuard';

const Stack = createNativeStackNavigator();

interface Props {
  stackScreens: Record<string, StackScreenConfig>;
}

export const StackRoutes = (props: Props) => {
  const { stackScreens } = props;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries(stackScreens).map(([name, { component, isPrivate }]) => {
        const WrappedComponent = isPrivate ? withAuthGuard(component) : component;

        return <Stack.Screen key={name} name={name} component={WrappedComponent} />;
      })}
    </Stack.Navigator>
  );
};
