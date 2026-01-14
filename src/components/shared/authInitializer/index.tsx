import { SETTINGS_CONFIG } from '@app/config';
import { useAuth, useLoginNotification } from '@hooks';
import { getCookie } from '@utils';
import React, { useEffect, useRef } from 'react';

const AuthInitializer = ({ children }: { children?: React.ReactNode }) => {
   const hasFetchedUser = useRef(false);
   const { authGetUser, authLogout, isInitialized } = useAuth();

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

export default AuthInitializer;
