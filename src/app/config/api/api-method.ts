import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axios-instance';
import { saveAs } from 'file-saver';

export const getRequest = (url: string, config?: AxiosRequestConfig): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .get(url, config)
         .then((res: AxiosResponse) => resolve(res?.data))
         .catch((err: AxiosError) => reject(err));
   });
};

export const getFileRequest = (url: string, config?: AxiosRequestConfig, fileName?: string): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .get(url, config)
         .then((res: AxiosResponse) => {
            const contentDispositionHeader = res.headers['content-disposition'] as string;

            const filenameRegex = /filename[^;=\n]*=utf-8''((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDispositionHeader);
            const filename = matches && matches[1] ? matches[1].replace(/['"]/g, '') : fileName || 'unknown';

            const blob = new Blob([res.data], {
               type: res.headers['content-type'] as string,
            });
            saveAs(blob, decodeURIComponent(filename) || 'File lỗi');
            return resolve(res?.data);
         })
         .catch((err: AxiosError) => reject(err));
   });
};

export const postRequest = (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .post(url, data, config)
         .then((res: AxiosResponse) => resolve(res?.data))
         .catch((err: AxiosError) => reject(err));
   });
};
export const postRequestUpload = (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .post(url, data, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data' },
         })
         .then((res: AxiosResponse) => resolve(res?.data))
         .catch((err: AxiosError) => reject(err));
   });
};

export const putRequest = (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .put(url, data, config)
         .then((res: AxiosResponse) => resolve(res?.data))
         .catch((err: AxiosError) => reject(err));
   });
};

export const patchRequest = (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .patch(url, data, config)
         .then((res: AxiosResponse) => resolve(res?.data))
         .catch((err: AxiosError) => reject(err));
   });
};

export const deleteRequest = (url: string, config?: AxiosRequestConfig): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .delete(url, config)
         .then((res: AxiosResponse) => resolve(res?.data))
         .catch((err: AxiosError) => reject(err));
   });
};

export const downloadFile = (data: BlobPart[], fileName: string): void => {
   const blob = new Blob(data);
   saveAs(blob, fileName);
};

export const getCookie = (name: string): string | null => {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
   return null;
};

export const postFileRequest = (
   url: string,
   data: any,
   fileName?: string,
   config?: AxiosRequestConfig,
): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .post(url, data, config)
         .then((res: AxiosResponse) => {
            const contentDispositionHeader = res.headers['content-disposition'] as string;

            const filenameRegex = /filename[^;=\n]*=utf-8''((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDispositionHeader);
            const filename = matches && matches[1] ? matches[1].replace(/['"]/g, '') : fileName || 'unknown';

            const blob = new Blob([res.data], {
               type: res.headers['content-type'] as string,
            });
            saveAs(blob, decodeURIComponent(filename) || 'File lỗi');
            return resolve(res?.data);
         })
         .catch((err: AxiosError) => reject(err));
   });
};

export const getFileRequestNoSave = (url: string, config?: AxiosRequestConfig, fileName?: string): Promise<any> => {
   return new Promise((resolve, reject) => {
      axiosInstance
         .get(url, config)
         .then((res: AxiosResponse) => {
            const contentDispositionHeader = res.headers['content-disposition'] as string;

            const filenameRegex = /filename[^;=\n]*=utf-8''((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDispositionHeader);
            const filename = matches && matches[1] ? matches[1].replace(/['"]/g, '') : fileName || 'unknown';

            const blob = new Blob([res.data], {
               type: res.headers['content-type'] as string,
            });

            const fileType = res.headers['content-type'] as string;

            return resolve({
               filename,
               fileType,
               uri: blob,
            });
         })
         .catch((err: AxiosError) => reject(err));
   });
};
