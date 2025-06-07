import { useTranslation } from 'react-i18next';

export const translate = (key: string) => {
  const { t } = useTranslation();
  try {
    if (t(key).split('[missing ')[1]) {
      if (!__DEV__) {
        return t('ERRORS.GENERIC_ERROR');
      }
    }
    // eslint-disable-next-line
  } catch (e) {
    return t('ERRORS.GENERIC_ERROR');
  }

  return t(key);
};

export default translate;
