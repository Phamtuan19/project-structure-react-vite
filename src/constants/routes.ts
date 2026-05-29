import { z } from 'zod';

export const ROUTE_PATH = {
   ALL: '*',
   FORBIDDEN: '/403',
   SERVER_ERROR: '/500',

   HOME: '/',

   // ===== AUTH ROUTES ===== //

   SIGN_IN: '/auth/signin',

   REGISTER: '/auth/register',

   // ===== ADMIN ROUTES ===== //

   ADMIN: '/admin',
   ADMIN_DASHBOARD: '/admin/dashboard',
   ADMIN_SETTINGS: '/admin/settings',
} as const;

export const RoutePathSchema = z.nativeEnum(ROUTE_PATH);

export type RoutePath = z.infer<typeof RoutePathSchema>;
