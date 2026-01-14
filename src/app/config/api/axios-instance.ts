/* eslint-disable @typescript-eslint/naming-convention */
import axios, {
   AxiosError,
   type AxiosInstance,
   type AxiosRequestConfig,
   type AxiosResponse,
   type InternalAxiosRequestConfig,
} from 'axios';
import { SETTINGS_CONFIG } from '../settings';
import { message } from 'antd';
import middleware from './middleware';
import { API_END_POINT, ROUTE_PATH } from '@constants';
import { eraseCookie, getCookie, setCookie } from '@utils';

let isRefreshing = false;
let failedQueue: {
   resolve: (value?: unknown) => void;
   reject: (error: unknown) => void;
   config: AxiosRequestConfig;
}[] = [];

let axiosInstanceRef: AxiosInstance | null = null;

const processQueue = (error: unknown, token: string | null = null) => {
   if (!axiosInstanceRef) return;

   failedQueue.forEach((p) => {
      if (token && axiosInstanceRef) {
         if (p.config.headers) {
            p.config.headers['Authorization'] = `Bearer ${token}`;
         }
         p.resolve(axiosInstanceRef(p.config));
      } else {
         p.reject(error);
      }
   });
   failedQueue = [];
};

const createInstance = (): AxiosInstance => {
   const config: AxiosRequestConfig = {
      baseURL: SETTINGS_CONFIG.API_URL,
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
   };

   const axiosInstance: AxiosInstance = axios.create(config);
   axiosInstanceRef = axiosInstance;

   axiosInstance.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig) => {
         void middleware(requestConfig);

         return requestConfig;
      },
      (requestError: AxiosError) => Promise.reject(requestError),
   );

   axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
         return response;
      },
      async (error: AxiosError<ErrorApiResponse>) => {
         const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
         const data = error.response?.data;

         if (data?.code === 1 && data?.message) {
            message.error(data.message);
         }

         if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
               return new Promise((resolve, reject) => {
                  failedQueue.push({ resolve, reject, config: originalRequest });
               });
            }

            isRefreshing = true;

            try {
               const refreshToken = getCookie(SETTINGS_CONFIG.REFRESH_TOKEN_KEY);

               if (!refreshToken) {
                  throw new Error('No refresh token available');
               }

               const response = await axiosInstance.post(API_END_POINT.REFRESH_TOKEN, {
                  refreshToken: refreshToken,
               });

               const newAccessToken = response.data.data.accessToken;
               const newRefreshToken = response.data.data.refreshToken;
               setCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY, newAccessToken);
               setCookie(SETTINGS_CONFIG.REFRESH_TOKEN_KEY, newRefreshToken);

               processQueue(null, newAccessToken);

               originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${newAccessToken}`,
               };

               return axiosInstance(originalRequest);
            } catch (err) {
               processQueue(err, null);
               eraseCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY);
               eraseCookie(SETTINGS_CONFIG.REFRESH_TOKEN_KEY);
               window.location.href = ROUTE_PATH.SIGN_IN;
               return Promise.reject(err);
            } finally {
               isRefreshing = false;
            }
         }

         return Promise.reject(error?.response?.data || error.message);
      },
   );

   return axiosInstance;
};

const axiosInstance = createInstance();

export default axiosInstance;
