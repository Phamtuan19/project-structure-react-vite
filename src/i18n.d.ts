// i18n.d.ts
import 'i18next';

declare module 'i18next' {
   interface Resources {
      vi: {
         translation: {
            global: typeof import('./language/global/vi').globalVi;
         };
      };
      en: {
         translation: {
            global: typeof import('./language/global/en').globalEn;
         };
      };
   }
}
