import { SETTINGS_CONFIG } from '@app/config';
import { useAuth } from '@hooks';
import { useLoginNotification } from '@hooks/use-login-lotification';
import { getCookie } from '@utils';
import React, { useEffect, useRef } from 'react';

const AuthInitializer = (props: { children?: React.ReactNode }) => {
   const hasFetchedUser = useRef(false);

   const { authGetUser, authLogout, user } = useAuth();

   useLoginNotification();

   useEffect(() => {
      if (user && hasFetchedUser.current) return;

      const accessToken = getCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY);

      if (accessToken) {
         authGetUser();
      } else {
         authLogout();
      }
      hasFetchedUser.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return <>{props.children}</>;
};

export default AuthInitializer;
