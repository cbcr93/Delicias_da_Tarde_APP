export interface DrawerScreenConfig {
  // eslint-disable-next-line
  component: ComponentType<any>;
  // eslint-disable-next-line
  options?: DrawerScreenProps<any>['options'];
  isPrivate?: boolean;
}

export type IRoutesTabIcon = {
  key: string;
  title: string;
  type: string;
  iconName: IconProps;
  screen: () => JSX.Element;
};

export type RootStackParamList = {
  Home: { name?: string; options?: object };
  Details: { name?: string; options?: object };
  LoginScreen: { name?: string; options?: object };
  ForgotPasswordScreen: { name?: string; options?: object };
  VerifyRecoveryCodeScreen: { name?: string; options?: { email?: string | null | undefined } };
  ProfileStack: { name?: string; options?: object };
  ProfileScreen: { name?: string; options?: object };
  VerifyAndChangePasswordScreen: { name?: string; options?: { email?: string | null | undefined } };
  RegisterScreen: { name?: string; options?: object };
  HomeDrawer: { name?: string; options?: object };
  HomeTab: { name?: string; options?: object };
  HomeStack: { name?: string; options?: object };
};

export interface TabScreenConfig {
  // eslint-disable-next-line
  component: React.ComponentType<any>;
  options?: {
    tabBarIcon?: (props: { color: string; size: number }) => React.ReactNode;
  };
  isPrivate?: boolean;
}

export interface StackScreenConfig {
  // eslint-disable-next-line
  component: React.ComponentType<any>;
  options?: {
    key?: string;
  };
  isPrivate?: boolean;
}
