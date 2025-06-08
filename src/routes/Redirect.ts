import { RootStackParamList } from '@models/types';
import { NavigationProp, NavigationState } from '@react-navigation/native';

/* export const redirect = (
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  },
  routes: { name?: string, params?: object }
) => {
  const { name, params = {} } = routes
  navigation.navigate({
    name,
    params,
  });
}; */

type AppNavigation = Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
  getState(): NavigationState | undefined;
};

type RouteInput<K extends keyof RootStackParamList = keyof RootStackParamList> = {
  name: K;
  params?: RootStackParamList[K];
};

export const redirect = (navigation: AppNavigation, routes: RouteInput) => {
  const { name, params = {} } = routes;
  navigation.navigate(name, params);
};
