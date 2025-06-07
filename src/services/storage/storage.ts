import * as SecureStore from 'expo-secure-store';

import translate from '../i18n';

// eslint-disable-next-line
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key.toLowerCase(), jsonValue);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(translate('ERRORS.UNKNOWN_ERROR'), e);
    }
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await SecureStore.getItem(key.toLowerCase());
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(translate('ERRORS.UNKNOWN_ERROR'), e);
    }
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key.toLowerCase());
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(translate('ERRORS.UNKNOWN_ERROR'), e);
    }
  }
};
