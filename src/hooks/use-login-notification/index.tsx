import { useEffect } from 'react';
import { useAuth } from '../use-auth';
import { openNotification } from '@components';
import { LOGIN_NOTIFICATION_KEY } from '@app/constants';

export const useLoginNotification = () => {
   const { user } = useAuth();

   useEffect(() => {
      if (!user) return;

      const hasShown = sessionStorage.getItem(LOGIN_NOTIFICATION_KEY) === 'true';

      if (!hasShown) {
         openNotification({
            message: 'Đăng nhập thành công!',
            description: `Chào mừng ${user.name || 'bạn'}!`,
            type: 'success',
         });
         sessionStorage.setItem(LOGIN_NOTIFICATION_KEY, 'true');
      }
   }, [user]);
};
