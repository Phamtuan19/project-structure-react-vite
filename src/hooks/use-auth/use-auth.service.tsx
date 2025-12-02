import { getRequest, postRequest, SETTINGS_CONFIG } from '@app/config';
import { openNotification } from '@components';
import { API_END_POINT } from '@constants';
import type { UserAuthInfo } from '@types';
import { setCookie } from '@utils';
import { useMutation, useQuery } from 'react-query';

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
         console.log('🚀 ~ usePostSignin ~ response:', response);
         setCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY, response.data.accessToken, {
            seconds: 15 * 60,
            secure: true,
            sameSite: 'Strict',
         });

         setCookie(SETTINGS_CONFIG.REFRESH_TOKEN_KEY, response.data.refreshToken, {
            seconds: 7 * 24 * 60 * 60,
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
         openNotification({
            type: 'error',
            message: responseError?.message || 'Đăng nhập thất bại',
         });
      },
   });
};
