import { DeviceType } from 'expo-device';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type DeviceInfo = {
  deviceId: string;
  deviceType: DeviceType;
  model: string;
  manufacturer: string;
  carrier: string;
  macAddress: string;
  cellphone?: string;
};

export type TouchIdUser = {
  status: 'enabled' | 'disabled';
};
