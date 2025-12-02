import type { RouteProps } from '@app/routes';
import { authRoute } from './auth-route';
import { privateRoute } from './private-route';
import { cmsRoutes } from './cms-route';

/**
 * Export default mảng tất cả route
 */
const routers: RouteProps[] = [authRoute, privateRoute, cmsRoutes];

export default routers;
