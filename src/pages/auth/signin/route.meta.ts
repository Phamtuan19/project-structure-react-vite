import { defineRouteMeta } from '@app/routes';

export default defineRouteMeta({
   path: '/auth/signin',
   requiresAuth: false,
   title: 'Đăng nhập',
});
