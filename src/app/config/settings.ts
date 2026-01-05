import { type Language, LANGUAGE } from '@app/constants';
import { ROUTE_PATH, type RoutePath } from '@constants';

type ConfigProps = {
   FALLBACK_LANGUAGE: Language;
   SIGN_IN_REDIRECT_URL: RoutePath;
   SIGN_OUT_REDIRECT_URL: RoutePath;
   UNAUTHORIZED_REDIRECT_URL: RoutePath;
   REDIRECT_URL_KEY: string;
   THEME_KEY: string;
   ACCESS_TOKEN_KEY: string;
   REFRESH_TOKEN_KEY: string;
   API_URL: string;
};

/**
 * Configuration settings for the application.
 */
export const SETTINGS_CONFIG: ConfigProps = {
   /**
    * The fallback language to use in case the user's preferred language is not available.
    */
   FALLBACK_LANGUAGE: LANGUAGE.EN,

   /**
    * The URL to redirect to after a successful sign-in.
    */
   SIGN_IN_REDIRECT_URL: ROUTE_PATH.HOME,

   /**
    * The URL to redirect to after a successful sign-out.
    */
   SIGN_OUT_REDIRECT_URL: ROUTE_PATH.SIGN_IN,

   /**
    * The URL to redirect to when a user is not authorized
    */
   UNAUTHORIZED_REDIRECT_URL: ROUTE_PATH.SIGN_IN,

   /**
    * The key used to store the redirect URL in local storage.
    */
   REDIRECT_URL_KEY: 'redirect-url',

   /**
    * The key used to store the UI theme in local storage.
    */
   THEME_KEY: 'ui-theme',

   /**
    * The key used to store the access token in local storage.
    */
   ACCESS_TOKEN_KEY: 'accessToken',

   /**
    * The key used to store the refresh token in local storage.
    */
   REFRESH_TOKEN_KEY: 'refreshToken',

   /**
    * The base URL for API requests, typically set via environment variables.
    *
    * This value should be defined in your `.env` file as `VITE_APP_API_URL`.
    * It is injected at build time using Vite's `import.meta.env` system.
    *
    * Example: https://api.example.com/v1
    */
   API_URL: (() => {
      const apiUrl = import.meta.env.VITE_APP_API_URL as string;
      if (!apiUrl) {
         console.error('VITE_APP_API_URL is not defined in environment variables');
         return '';
      }
      return apiUrl;
   })(),
} as const;
