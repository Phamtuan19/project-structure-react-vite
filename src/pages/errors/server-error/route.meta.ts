import { defineRouteMeta } from '@app/routes';
import { ROUTE_PATH } from '@constants';

export default defineRouteMeta({
   path: ROUTE_PATH.SERVER_ERROR,
   requiresAuth: false,
   title: 'Máy chủ lỗi',
});
