import type { PERMISSION_RULE, RoutePath } from '@constants';
import type { OverrideProps, UserAuthInfo } from '@types';
import type { RouteObject, Location, Params } from 'react-router';

/**
 * Unique identifier for each route — dùng để lookup thay vì so sánh path string,
 * tránh trường hợp duplicate path hoặc wildcard route gây nhầm lẫn.
 */
export type RouteId = string;

export type GuardFn = (context: {
   auth: {
      isAuthenticated: boolean | undefined;
      isInitialized: boolean;
      isLoading: boolean;
      user: UserAuthInfo | null;
   };
   params: Params;
   location: Location;
   searchParams: URLSearchParams;
}) => boolean | string;

export type RouteProps = OverrideProps<RouteObject, { path?: string; children?: RouteProps[] }> & {
   /** Danh sách guards thực thi trước khi truy cập route. */
   canActivate?: GuardFn[];

   /** Dữ liệu bổ sung đi kèm route (tương tự data của Angular). */
   data?: {
      title?: string;
   };
};

type ValueOf<T> = T[keyof T];
export type PermissionValue = ValueOf<{
   [K in keyof typeof PERMISSION_RULE]: ValueOf<(typeof PERMISSION_RULE)[K]>;
}>;

/** Định nghĩa kiểu dữ liệu cho file route.meta.ts */
export interface RouteMeta {
   path?: RoutePath;
   requiresAuth?: boolean; // true: yêu cầu đăng nhập, false: không
   authRedirectTo?: string; // Tùy chỉnh đường dẫn redirect khi chưa đăng nhập
   guestRedirectTo?: string; // Tùy chỉnh đường dẫn redirect khi đã đăng nhập
   permission?: PermissionValue; // Quyền hạn cụ thể để truy cập trang
   canActivate?: GuardFn[];
   title?: string;
}

/** Helper giúp định nghĩa route metadata kèm theo tự động gợi ý (Autocomplete) */
export const defineRouteMeta = (meta: RouteMeta): RouteMeta => meta;
