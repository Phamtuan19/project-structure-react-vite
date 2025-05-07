import { z } from 'zod';

/**
 * An object containing the available language options.
 */
export const LANGUAGE = {
   VI: 'vi',
   EN: 'en',
} as const;

export const LANGUAGE_KEY = 'app_language';

/**
 * An array of all available languages.
 */
export const LANGUAGES = Object.values(LANGUAGE);

/**
 * Defines the schema for the available languages.
 */
export const LanguageSchema = z.nativeEnum(LANGUAGE);

/**
 * Represents the inferred type of the `LanguageSchema`.
 */
export type Language = z.infer<typeof LanguageSchema>;
