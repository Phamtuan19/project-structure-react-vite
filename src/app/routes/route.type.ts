import type { Role } from '@app/constants';
import type { RouteObject } from 'react-router';
import type { OverrideProps } from '~/types';

/**
 * The props for the Route.
 */
export type RouteProps = OverrideProps<RouteObject, { path?: string; children?: RouteProps[] }> & {
   /**
    * The permissions of the route.
    * If auth is undefined, the route is public.
    * If auth is empty, the route is only accessible to unauthenticated users.
    * If auth is not empty, the route is only accessible to users with the specified roles.
    */
   auth?: boolean | Role[];
   fieldsCommon?: string[];
   authGuard?: boolean;
   meta?: {
      isAuth: boolean;
      roles: string[];
      title: string;
   };
};
