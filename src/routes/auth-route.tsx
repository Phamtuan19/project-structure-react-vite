import { ROUTE_PATH } from '@constants';
import { loadable, type RouteProps } from '@app/routes';

//    element: loadable({ modules: 'layouts', path: 'main-layout', fullScreen: true }),
// auth: undefined (mặc định) → layout cha không chặn, children tự xử lý
export const authRoute: RouteProps = {
   path: '/',
   children: [
      {
         id: 'auth-signin',
         path: ROUTE_PATH.SIGN_IN,
         element: loadable({ path: 'auth/signin', fullScreen: true }),
         auth: [],
      },
      {
         id: 'auth-register',
         path: ROUTE_PATH.REGISTER,
         element: loadable({ path: 'auth/register', fullScreen: true }),
         auth: [],
      },
   ],
};
