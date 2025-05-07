import loadable from '@loadable/component';
import { Loading, Splash } from '@components';
import delay from 'p-min-delay';

type LazyProps = {
   path: string;
   delayTime?: number;
   fullScreen?: boolean;
   modules?: string;
   layout?: string;
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

const loadableWrapper = ({ modules, path, fullScreen = false, delayTime = 0 }: LazyProps) => {
   const newPath = path.split('.').includes('tsx') ? path : path + '/index.tsx';

   const Element = loadable(() => delay(import(`~/${modules ? `${modules}` : 'pages'}/${newPath}`), delayTime), {
      fallback: fullScreen ? <Splash /> : <Loading />,
   });

   return <Element />;
};

export { loadableWrapper as loadable };
