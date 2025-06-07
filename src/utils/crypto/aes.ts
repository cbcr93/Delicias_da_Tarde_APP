import CryptoJS from 'crypto-js';
import translate from '@services/i18n';

import * as Key from './keys';

export const encryptAES = async (value: string): Promise<string> => {
  const { key, iv } = await Key.getKeys();
  try {
    const encrypted = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(key), { iv });

    return encrypted.toString();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(translate('ERRORS.CRYPTO.ERRO_ENCRYPT'), e.message);
    } else {
      console.error(translate('ERRORS.UNKNOWN_ERROR'), e);
    }
    return '';
  }
};

export const decryptAES = async (encryptedValue: string): Promise<string> => {
  const tryDecrypt = (enc: string, key: string, iv: CryptoJS.lib.WordArray) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(enc, CryptoJS.enc.Utf8.parse(key), { iv });
      return decrypted.toString(CryptoJS.enc.Utf8) || null;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(translate('ERRORS.CRYPTO.ERRO_DECRYPT'), e.message);
      } else {
        console.error(translate('ERRORS.UNKNOWN_ERROR'), e);
      }
      return null;
    }
  };

  const { key: activeKey, iv: activeIv } = await Key.getKeys();
  let decrypted = tryDecrypt(encryptedValue, activeKey, activeIv);

  if (!decrypted) {
    const legacy = await Key.getLegacyKeys();
    for (const { key, iv } of legacy) {
      decrypted = tryDecrypt(encryptedValue, key, iv);
      if (decrypted) break;
    }
  }

  return decrypted || '';
};
