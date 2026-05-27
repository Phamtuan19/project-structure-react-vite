import { defineRouteMeta } from '@app/routes/route.type';

export default defineRouteMeta({
   path: '/auth/signin',
   requiresAuth: false,
   title: 'Đăng nhập',
});
