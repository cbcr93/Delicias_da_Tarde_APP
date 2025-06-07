import * as SecureStore from 'expo-secure-store';
import { StorageKeyItems } from '@services/storage';
import { encryptAES, decryptAES } from '@utils/crypto';
import translate from '@services/i18n';

export const saveSession = async (userData: object) => {
  const json = JSON.stringify(userData);
  const encrypted = await encryptAES(json);
  await SecureStore.setItemAsync(StorageKeyItems.SESSION_KEY, encrypted);
};

export const clearSession = async () => {
  await SecureStore.deleteItemAsync(StorageKeyItems.SESSION_KEY);
};

export const loadSession = async (): Promise<null | {
  id: string;
  email: string;
  password: string;
  lastLogin: string;
  expiresAt: string;
}> => {
  const encrypted = await SecureStore.getItemAsync(StorageKeyItems.SESSION_KEY);

  if (!encrypted) {
    return null;
  }

  try {
    const decrypted = await decryptAES(encrypted);

    const session = JSON.parse(decrypted);
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);

    if (now >= expiresAt) {
      await clearSession();
      return null;
    }

    return session;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(translate('ERRORS.SESSION.ERRO_DECRYPT'), e);
      return null;
    } else {
      console.error(translate('ERRORS.UNKNOWN_ERROR'), e);
      return null;
    }
  }
};
