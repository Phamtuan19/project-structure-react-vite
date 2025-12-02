import { ROUTE_PATH } from '@constants';
import { loadable, type RouteProps } from '@app/routes';

export const cmsRoutes: RouteProps = {
   path: '/',
   element: loadable({ layout: true, path: 'cms-layout' }),
   auth: true,
   children: [
      {
         path: ROUTE_PATH.CMS_DASHBOARD,
         element: loadable({ path: 'cms/dashboard', fullScreen: true }),
         auth: ['ADMIN'],
      },
      {
         path: ROUTE_PATH.CMS_SETTING,
         element: loadable({ path: 'cms/setting', fullScreen: true }),
         auth: ['ADMIN'],
      },
   ],
};
