import { ROUTE_PATH } from '@constants';
import { loadable, type RouteProps } from '@app/routes';

export const authRoute: RouteProps = {
   path: '/',
   //    element: loadable({ modules: 'layouts', path: 'main-layout', fullScreen: true }),
   auth: false,

   children: [
      {
         path: ROUTE_PATH.SIGN_IN,
         element: loadable({ path: 'auth/signin', fullScreen: true }),
      },
      {
         path: ROUTE_PATH.REGISTER,
         element: loadable({ path: 'auth/register', fullScreen: true }),
      },
   ],
};
