import { loadable, type RouteProps } from '@app/routes';
import { Outlet } from 'react-router';

const privateRoute: RouteProps = {
   path: '/',
   element: <Outlet />,
   auth: false,
   children: [
      {
         index: true,
         element: loadable({ path: 'home', fullScreen: true }),
         auth: [],
      },
   ],
};

export { privateRoute };
