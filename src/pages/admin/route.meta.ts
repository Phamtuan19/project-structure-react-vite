import { defineRouteMeta } from '@app/routes';

export default defineRouteMeta({
   path: '/admin',
   requiresAuth: false, // Set to false for the demo to make it accessible without login if needed, or true if we want auth. Let's set false so they can access directly.
   title: 'Hệ thống Quản trị',
});
