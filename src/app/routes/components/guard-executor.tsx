import type React from 'react';
import { Navigate, useLocation, useParams, useSearchParams } from 'react-router';
import { SETTINGS_CONFIG } from '@app/config';
import type { GuardFn } from '../route.type';
import { useAuth } from '@hooks';

interface GuardExecutorProps {
   guards: GuardFn[];
   requiresAuth?: boolean;
   authRedirectTo?: string;
   guestRedirectTo?: string;
   children: React.ReactNode;
}

export const GuardExecutor = ({
   guards,
   requiresAuth,
   authRedirectTo = SETTINGS_CONFIG.UNAUTHORIZED_REDIRECT_URL,
   guestRedirectTo = SETTINGS_CONFIG.SIGN_IN_REDIRECT_URL,
   children,
}: GuardExecutorProps) => {
   const auth = useAuth();
   const location = useLocation();
   const params = useParams();
   const [searchParams] = useSearchParams();

   // Chờ thông tin xác thực được khởi tạo xong
   if (!auth.isInitialized || auth.isLoading) {
      return null;
   }

   // 1. Kiểm tra requiresAuth trực tiếp
   if (requiresAuth === true) {
      if (!auth.isAuthenticated) {
         return <Navigate to={authRedirectTo} replace state={{ from: location }} />;
      }
   } else if (requiresAuth === false) {
      if (auth.isAuthenticated) {
         const fromPath = location.state?.from?.pathname;
         const from = fromPath && !fromPath.startsWith('/auth/') ? fromPath : guestRedirectTo;
         return <Navigate to={from} replace />;
      }
   }

   // 2. Lần lượt thực thi từng Guard và truyền Context đầy đủ
   for (const guard of guards) {
      const result = guard({ auth, params, location, searchParams });

      if (result === false) {
         // Chặn và chuyển hướng về trang 403 mặc định (hoặc trang login)
         return <Navigate to="/403" replace state={{ from: location }} />;
      }

      if (typeof result === 'string') {
         // Chuyển hướng tới đường dẫn được chỉ định bởi Guard
         return <Navigate to={result} replace state={{ from: location }} />;
      }
   }

   // Vượt qua tất cả các Guard, render component con
   return <>{children}</>;
};
