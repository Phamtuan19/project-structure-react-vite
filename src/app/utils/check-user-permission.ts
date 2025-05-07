import { type Role, ROLE } from '@app/constants';

type CheckUserPermissionProps = {
   routePermissions: Role[] | undefined;
   isAuthenticatedUser: boolean | undefined;
   userRoles: Role[];
};

/**
 * Checks if the user has permission to access route.
 *
 * @param routePermissions - The permissions of the route.
 * @param isAuthenticatedUser - A boolean value that indicates if the user is authenticated.
 * @param userRoles - The roles of the user.
 * @returns - Returns true if the user has permission, false otherwise.
 */
export const checkUserPermission = ({
   routePermissions,
   isAuthenticatedUser,
   userRoles,
}: CheckUserPermissionProps): boolean => {
   /**
    * If route permissions is not defined grant access to the route.
    */
   if (!routePermissions) {
      return true;
   }

   /**
    * If router permissions is an empty array allow only user that are not authenticated.
    */
   if (routePermissions.length === 0) {
      return !isAuthenticatedUser;
   }

   /**
    * If route permissions includes user allow all authenticated users.
    */
   if (routePermissions.includes(ROLE.USER)) {
      return !!isAuthenticatedUser;
   } else {
      /**
       * If user roles includes admin grant access to the route.
       */
      if (userRoles.includes(ROLE.ADMIN)) {
         return true;
      }

      /**
       * Check if at least one element in userRoles is included in routePermissions.
       */
      return userRoles.some((role) => routePermissions.includes(role));
   }
};
