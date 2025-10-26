// i18n.d.ts
import type { AppResources } from '@language/resources';
import 'i18next';

declare module 'i18next' {
   interface CustomTypeOptions {
      // định nghĩa toàn bộ resources
      resources: AppResources;
      defaultNS: 'translation';
      returnNull: false;
   }
}
