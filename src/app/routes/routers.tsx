import type { RouteProps } from './route.type';
import { Outlet } from 'react-router';

import routers from '@routes';

/**
 * An array of route objects that define the paths and elements for the application's pages.
 */
export const ROUTES: RouteProps[] = [
   {
      element: <Outlet />,
      children: routers,
      //   children: [
      //  ,
      /**
       * Anonymous layout for pages that do not require authentication.
       */
      //  {
      //     element: loadable({
      //        modules: 'layouts',
      //        path: 'GlobalLayout',
      //        fullScreen: true,
      //     }),
      //     children: [
      //        {
      //           element: loadable({ modules: 'layouts', path: 'MainLayout', fullScreen: true }),
      //           children: [
      //              /**
      //               * Auth layout for pages that require authentication.
      //               */
      //              ...privateRouter,
      //              {
      //                 path: ROUTE_PATH.PROFILE,
      //                 element: loadable({ path: 'Profile', fullScreen: true }),
      //                 isAuthenticated: true,
      //                 auth: [],
      //              },
      //              /**
      //               * Route for handling NotFound error page.
      //               * This layout is used when the user navigates to a route that doesn't exist.
      //               */
      //              {
      //                 path: ROUTE_PATH.ALL,
      //                 element: loadable({
      //                    path: 'Errors/NotFound',
      //                    fullScreen: true,
      //                 }),
      //              },
      //           ],
      //        },
      //     ],
      //  },
      //   ],
   },
];
