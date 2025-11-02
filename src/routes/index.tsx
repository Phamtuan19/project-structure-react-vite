import type { RouteProps } from '@app/routes';
import { authRoute } from './auth-route';
import { privateRoute } from './private-route';
import { landingCheppyAi } from './landing-cheppy-ai';

/**
 * Export default mảng tất cả route
 */
const routers: RouteProps[] = [authRoute, privateRoute, landingCheppyAi];

export default routers;
