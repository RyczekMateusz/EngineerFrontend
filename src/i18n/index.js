import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import * as en from './translations/en'
import * as pl from './translations/pl'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: process.env.REACT_APP_DEBUG_MODE,
    resources: { en, pl },
    fallbackLng: 'en',
    ns: ['main'],
    defaultNS: 'main',
    keySeparator: false, // we do not use keys in form messages.welcome
    ignoreJSONStructure: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
  })

export default i18n
