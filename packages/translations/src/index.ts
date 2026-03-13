import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import cy from './locales/cy.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    cy: { translation: cy },
  },
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: { escapeValue: false },
});

export { i18n };
export { useTranslation } from 'react-i18next';
