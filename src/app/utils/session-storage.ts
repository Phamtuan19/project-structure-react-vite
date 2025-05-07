/* eslint-disable @typescript-eslint/naming-convention */

import { SETTINGS_CONFIG } from '@app/config';

/**
 * Get session redirect url
 */
export const getSessionRedirectUrl = () => window.sessionStorage.getItem(SETTINGS_CONFIG.REDIRECT_URL_KEY);

/**
 * Set session redirect url
 *
 * @param url - The url to redirect to
 */
export const setSessionRedirectUrl = (url: string) =>
   window.sessionStorage.setItem(SETTINGS_CONFIG.REDIRECT_URL_KEY, url);

/**
 * Reset session redirect url
 */
export const resetSessionRedirectUrl = () => window.sessionStorage.removeItem(SETTINGS_CONFIG.REDIRECT_URL_KEY);

export const keySessionStore = {
   language_key: 'lang_key',
};
