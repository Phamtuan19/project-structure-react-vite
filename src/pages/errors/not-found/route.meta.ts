import { defineRouteMeta } from '@app/routes';
import { ROUTE_PATH } from '@constants';

export default defineRouteMeta({
   path: ROUTE_PATH.ALL,
   requiresAuth: false,
   title: 'Không tìm thấy trang',
});
