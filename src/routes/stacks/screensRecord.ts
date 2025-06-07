import { StackScreenConfig } from '@models/types';
import { HomeDrawer } from '@routes/drawer/HomeDrawer';
import LoginScreen from '@screens/auth/Login/LoginScreen';
import ForgotPasswordScreen from '@screens/auth/RecoverPass/ForgotPasswordScreen';
import VerifyRecoveryCodeScreen from '@screens/auth/RecoverPass/VerifyRecoveryCodeScreen ';
import RegisterScreen from '@screens/auth/Register/RegisterScreen';
import DetailsScreen from '@screens/details/DetailsScreen';
import HomeScreen from '@screens/home/HomeScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import VerifyAndChangePasswordScreen from '@screens/profile/VerifyAndChangePasswordScreen';

export const HomeStrackRecord: Record<string, StackScreenConfig> = {
  Home: {
    component: HomeScreen,
    isPrivate: true,
  },
  Details: {
    component: DetailsScreen,
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
