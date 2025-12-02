// hooks/useLoginNotification.ts
import { useEffect } from 'react';
import { openNotification } from '@components';
import type { UserAuthInfo } from '@types';
import { LOGIN_NOTIFICATION_KEY } from '@app/constants';
import { useAuth } from '@hooks/use-auth';

export const useLoginNotification = () => {
   const { user, isAuthenticated, isInitialized } = useAuth();

   useEffect(() => {
      if (!user) return;

      // Nếu chưa show notification cho session này
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
