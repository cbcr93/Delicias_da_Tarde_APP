import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Appearance, Platform } from 'react-native';
import * as Localization from 'expo-localization';
import * as LocalAuthentication from 'expo-local-authentication';

export const getDeviceInfo = () => ({
  brand: Device.brand,
  model: Device.modelName,
  os: Device.osName,
  osVersion: Device.osVersion,
  deviceName: Constants.deviceName,
  appVersion: Constants.manifest2?.version ?? 'unknown',
  buildNumber: Constants.manifest2?.extra?.buildNumber ?? 'unknown',
  isDevice: Device.isDevice,
});

export const getDeviceId = (): string => {
  return Device.osInternalBuildId ?? Device.deviceName ?? 'unknown-device';
};

export const isEmulator = async (): Promise<boolean> => {
  return !(await Device.isDevice);
};
export const isTablet = (): boolean => {
  return Device.deviceType === Device.DeviceType.TABLET;
};
export const isAndroid = (): boolean => Platform.OS === 'android';
export const isIOS = (): boolean => Platform.OS === 'ios';
export const isExpoGo = (): boolean => {
  return Constants.appOwnership === 'expo';
};

export const isDarkMode = (): boolean => {
  return Appearance.getColorScheme() === 'dark';
};

export const getLocale = (): string => {
  return Localization.locale; // Ex: 'pt-BR', 'en-US'
};

export const hasBiometricSupport = async (): Promise<boolean> => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
};
