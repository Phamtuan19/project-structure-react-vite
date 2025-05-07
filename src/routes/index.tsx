import type { RouteProps } from '@app/routes';
import { authRoute } from './auth-route';
import { privateRoute } from './private-route';

/**
 * Export default mảng tất cả route
 */
const routers: RouteProps[] = [authRoute, privateRoute];
export default routers;
