declare module '@loadable/component' {
   import type { ComponentType, ReactNode } from 'react';

   interface LoadableOptions<P extends object = object> {
      fallback?: ReactNode;
      resolved?: (props: P) => ReactNode;
      rejected?: (props: P) => ReactNode;
   }

   interface LoadableComponent<P extends object = object> extends ComponentType<P> {
      preload: (props?: P) => void;
   }

   function loadable<P extends object = object>(
      resolve: () => Promise<{ default: ComponentType<P> }>,
      options?: LoadableOptions<P>,
   ): LoadableComponent<P>;

   function lazy<P extends object = object>(resolve: () => Promise<{ default: ComponentType<P> }>): ComponentType<P>;

   export { loadable, lazy };

   export default loadable;
}
