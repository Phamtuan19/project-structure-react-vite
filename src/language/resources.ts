import { LANGUAGE } from '@app/constants';
import { globalEn, globalVi } from './global';
import { signinEn, signinVi } from './pages/auth/signin';

export const resources = {
   [LANGUAGE.VI]: {
      translation: {
         global: globalVi,
         signin: signinVi,
      },
   },
   [LANGUAGE.EN]: {
      translation: {
         global: globalEn,
         signin: signinEn,
      },
   },
};

export type AppResources = (typeof resources)[keyof typeof resources];
