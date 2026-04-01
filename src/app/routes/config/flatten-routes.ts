/* eslint-disable tsdoc/syntax */
import type { RouteProps } from '../route.type';

/**
 * Flattens the nested route tree into a flat array.
 *
 * Chỉ giữ leaf routes — những route thực sự được render và người dùng có thể
 * truy cập. Parent layout (không có `element`/`index`, chỉ dùng để bao children)
 * bị loại bỏ vì nó không phải là route có thể navigate.
 *
 * @example
 * // Input:
 * { path: '/', children: [           ← parent layout → BỎ
 *   { path: '/home', element: <X/> }  ← leaf route → GIỮ
 * ]}
 * // Output: [{ path: '/home', element: <X/> }]
 */
export const flattenRoutes = (routes: RouteProps[]): RouteProps[] =>
   routes.flatMap((route) => {
      const { children } = route;
      if (children) {
         return flattenRoutes(children);
      }
      return [route];
   });
