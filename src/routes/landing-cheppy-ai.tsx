import { loadable, type RouteProps } from '@app/routes';
import { Outlet } from 'react-router';

const landingCheppyAi: RouteProps = {
   path: '/cheppy-landing-page-app',
   element: <Outlet />,
   auth: false,
   children: [
      {
         index: true,
         element: loadable({ path: 'landing-page-cheppy-ai', fullScreen: false }),
         auth: [],
      },
   ],
};

export { landingCheppyAi };
