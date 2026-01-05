import type { RouteProps } from '../route.type';

/**
 * Flattens the nested route tree into a flat array of route objects.
 *
 * @param routes - The array of route objects to flatten.
 * @returns The flattened array of route objects.
 * @example
 * flattenRoutes[ROUTES]
 */
export const flattenRoutes = (routes: RouteProps[]): RouteProps[] =>
   routes.flatMap((route) => {
      if (route.children) {
         const childRoutes = flattenRoutes(route.children);

         return [...childRoutes];
      } else {
         return route;
      }
   });
