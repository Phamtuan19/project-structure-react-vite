import { usePostGetMe, usePostSignin, usePostRegister, type RequestDataSignin } from './use-auth.service';
import type { RequestDataRegister } from '@features/auth/types';
import { SETTINGS_CONFIG } from '@app/config';
import { eraseCookie } from '@utils';
import { SESSION_STORAGE_KEYS } from '@app/utils';
import { useAuthStore, type AuthStore } from '@store';

export const useAuth = () => {
   const auth = useAuthStore((state: AuthStore) => state);

   const { mutate: mutateSignin, isPending: isLoadingSignin } = usePostSignin();
   const { mutate: mutateRegister, isPending: isLoadingRegister } = usePostRegister();
   const { mutate: mutateGetMe } = usePostGetMe();

   const autSignin = (payload: RequestDataSignin) => {
      mutateSignin(payload, {
         onSuccess: () => {
            auth.setLoading(true);
            authGetUser();
         },
      });
   };

   const authRegister = (payload: RequestDataRegister, onSuccessCallback?: () => void) => {
      mutateRegister(payload, {
         onSuccess: () => {
            if (onSuccessCallback) {
               onSuccessCallback();
            }
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
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.LOGIN_NOTIFICATION_SHOWN);
      auth.setInitialized(true);
      auth.setLoading(false);
      auth.setUser(null);
   };

   return {
      ...auth,
      autSignin,
      authRegister,
      authGetUser,
      authLogout,
      isLoadingSignin,
      isLoadingRegister,
   };
};
