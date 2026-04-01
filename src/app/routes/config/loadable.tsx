import { Loading, Splash } from '@components';
import loadableDefault from '@loadable/component';
import React from 'react';

type ComponentModule = {
   default: React.ComponentType<unknown>;
};

type Importer = () => Promise<ComponentModule>;

type LazyProps = {
   path: string;
   fullScreen?: boolean;
   layout?: boolean;
};

/**
 * Glob import
 */
const pages = import.meta.glob<ComponentModule>('/src/pages/**/*.tsx');
const layouts = import.meta.glob<ComponentModule>('/src/layouts/**/*.tsx');

/**
 * Normalize map
 */
const normalizeMap = (maps: Record<string, Importer>, type: 'pages' | 'layouts') => {
   const result: Record<string, Importer> = {};

   for (const [key, importer] of Object.entries(maps)) {
      const normalized = key
         .replace(`/src/${type}/`, '')
         .replace(/\/index\.tsx$/, '')
         .replace(/\.tsx$/, '');

      Object.defineProperty(result, normalized, {
         enumerable: true,
         get: () => importer,
      });
   }

   return result;
};

const pageMap = normalizeMap(pages, 'pages');
const layoutMaps = normalizeMap(layouts, 'layouts');

/**
 * Cache component constructors
 */
const componentCache = new Map<string, React.ComponentType<unknown>>();

/**
 * Loadable wrapper — returns a React element, compatible with react-router Route element prop.
 */
function loadableWrapper({ layout = false, path, fullScreen = false }: LazyProps): React.ReactElement {
   const maps = layout ? layoutMaps : pageMap;

   const normalizedPath = path.replace(/\.tsx$/, '').replace(/\/$/, '');
   const cacheKey = `${layout ? 'layout' : 'page'}:${normalizedPath}`;

   /**
    * Cache hit — always render JSX element
    */
   if (componentCache.has(cacheKey)) {
      const Component = componentCache.get(cacheKey) as React.ComponentType<unknown>;
      return <Component />;
   }

   /**
    * Find importer
    */
   let importer: Importer | undefined = maps[normalizedPath as keyof typeof maps];

   if (!importer) {
      const candidates = Object.entries(maps).filter(([key]) => key.endsWith(`/${normalizedPath}`));

      if (candidates.length === 1) {
         importer = candidates[0]?.[1];
      } else if (candidates.length > 1) {
         console.warn(
            `⚠️ Multiple matches for: ${normalizedPath}`,
            candidates.map(([k]) => k),
         );
      }
   }

   /**
    * Not found
    */
   if (!importer) {
      console.error(`❌ Component not found: ${normalizedPath}`);

      const NotFound: React.ComponentType<unknown> = () => <div>Component not found: {normalizedPath}</div>;

      componentCache.set(cacheKey, NotFound);
      return <NotFound />;
   }

   /**
    * Load component
    */
   const Component = loadableDefault(importer, {
      fallback: fullScreen ? <Splash /> : <Loading />,
   }) as unknown as React.ComponentType<unknown>;

   componentCache.set(cacheKey, Component);

   return <Component />;
}

export { loadableWrapper as loadable };
