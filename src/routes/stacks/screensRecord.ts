import { StackScreenConfig } from '@models/types';
import { HomeDrawer } from '@routes/drawer/HomeDrawer';
import LoginScreen from '@screens/auth/Login/LoginScreen';
import ForgotPasswordScreen from '@screens/auth/RecoverPass/ForgotPasswordScreen';
import VerifyRecoveryCodeScreen from '@screens/auth/RecoverPass/VerifyRecoveryCodeScreen ';
import RegisterScreen from '@screens/auth/Register/RegisterScreen';
import HomeScreen from '@screens/home/HomeScreen';
import AddOrEditProductScreen from '@screens/product/AddOrEdit/AddOrEditProductScreen';
import ProductDetailsScreen from '@screens/product/Details/ProductDetailsScreen';
import StockScreen from '@screens/product/stock/StockScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import VerifyAndChangePasswordScreen from '@screens/profile/VerifyAndChangePasswordScreen';
import DetailsReportScreen from '@screens/report/Details/DetailsReportScreen';
import GeneralReportScreen from '@screens/report/General/GeneralReportScreen';
import CartScreen from '@screens/sale/Cart/CartScreen';
import ConfirmCartScreen from '@screens/sale/Cart/ConfirmCartScreen';
import RegisterSalesScreen from '@screens/sale/RegisterSales/RegisterSalesScreen';

export const HomeStrackRecord: Record<string, StackScreenConfig> = {
  Home: {
    component: HomeScreen,
    isPrivate: true,
  },
  AddOrEditProductScreen: {
    component: AddOrEditProductScreen,
    isPrivate: true,
  },
  ProductDetailsScreen: {
    component: ProductDetailsScreen,
    isPrivate: true,
  },
  StockScreen: {
    component: StockScreen,
    isPrivate: true,
  },
  CartScreen: {
    component: CartScreen,
    isPrivate: true,
  },
  ConfirmCartScreen: {
    component: ConfirmCartScreen,
    isPrivate: true,
  },
  RegisterSalesScreen: {
    component: RegisterSalesScreen,
    isPrivate: true,
  },
  DetailsReportScreen: {
    component: DetailsReportScreen,
    isPrivate: true,
  },
  GeneralReportScreen: {
    component: GeneralReportScreen,
    isPrivate: true,
  },
};

export const AuthStrackRecord: Record<string, StackScreenConfig> = {
  LoginScreen: { component: LoginScreen },
  RegisterScreen: { component: RegisterScreen },
  ForgotPasswordScreen: { component: ForgotPasswordScreen },
  VerifyRecoveryCodeScreen: { component: VerifyRecoveryCodeScreen },
  HomeDrawer: {
    component: HomeDrawer,
  },
};

export const ProfleStrackRecord: Record<string, StackScreenConfig> = {
  ProfileScreen: {
    component: ProfileScreen,
    isPrivate: true,
  },
  VerifyAndChangePasswordScreen: {
    component: VerifyAndChangePasswordScreen,
    isPrivate: true,
  },
};
