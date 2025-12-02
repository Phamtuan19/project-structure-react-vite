import { z } from 'zod';

export const ROUTE_PATH = {
   ALL: '*',

   HOME: '/',

   // ===== CMS ADMIN ROUTES ===== //
   CMS_DASHBOARD: 'cms/dashboard',
   CMS_SETTING: 'cms/settings',

   // ===== AUTH ROUTES ===== //

   SIGN_IN: '/auth/signin',

   REGISTER: '/auth/register',
} as const;

export const RoutePathSchema = z.nativeEnum(ROUTE_PATH);

export type RoutePath = z.infer<typeof RoutePathSchema>;
