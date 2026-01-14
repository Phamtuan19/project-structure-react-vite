import { z } from 'zod';

export const ROUTE_PATH = {
   ALL: '*',

   HOME: '/',

   // ===== AUTH ROUTES ===== //

   SIGN_IN: '/auth/signin',

   REGISTER: '/auth/register',
} as const;

export const RoutePathSchema = z.nativeEnum(ROUTE_PATH);

export type RoutePath = z.infer<typeof RoutePathSchema>;
