import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { StorageWrapper } from '../storage';

import uz from './locales/uz.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  uz: { translation: uz },
  en: { translation: en },
  ru: { translation: ru },
};

const initI18n = async () => {
  let savedLanguage = StorageWrapper.getItemString('language');

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0]?.languageCode || 'uz';
    StorageWrapper.setItem('language', savedLanguage);
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
};

initI18n();

export default i18n;
