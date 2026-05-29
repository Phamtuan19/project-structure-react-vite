import { defineRouteMeta } from '@app/routes';
import { ROUTE_PATH } from '@constants';

export default defineRouteMeta({
   path: ROUTE_PATH.FORBIDDEN,
   requiresAuth: false,
   title: 'Không có quyền truy cập',
});
