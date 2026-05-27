export * from './router-provider';

export * from './config';

export * from './routers';

export * from './route.type';

import { useRoutes, type RouteObject } from 'react-router';
import { ROUTES } from './routers';

export const AppRoutes = () => {
   const routes = useRoutes(ROUTES as RouteObject[]);
   return <>{routes}</>;
};
