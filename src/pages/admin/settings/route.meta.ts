import { defineRouteMeta } from '@app/routes/route.type';

export default defineRouteMeta({
   path: '/admin/settings',
   requiresAuth: false,
   title: 'Cài đặt hệ thống',
});
