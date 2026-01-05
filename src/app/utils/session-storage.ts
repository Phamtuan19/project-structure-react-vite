import { SETTINGS_CONFIG } from '@app/config';

/**
 * Get session redirect url
 */
export const getSessionRedirectUrl = () => sessionStorage.getItem(SETTINGS_CONFIG.REDIRECT_URL_KEY);

/**
 * Set session redirect url
 *
 * @param url - The url to redirect to
 */
export const setSessionRedirectUrl = (url: string) => sessionStorage.setItem(SETTINGS_CONFIG.REDIRECT_URL_KEY, url);

/**
 * Reset session redirect url
 */
export const resetSessionRedirectUrl = () => sessionStorage.removeItem(SETTINGS_CONFIG.REDIRECT_URL_KEY);

/**
 * Session storage keys used throughout the application.
 */
export const SESSION_STORAGE_KEYS = {
   LOGIN_NOTIFICATION_SHOWN: 'LOGIN_NOTIFICATION_SHOWN',
   LANGUAGE_KEY: 'lang_key',
} as const;

export const keySessionStore = {
   language_key: SESSION_STORAGE_KEYS.LANGUAGE_KEY,
};
