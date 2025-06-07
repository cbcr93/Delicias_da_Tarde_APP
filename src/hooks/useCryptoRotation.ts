import { rotateKeys } from '@utils/crypto';
import * as storage from '@services/storage';

const ROTATION_INTERVAL_HOURS = 24;

const hoursToMs = (h: number) => h * 60 * 60 * 1000;

export const useCryptoRotation = async () => {
  const last = await storage.getData(storage.StorageKeyItems.LAST_ROTATION_KEY);
  const now = Date.now();

  if (!last || now - parseInt(last, 10) > hoursToMs(ROTATION_INTERVAL_HOURS)) {
    await rotateKeys();
    await storage.storeData(storage.StorageKeyItems.LAST_ROTATION_KEY, String(now));
  }
};
