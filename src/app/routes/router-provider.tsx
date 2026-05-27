import { SETTINGS_CONFIG } from '@app/config';
import { getCookie } from '@utils';
import React, { useEffect, useRef } from 'react';
import { useAuth, useLoginNotification } from '@hooks';

interface RouterProviderProps {
   children?: React.ReactNode;
}

const RouterProvider = ({ children }: RouterProviderProps) => {
   const { authGetUser, authLogout, isInitialized } = useAuth();
   const hasFetchedUser = useRef(false);

   useLoginNotification();

   useEffect(() => {
      if (hasFetchedUser.current || isInitialized) return;

      const accessToken = getCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY);

      if (accessToken) {
         authGetUser();
      } else {
         authLogout();
      }
      hasFetchedUser.current = true;
   }, [authGetUser, authLogout, isInitialized]);

   return <>{children}</>;
};

export { RouterProvider };
