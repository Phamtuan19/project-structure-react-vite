import { postRequest } from '@app/config';
import { openNotification } from '@components';
import { API_END_POINT } from '@constants';
import type { UserAuthInfo } from '@types';
import { useMutation } from 'react-query';

interface ResponseDataSignin {
   userName: string;
   password: string;
}

export const usePostSignin = () => {
   return useMutation<SuccessResponse<UserAuthInfo>, ErrorApiResponse, ResponseDataSignin>({
      mutationFn: (payload) => postRequest(API_END_POINT.POST_AUTH_SIGNIN, payload),
      onSuccess: (response) => {
         openNotification({
            message: 'Đăng nhập thành công!',
            description: `Chào mừng ${response.data?.account_name || 'bạn'}!`,
            type: 'success',
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
