import { defineRouteMeta } from '@app/routes/route.type';

export default defineRouteMeta({
   path: '/admin/dashboard',
   requiresAuth: false,
   title: 'Bảng điều khiển',
});
