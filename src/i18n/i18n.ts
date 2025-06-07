import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptBr from './locales/ptbr';

const resources = {
  pt: {
    translation: ptBr,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  debug: true,
  lng: 'pt',
  fallbackLng: 'pt',
  resources,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
