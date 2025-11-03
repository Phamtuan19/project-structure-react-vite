import { loadable, type RouteProps } from '@app/routes';
import { Outlet } from 'react-router';

const publicRoute: RouteProps = {
   path: '/cheppy-landing-page-app',
   element: <Outlet />,
   auth: false,
   children: [
      {
         index: true,
         element: loadable({ path: 'cheppy', fullScreen: true }),
         auth: [],
      },
   ],
};

export { publicRoute };
