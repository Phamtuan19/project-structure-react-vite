import { useAuthStore, type AuthStore } from '@store';

export const useAuth = () => {
   //    const dispatch: any = useDispatch();
   const auth = useAuthStore((state: AuthStore) => state);

   // const authRefreshToken = () => {
   //    return dispatch(actionRefreshToken());
   // };

   const autSignin = () => {
      //   dispatch(actionLoginReducer(data));
   };

   const authGetUser = () => {
      //   dispatch(actionGetUser());
   };

   const authLogout = () => {
      localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN);
      //   dispatch(actionLogoutReducer());
   };

   return { ...auth, autSignin, authGetUser, authLogout };
};
