import { LANGUAGE } from '@app/constants';
import { globalEn, globalVi } from './global';
import { signinEn, signinVi } from './pages/auth/signin';
import { menuEn, menuVi } from './pages/menu';

export const resources = {
   [LANGUAGE.VI]: {
      translation: {
         global: {
            ...globalVi,
            ...menuVi,
         },
         signin: signinVi,
      },
   },
   [LANGUAGE.EN]: {
      translation: {
         global: {
            ...globalEn,
            ...menuEn,
         },
         signin: signinEn,
      },
   },
};

export type AppResources = (typeof resources)[keyof typeof resources];
