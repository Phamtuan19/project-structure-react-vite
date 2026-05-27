import { defineRouteMeta } from '@app/routes/route.type';

export default defineRouteMeta({
   path: '/auth/register',
   requiresAuth: false,
   title: 'Đăng ký',
});
