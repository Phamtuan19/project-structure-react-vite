import type { RouteProps } from './route.type';
import { Outlet, useRoutes, type RouteObject } from 'react-router';

import { ROUTE_PATH } from '@constants';
import { loadable } from './config';
import { generateAutoRoutes } from './auto-route-builder';

/**
 * An array of route objects that define the paths and elements for the application's pages.
 */
const ROUTES: RouteProps[] = [
   {
      element: <Outlet />,
      children: [
         /**
          * Anonymous layout for pages that do not require authentication.
          */
         ...generateAutoRoutes(),

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

const AppRoutes = () => {
   const routes = useRoutes(ROUTES as RouteObject[]);
   return <>{routes}</>;
};

export default AppRoutes;
