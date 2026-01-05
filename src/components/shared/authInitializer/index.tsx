import { SETTINGS_CONFIG } from '@app/config';
import { useAuth } from '@hooks';
import { useLoginNotification } from '@hooks';
import { getCookie } from '@utils';
import React, { useEffect, useRef } from 'react';

const AuthInitializer = (props: { children?: React.ReactNode }) => {
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

   return <>{props.children}</>;
};

export default AuthInitializer;
