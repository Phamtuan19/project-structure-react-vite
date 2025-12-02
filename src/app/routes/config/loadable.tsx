/* eslint-disable security/detect-object-injection */
import loadable from '@loadable/component';
import { Loading, Splash } from '@components';
import delay from 'p-min-delay';

type LazyProps = {
   path: string;
   delayTime?: number;
   fullScreen?: boolean;
   layout?: boolean;
};

/**
 * Returns a lazy-loaded component.
 *
 * @param path - The path to the component to be loaded.
 * @param delayTime - The delay in milliseconds before the component is loaded.
 * @param modules - The name of the module where the component is located.
 * @param fullScreen - Whether to show a full-screen loading splash or a small loading spinner.
 * @returns The lazy-loaded component.
 */

const pages = import.meta.glob<{ default: React.ComponentType }>('@/pages/**/*.tsx');
const layoutMap = import.meta.glob<{ default: React.ComponentType }>('@/layouts/**/*.tsx');

const loadableWrapper = ({ layout = false, path, fullScreen = false, delayTime = 0 }: LazyProps) => {
   const maps = layout ? layoutMap : pages;
   const newPath = path.endsWith('.tsx') ? path : `${path}/index.tsx`;

   const base = layout ? `/src/layouts` : '/src/pages';
   const key = `${base}/${newPath}`;

   const importer = maps[key];
   if (!importer) {
      console.error(`Component not found: ${key}`);
      return <div>Component not found</div>;
   }

   const Element = loadable(() => delay(importer(), delayTime), {
      fallback: fullScreen ? <Splash /> : <Loading />,
   });
   return <Element />;
};

export { loadableWrapper as loadable };
