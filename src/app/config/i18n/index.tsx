import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE, LANGUAGE_KEY } from '@app/constants';
import { resources } from '@language/resources';

i18next.use(initReactI18next).init({
   resources,
   lng: LANGUAGE.VI,
   fallbackLng: LANGUAGE.VI,
   debug: false,
   supportedLngs: [LANGUAGE.EN, LANGUAGE.VI],

   interpolation: {
      escapeValue: false,
   },
   fallbackNS: 'translation',

   detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_KEY,
      caches: ['localStorage'],
   },
});

export default i18next;
