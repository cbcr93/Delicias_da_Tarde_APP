import * as models from '@models/types';

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
  LoginScreen: { name?: string; options?: object };
  ForgotPasswordScreen: { name?: string; options?: object };
  VerifyRecoveryCodeScreen: { name?: string; options?: { email?: string | null | undefined } };
  ProfileStack: { name?: string; options?: object };
  ProfileScreen: { name?: string; options?: object };
  VerifyAndChangePasswordScreen: { name?: string; options?: { email?: string | null | undefined } };
  RegisterScreen: { name?: string; options?: object };
  HomeDrawer: { name?: string; options?: object };
  HomeTab: { name?: string; options?: object };
  HomeStack: { name?: boolean; options?: object };
  AddOrEditProductScreen: {
    name?: string;
    options?: { flag?: string | null | undefined; item?: models.IProduct | null | undefined };
  };
  ProductDetailsScreen: {
    name?: string;
    options?: { flag?: string | null | undefined; item?: models.IProduct | null | undefined };
  };
  StockScreen: { name?: string; options?: object };
  CartScreen: {
    name?: string;
    options?: {
      flag?: string | null | undefined;
      item?:
        | {
            id: string;
            date: Date | string;
            amamount_toal: number;
            price_total: string;
            finish: boolean;
            itens: Partial<models.IProduct>[];
          }[]
        | null
        | undefined;
    };
  };
  ConfirmCartScreen: { name?: string; options?: object };
  RegisterSalesScreen: { name?: string; options?: object };
  DetailsReportScreen: { name?: string; options?: object };
  GeneralReportScreen: { name?: string; options?: object };
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
