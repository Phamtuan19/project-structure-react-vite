/// <reference types="vite/client" />

interface ImportMetaEnv {
   readonly VITE_ENV: string;
   readonly VITE_WEB_NAME: string;
   readonly VITE_BASE_URL: string;
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}
