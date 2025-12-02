import type { RouteProps } from './route.type';
import { Outlet } from 'react-router';

import routers from '@routes';
import { ROUTE_PATH } from '@constants';
import { loadable } from './config';

/**
 * An array of route objects that define the paths and elements for the application's pages.
 */
export const ROUTES: RouteProps[] = [
   {
      element: <Outlet />,
      children: [
         /**
          * Anonymous layout for pages that do not require authentication.
          */
         ...routers,

         /**
          * Route for handling NotFound error page.
          * This layout is used when the user navigates to a route that doesn't exist.
          */

         {
            path: ROUTE_PATH.ALL, // "*"
            element: loadable({ path: 'not-found', fullScreen: true }),
         },
      ],
   },
];
