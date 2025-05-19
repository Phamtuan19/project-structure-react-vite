/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

let isRefreshing = false;
let failedQueue: {
   resolve: (value?: any) => void;
   reject: (error: any) => void;
   config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
   failedQueue.forEach((p) => {
      if (token) {
         if (p.config.headers) {
            p.config.headers['Authorization'] = `Bearer ${token}`;
         }
         p.resolve(axios(p.config));
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

   axiosInstance.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig) => {
         void middleware(requestConfig);

         return requestConfig;
      },
      (requestError: AxiosError) => Promise.reject(requestError),
   );

   axiosInstance.interceptors.response.use(
      (response: AxiosResponse): any => {
         return response?.data ?? response;
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
               const refreshToken = localStorage.getItem('refresh_token');
               const response = await axios.post(`${SETTINGS_CONFIG.API_URL}/auth/refresh-token`, {
                  refresh_token: refreshToken,
               });

               const newAccessToken = response.data.access_token;
               localStorage.setItem('access_token', newAccessToken);

               processQueue(null, newAccessToken);

               originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${newAccessToken}`,
               };

               return axiosInstance(originalRequest);
            } catch (err) {
               processQueue(err, null);
               localStorage.removeItem('access_token');
               localStorage.removeItem('refresh_token');
               window.location.href = '/login';
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

export default createInstance();
