import { useSelector } from 'react-redux';
import type { RootState } from '@redux/rootReducer';

export const useAuth = () => {
   //    const dispatch: any = useDispatch();
   const auth = useSelector((state: RootState) => state.auth);

   // const authRefreshToken = () => {
   //    return dispatch(actionRefreshToken());
   // };

   const authLogin = (data: AxiosResponseData) => {
      //   dispatch(actionLoginReducer(data));
   };

   const authGetUser = () => {
      //   dispatch(actionGetUser());
   };

   const authLogout = () => {
      localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN);
      //   dispatch(actionLogoutReducer());
   };

   return { ...auth, authLogin, authGetUser, authLogout };
};
