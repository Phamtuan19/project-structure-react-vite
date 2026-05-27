// src/app/routes/auto-route-builder.tsx
import type { RouteProps, RouteMeta, GuardFn } from './route.type';
import { loadable } from './config';
import { GuardExecutor } from './components/guard-executor';
import { permissionGuard } from './guards';
import { ErrorBoundary } from '@components';

const pages = import.meta.glob('/src/pages/**/*.tsx');
const metas = import.meta.glob<{ default: RouteMeta }>('/src/pages/**/*.meta.ts', { eager: true });

export const generateAutoRoutes = (): RouteProps[] => {
   const routesMap = new Map<string, RouteProps>();

   Object.keys(pages).forEach((fileKey) => {
      const normalizedPath = fileKey.replace('/src/pages/', '').replace('/index.tsx', '').replace('.tsx', '');

      const dirPath = fileKey.substring(0, fileKey.lastIndexOf('/'));
      const metaKey = `${dirPath}/route.meta.ts`;
      // eslint-disable-next-line security/detect-object-injection
      const meta = metas[metaKey]?.default || {};

      const isLayout = normalizedPath.endsWith('_layout');
      const routePath =
         meta.path !== undefined
            ? meta.path
            : isLayout
              ? normalizedPath.replace('/_layout', '')
              : normalizedPath === 'home'
                ? '/'
                : `/${normalizedPath}`;

      // Lấy element gốc
      let element = <ErrorBoundary mode="page">{loadable({ path: normalizedPath })}</ErrorBoundary>;

      // Tự động tổng hợp danh sách các Guards dựa trên flags và canActivate
      const routeGuards: GuardFn[] = [];

      if (meta.permission) {
         routeGuards.push(permissionGuard(meta.permission));
      }

      if (meta.canActivate && Array.isArray(meta.canActivate) && meta.canActivate.length > 0) {
         routeGuards.push(...meta.canActivate);
      }

      if (routeGuards.length > 0 || meta.requiresAuth !== undefined) {
         element = (
            <GuardExecutor
               guards={routeGuards}
               requiresAuth={meta.requiresAuth}
               authRedirectTo={meta.authRedirectTo}
               guestRedirectTo={meta.guestRedirectTo}
            >
               {element}
            </GuardExecutor>
         );
      }

      const routeNode: RouteProps = {
         id: normalizedPath,
         path: routePath,
         element,
         data: {
            title: meta.title,
         },
         children: [],
      };

      routesMap.set(normalizedPath, routeNode);
   });

   // Xây dựng tree (giữ nguyên logic của bạn)
   const routeTree: RouteProps[] = [];
   routesMap.forEach((routeNode, key) => {
      const parts = key.split('/');
      if (parts.length > 1) {
         parts.pop();
         const parentLayoutKey = `${parts.join('/')}/_layout`;
         if (parentLayoutKey !== key) {
            const parentNode = routesMap.get(parentLayoutKey);
            if (parentNode) {
               parentNode.children = parentNode.children || [];
               parentNode.children.push(routeNode);
               return;
            }
         }
      }
      routeTree.push(routeNode);
   });

   return routeTree;
};
