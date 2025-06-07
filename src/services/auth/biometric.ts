import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { StorageKeyItems } from '@services/storage';
import { decryptAES, encryptAES } from '@utils/crypto';

export const enableBiometric = async (email: string, password: string) => {
  const credentials = JSON.stringify({ email, password });

  const encrypted = await encryptAES(credentials);
  await SecureStore.setItemAsync(StorageKeyItems.BIOMETRIC_KEY, encrypted);
};

export const disableBiometric = async () => {
  await SecureStore.deleteItemAsync(StorageKeyItems.BIOMETRIC_KEY);
};

export const isBiometricEnabled = async () => {
  const enabled = await SecureStore.getItemAsync(StorageKeyItems.BIOMETRIC_KEY);
  return enabled ? true : false;
};

export const getBiometricCredentials = async (): Promise<{
  email: string;
  password: string;
} | null> => {
  const encrypted = await SecureStore.getItemAsync(StorageKeyItems.BIOMETRIC_KEY);
  if (!encrypted) return null;

  try {
    const decrypted = await decryptAES(encrypted);

    return JSON.parse(decrypted);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('Erro mensagem: ', e.message);
    } else {
      console.log('Erro: ', e);
    }
    return null;
  }
};

export const authenticateBiometric = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    throw new Error('Biometria não disponível no dispositivo.');
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Autentique com sua biometria',
    fallbackLabel: 'Usar senha',
    cancelLabel: 'Cancelar',
  });

  if (!result.success) {
    // Códigos que indicam cancelamento e não erro
    const cancelCodes = ['user_cancel', 'system_cancel', 'app_cancel'];

    if (cancelCodes.includes(result.error)) {
      return false; // Retorna falso, mas sem lançar erro
    }

    throw new Error('Falha na autenticação biométrica.');
  }

  return true;
};
