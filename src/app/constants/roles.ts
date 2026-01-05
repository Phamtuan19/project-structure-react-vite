import { z } from 'zod';

/**
 * Object containing the available roles in the application.
 */
export const ROLE = {
   USER: 'USER',
   ADMIN: 'ADMIN',
} as const;

/**
 * Defines the schema for the available roles.
 */
export const RoleSchema = z.nativeEnum(ROLE);

/**
 * Represents the inferred type of the `RoleSchema`.
 */
export type Role = z.infer<typeof RoleSchema>;
