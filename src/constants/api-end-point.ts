const API_END_POINT = {
   /**
    *
    * Authentication related API endpoints.
    *
    */
   AUTH_SIGNIN: 'security/login',
   AUTH_REGISTER: 'security/register',
   REFRESH_TOKEN: 'security/refresh-token',

   AUTH_ME: 'security/me',
} as const;

export { API_END_POINT };
