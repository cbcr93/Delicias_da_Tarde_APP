import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as storage from '@services/storage';
import translate from '@services/i18n';

export const createNewKey = async (): Promise<string> => {
  const version = uuidv4().replace(/-/g, '');
  const key = uuidv4().replace(/-/g, '');
  await storage.storeData(`${storage.StorageKeyItems.KEY_PREFIX}${version}`, key);
  await storage.storeData(storage.StorageKeyItems.ACTIVE_KEY_VERSION, version);
  return version;
};

export const getActiveKey = async (): Promise<{ key: string; version: string }> => {
  const version = await storage.getData(storage.StorageKeyItems.ACTIVE_KEY_VERSION);
  if (!version) throw new Error(translate('ERRORS.KEYMANAGER.KEY_VERSION_NOT_FOUND'));

  const key = await storage.getData(`${storage.StorageKeyItems.KEY_PREFIX}${version}`);
  if (!key) throw new Error(translate('ERRORS.KEYMANAGER.KEY_NOT_FOUND'));

  return { key, version };
};

export const getKeyByVersion = async (version: string): Promise<string> => {
  const key = await storage.getData(`${storage.StorageKeyItems.KEY_PREFIX}${version}`);
  if (!key) throw new Error(translate('ERRORS.KEYMANAGER.KEY_KEY_BAY_VERSION_NOT_FOUND'));
  return key;
};
