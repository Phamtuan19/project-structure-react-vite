import { LANGUAGE } from '@app/constants';
import commonEn from './en.json';
import commonVi from './vi.json';

export const resources = {
   [LANGUAGE.VI]: {
      translation: commonVi,
   },
   [LANGUAGE.EN]: {
      translation: commonEn,
   },
} as const;

export type AppResources = typeof resources;
export type AppLanguage = keyof AppResources;
