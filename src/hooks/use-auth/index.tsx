import { useAuthStore, type AuthStore } from '@store';
import { usePostGetMe, usePostSignin, type RequestDataSignin } from './use-auth.service';
import { SETTINGS_CONFIG } from '@app/config';
import { eraseCookie } from '@utils';

export const useAuth = () => {
   const auth = useAuthStore((state: AuthStore) => state);

   const { mutate: mutateSignin, isLoading: isLoadingSignin } = usePostSignin();
   const { mutate: mutateGetMe } = usePostGetMe();

   // const authRefreshToken = () => {
   //    return dispatch(actionRefreshToken());
   // };

   const autSignin = (payload: RequestDataSignin) => {
      auth.setLoading(true);
      mutateSignin(payload, {
         onSuccess: () => {
            authGetUser();
         },
      });
   };

   const authGetUser = () => {
      mutateGetMe(undefined, {
         onSuccess: (response) => {
            auth.login();
            auth.setUser(response.data);
            auth.setInitialized(true);
            auth.setLoading(false);
         },
         onError: () => {
            authLogout();
         },
      });
   };

   const authLogout = () => {
      eraseCookie(SETTINGS_CONFIG.ACCESS_TOKEN_KEY);
      eraseCookie(SETTINGS_CONFIG.REFRESH_TOKEN_KEY);
      sessionStorage.removeItem('LOGIN_NOTIFICATION_SHOWN');
      auth.setInitialized(true);
      auth.setLoading(false);
      auth.setUser(null);
   };

   return { ...auth, autSignin, authGetUser, authLogout, isLoadingSignin };
};
