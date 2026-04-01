import type { Role } from '@app/constants';
import type { Action } from '@app/constants/actions';
import type { OverrideProps } from '@types';
import type { RouteObject } from 'react-router';

/**
 * Unique identifier for each route — dùng để lookup thay vì so sánh path string,
 * tránh trường hợp duplicate path hoặc wildcard route gây nhầm lẫn.
 */
export type RouteId = string;

/**
 * Props for a route in the application.
 *
 * @param path - URL path (VD: '/auth/signin', '*')
 * @param id   - Unique identifier để lookup chính xác thay vì dùng path
 * @param auth - Quyền truy cập route:
 *   - undefined → ai cũng vào được (public)
 *   - []        → chỉ người chưa đăng nhập
 *   - [ROLE.USER]           → mọi user đã đăng nhập
 *   - [ROLE.ADMIN]          → chỉ admin
 *   - [ROLE.ADMIN, ROLE.MANAGER] → admin hoặc manager
 */
export type RouteProps = OverrideProps<RouteObject, { path?: string; children?: RouteProps[] }> & {
   /** Quyền truy cập theo Role (cấp độ 1). Xem chi tiết ở checkUserPermission. */
   auth?: Role[];

   /**
    * Quyền truy cập theo Action — giới hạn hành động CRUD trên route.
    *
    * - undefined → full access (tất cả action)
    * - [ACTION.READ] → chỉ được xem, không create/update/delete
    * - [ACTION.READ, ACTION.UPDATE] → xem và sửa, không tạo mới
    *
    * Dùng cho: trang detail chỉ đọc, trang tạo mới chỉ có quyền CREATE...
    */
   allowedActions?: Action[];
};
