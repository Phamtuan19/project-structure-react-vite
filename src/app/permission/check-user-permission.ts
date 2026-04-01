import { type Role, ROLE } from '@app/constants';
import { type Action } from '@app/constants/actions';

/**
 * Props cho hàm checkUserPermission — tổng hợp 2 lớp phân quyền.
 */
type CheckUserPermissionProps = {
   /** Cấp độ 1: Role config khai báo ở route. */
   routePermissions?: Role[];
   /** Cấp độ 2: Action config khai báo ở route. */
   allowedActions?: Action[];
   /** User đã đăng nhập hay chưa. */
   isAuthenticatedUser: boolean | undefined;
   /** Danh sách role của user hiện tại. */
   userRoles: Role[];
};

/**
 * Kiểm tra xem người dùng có quyền truy cập route hay không.
 *
 * Phân quyền 2 lớp (chạy tuần tự, trả về false ngay khi fail ở bất kỳ lớp nào):
 *
 * ── Lớp 1: Role ──────────────────────────────────────────────────────────────
 * Kiểm tra user có đúng role để vào route hay không.
 *
 *   undefined          → ai cũng vào được (public)
 *   []                 → chỉ người CHƯA đăng nhập (login/register page)
 *   [ROLE.USER]        → mọi user đã đăng nhập
 *   [ROLE.ADMIN]       → chỉ admin
 *   [ROLE.ADMIN, ...]  → admin hoặc các role cụ thể
 *
 * ── Lớp 2: Action ─────────────────────────────────────────────────────────────
 * Kiểm tra action (CRUD) được phép trên route.
 * Chỉ có ý nghĩa khi Lớp 1 đã pass (user đã có quyền vào route).
 *
 *   undefined          → full access (tất cả action)
 *   [ACTION.READ]      → chỉ được đọc, không create/update/delete
 *
 * @returns true = được phép truy cập đầy đủ, false = bị từ chối ở một lớp nào đó
 */
export const checkUserPermission = ({
   routePermissions,
   allowedActions,
   isAuthenticatedUser,
   userRoles,
}: CheckUserPermissionProps): boolean => {
   /**
    * ── Lớp 1: Role check ─────────────────────────────────────────────────────
    */
   if (!routePermissions) {
      // Public route → không block.
   } else if (routePermissions.length === 0) {
      // Auth-only route (login/register) → chỉ cho phép người CHƯA đăng nhập.
      if (isAuthenticatedUser) return false;
   } else if (routePermissions.includes(ROLE.USER)) {
      // Route yêu cầu đã login → kiểm tra isAuthenticated.
      if (!isAuthenticatedUser) return false;
   } else {
      // Route yêu cầu role cụ thể → kiểm tra intersection.
      if (!userRoles.includes(ROLE.ADMIN) && !userRoles.some((role) => routePermissions.includes(role))) {
         return false;
      }
   }

   /**
    * ── Lớp 2: Action check ───────────────────────────────────────────────────
    */
   if (!allowedActions) {
      // Không khai báo action → full access.
   } else if (!isAuthenticatedUser) {
      // Guest: chỉ được action READ nếu có trong danh sách.
      if (!allowedActions.includes('read')) return false;
   }
   // Đã login: không giới hạn action ở route-level (giới hạn chi tiết ở component).

   return true;
};
