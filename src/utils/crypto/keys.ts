import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import * as storage from '@services/storage';
import translate from '@services/i18n';

export const getKeys = async () => {
  const keyId = await storage.getData(storage.StorageKeyItems.ACTIVE_KEY_ID);
  if (!keyId) throw new Error(translate('ERRORS.CRYPTO.KEY_NOT_FOUND'));

  const key = await storage.getData(`${storage.StorageKeyItems.SECRET_KEY_PREFIX}${keyId}`);
  const ivRaw = await storage.getData(`${storage.StorageKeyItems.IV_STORAGE_PREFIX}${keyId}`);
  if (!key || !ivRaw) throw new Error(translate('ERRORS.CRYPTO.INCOMPLETE_KEY'));

  return {
    key,
    iv: CryptoJS.enc.Utf8.parse(ivRaw.slice(0, 16)),
  };
};

export const getLegacyKeys = async (): Promise<{ key: string; iv: CryptoJS.lib.WordArray }[]> => {
  const legacy = await storage.getData(storage.StorageKeyItems.LEGACY_KEYS);
  if (!legacy) return [];

  const ids: string[] = JSON.parse(legacy);
  const legacyKeys = await Promise.all(
    ids.map(async (id) => {
      const key = await storage.getData(`${storage.StorageKeyItems.SECRET_KEY_PREFIX}${id}`);
      const ivRaw = await storage.getData(`${storage.StorageKeyItems.IV_STORAGE_PREFIX}${id}`);
      if (key && ivRaw) {
        return { key, iv: CryptoJS.enc.Utf8.parse(ivRaw.slice(0, 16)) };
      }
      return null;
    }),
  );

  return legacyKeys.filter(Boolean) as { key: string; iv: CryptoJS.lib.WordArray }[];
};

export const rotateKeys = async () => {
  const newId = uuidv4().replace(/-/g, '');
  const newKey = uuidv4().replace(/-/g, '');
  const newIV = uuidv4().replace(/-/g, '').slice(0, 16);

  const currentKeyId = await storage.getData(storage.StorageKeyItems.ACTIVE_KEY_ID);
  const legacy = currentKeyId
    ? JSON.parse((await storage.getData(storage.StorageKeyItems.LEGACY_KEYS)) || '[]')
    : [];

  if (currentKeyId && !legacy.includes(currentKeyId)) {
    legacy.push(currentKeyId);
    await storage.storeData(storage.StorageKeyItems.LEGACY_KEYS, JSON.stringify(legacy));
  }

  await storage.storeData(`${storage.StorageKeyItems.SECRET_KEY_PREFIX}${newId}`, newKey);
  await storage.storeData(`${storage.StorageKeyItems.IV_STORAGE_PREFIX}${newId}`, newIV);
  await storage.storeData(storage.StorageKeyItems.ACTIVE_KEY_ID, newId);
};
