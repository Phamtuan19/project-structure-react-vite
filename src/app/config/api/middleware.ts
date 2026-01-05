import { getCookie } from '@utils';
import type { InternalAxiosRequestConfig } from 'axios';
import { SETTINGS_CONFIG } from '../settings';

const middleware = (requestConfig: InternalAxiosRequestConfig) => {
   const token = getCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY);

   if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
      return requestConfig;
   }

   return requestConfig;
};

export default middleware;
