import { getRequest, postRequest, SETTINGS_CONFIG } from '@app/config';
import { openNotification } from '@components';
import { API_END_POINT, ROUTE_PATH } from '@constants';
import type { UserAuthInfo } from '@types';
import { eraseCookie, setCookie } from '@utils';
import { useMutation } from '@tanstack/react-query';

export interface RequestDataSignin {
   identifier: string;
   password: string;
}

type LoginResponse = {
   accessToken: string;
   refreshToken: string;
   name: string;
};

export const usePostSignin = () => {
   return useMutation<SuccessResponse<LoginResponse>, ErrorApiResponse, RequestDataSignin>({
      mutationFn: (payload) => postRequest(API_END_POINT.AUTH_SIGNIN, payload),
      onSuccess: (response) => {
         setCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY, response.data.accessToken, {
            secure: true,
            sameSite: 'Strict',
         });

         setCookie(SETTINGS_CONFIG.REFRESH_TOKEN_KEY, response.data.refreshToken, {
            secure: true,
            sameSite: 'Strict',
         });
      },
      onError: (responseError) => {
         openNotification({
            type: 'error',
            message: responseError?.message || 'Đăng nhập thất bại',
         });
      },
   });
};

export const usePostGetMe = () => {
   return useMutation<SuccessResponse<UserAuthInfo>, ErrorApiResponse>({
      mutationKey: [API_END_POINT.AUTH_ME],
      mutationFn: () => getRequest(API_END_POINT.AUTH_ME),
      onError: (responseError) => {
         const errorResponse = responseError as unknown as { statusCode?: number };
         const statusCode = errorResponse?.statusCode;

         if (statusCode === 401 || statusCode === 403) {
            eraseCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY);
            eraseCookie(SETTINGS_CONFIG.REFRESH_TOKEN_KEY);
            window.location.href = ROUTE_PATH.SIGN_IN;
            return;
         }

         openNotification({
            type: 'error',
            message: responseError?.message || 'Đăng nhập thất bại',
         });
      },
   });
};
