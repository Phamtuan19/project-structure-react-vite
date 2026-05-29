import 'axios';

declare module 'axios' {
   export interface AxiosRequestConfig {
      metadata?: {
         requestKey?: string;
      };
   }
   export interface InternalAxiosRequestConfig {
      metadata?: {
         requestKey?: string;
      };
   }
}
