import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import de from './locales/de.json'
import en from './locales/en.json'
import uk from './locales/uk.json'
import ru from './locales/ru.json'

const resources = { de, en, uk, ru }

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'apex-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n