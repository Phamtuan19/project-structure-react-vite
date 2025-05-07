import { loadable, type RouteProps } from '@app/routes';
import { Outlet } from 'react-router';

const privateRoute: RouteProps = {
   path: '/',
   element: <Outlet />,
   auth: true,
   children: [
      {
         index: true,
         element: loadable({ path: 'home', fullScreen: true }),
         auth: ['User'],
      },
   ],
};

export { privateRoute };
