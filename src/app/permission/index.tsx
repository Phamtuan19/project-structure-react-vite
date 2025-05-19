/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate, useRoutes, useLocation, matchRoutes, type RouteObject } from 'react-router';
import { SETTINGS_CONFIG } from '../config';
import { flattenRoutes, ROUTES } from '../routes';
import { getSessionRedirectUrl, resetSessionRedirectUrl, checkUserPermission, setSessionRedirectUrl } from '../utils';
import type { Role } from '../constants';
import { useAuth } from '@hooks';
import { ROUTE_PATH } from '@constants';

const { UNAUTHORIZED_REDIRECT_URL, SIGN_IN_REDIRECT_URL } = SETTINGS_CONFIG;

/**
 * Flattens the given routes array.
 */
const flattenedRoutes = flattenRoutes(ROUTES);

/**
 * Renders the routes based on user's permission.
 *
 * @returns The routes to be rendered based on user's permission.
 * @example
 * ```
 * <Permission />
 * ```
 */
export const Permission = () => {
   const auth = useAuth();

   const { isAuthenticated, isLoading } = auth;

   const userRoles: Role[] = [];

   const navigate = useNavigate();

   const routes = useRoutes(ROUTES as RouteObject[]);

   const { pathname } = useLocation();

   /**
    * The function redirects the user to the appropriate URL based on their authentication status.
    */
   const redirectRoute = () => {
      /**
       * The redirect URL is the URL stored in session storage or the sign-in redirect URL.
       */
      const redirectUrl = getSessionRedirectUrl() || SIGN_IN_REDIRECT_URL;

      /**
       * User is unauthenticated.
       * Redirected to the unauthorized redirect URL.
       */
      if (!isAuthenticated && !isLoading) {
         return navigate(UNAUTHORIZED_REDIRECT_URL);
      } else {
         /**
          * User is member.
          * User must be on unauthorized page or just logged in.
          * Redirected to the URL stored in session storage or the sign-in redirect URL and reset the session storage of redirect URL.
          */
         resetSessionRedirectUrl();
         return navigate(redirectUrl);
      }
   };

   /**
    * Checks if the user has access to the current route.
    */
   useEffect(() => {
      const matchedRoutes = matchRoutes(flattenedRoutes as RouteObject[], location.pathname);
      const matched = matchedRoutes ? matchedRoutes[0] : false;

      /**
       * Returns if the current route is not found.
       */
      if (!matched) {
         return;
      }

      /**
       * Finds the matched route configuration object from the flattened routes array.
       */
      const matchedRouteConfig = flattenedRoutes.find((route) => route.path === matched.route.path);

      //   const fieldsCommon = matchedRouteConfig?.fieldsCommon ?? [];

      /**
       * Checks if the user has permission to access route.
       */
      const userHasPermission = checkUserPermission({
         routePermissions: matchedRouteConfig?.auth as never,
         isAuthenticatedUser: isAuthenticated,
         userRoles,
      });

      /**
       * If the user doesn't have permission to view the route and the current path is not an ignored path,
       * set the session redirect URL to the current path.
       */
      if (!userHasPermission && pathname !== ROUTE_PATH.SIGN_IN) {
         setSessionRedirectUrl(pathname);
      }

      /**
       * If user is member but don't have permission to view the route
       * redirected to sign in redirect URL.
       */
      if (!userHasPermission && pathname !== ROUTE_PATH.SIGN_IN && isAuthenticated) {
         setSessionRedirectUrl(SETTINGS_CONFIG.SIGN_IN_REDIRECT_URL);
      }

      /**
       * Get the access state based on the matched route's authentication requirement
       */
      const access = matchedRouteConfig ? userHasPermission : true;

      /**
       * If the user doesn't have permission to view the route, redirect the user to the appropriate URL.
       */
      if (!access) {
         redirectRoute();
      }
   }, [pathname, isAuthenticated, userRoles]);

   return <>{routes}</>;
};
