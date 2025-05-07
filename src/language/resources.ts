import { LANGUAGE } from '@app/constants';
import { globalEn, globalVi } from './global';

export const resources = {
   [LANGUAGE.VI]: {
      translation: {
         global: globalVi,
      },
   },
   [LANGUAGE.EN]: {
      translation: {
         global: globalEn,
      },
   },
};
