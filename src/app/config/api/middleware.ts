import type { InternalAxiosRequestConfig } from 'axios';

const middleware = (requestConfig: InternalAxiosRequestConfig) => {
   const token = localStorage.getItem('token');

   if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
      return requestConfig;
   }

   return requestConfig;
};

export default middleware;
