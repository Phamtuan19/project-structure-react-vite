// i18n.d.ts
import type { AppResources } from '@language/resources';
import 'i18next';

// định nghĩa toàn bộ resources

declare module 'i18next' {
   interface CustomTypeOptions {
      resources: AppResources;
      defaultNS: 'translation';
      returnNull: false;
   }
}
