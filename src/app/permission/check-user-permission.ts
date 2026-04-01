import { type Role, ROLE } from '@app/constants';

type CheckUserPermissionProps = {
   routePermissions: Role[] | undefined;
   isAuthenticatedUser: boolean | undefined;
   userRoles: Role[];
};

/**
 * Kiểm tra xem người dùng có quyền truy cập route hay không.
 *
 * Logic phân quyền được thiết kế theo 4 tầng:
 *
 * Tầng 1 — Không khai báo quyền (routePermissions = undefined | null)
 *   → Ai cũng được vào (không bảo vệ)
 *
 * Tầng 2 — Mảng rỗng (routePermissions = [])
 *   → Chỉ người CHƯA đăng nhập được vào
 *   → Dùng cho: route đăng nhập, đăng ký, quên mật khẩu…
 *
 * Tầng 3 — ROLE.USER (yêu cầu đã đăng nhập)
 *   → Bất kỳ user đã authenticate nào đều được vào
 *   → Dùng cho: trang profile, đổi mật khẩu, dashboard cá nhân…
 *
 * Tầng 4 — ROLE cụ thể (VD: [ROLE.ADMIN, ROLE.MANAGER])
 *   → Ưu tiên ADMIN: nếu user là ADMIN → cho vào ngay
 *   → Nếu không: kiểm tra xem user có role nào nằm trong danh sách cho phép
 *   → Dùng cho: trang quản trị, trang quản lý nhân sự…
 */
export const checkUserPermission = ({
   routePermissions,
   isAuthenticatedUser,
   userRoles,
}: CheckUserPermissionProps): boolean => {
   /**
    * Tầng 1: Route không khai báo quyền → cho phép tất cả mọi người (kể cả chưa login)
    */
   if (!routePermissions) {
      return true;
   }

   /**
    * Tầng 2: Route yêu cầu mảng rỗng []
    * → Chỉ cho phép người CHƯA đăng nhập (isAuthenticatedUser = false)
    * → Người đã login sẽ bị chặn (redirect đi chỗ khác)
    */
   if (routePermissions.length === 0) {
      return !isAuthenticatedUser;
   }

   /**
    * Tầng 3: Route yêu cầu ROLE.USER
    * → Tất cả người đã đăng nhập đều được vào, bất kể role cụ thể
    */
   if (routePermissions.includes(ROLE.USER)) {
      return !!isAuthenticatedUser;
   }

   /**
    * Tầng 4: Route yêu cầu role cụ thể (ví dụ [ADMIN, MANAGER])
    */

   /**
    * Ưu tiên kiểm tra ADMIN trước
    * → Nếu user là ADMIN thì được vào mọi route cụ thể
    */
   if (userRoles.includes(ROLE.ADMIN)) {
      return true;
   }

   /**
    * Kiểm tra giao của userRoles và routePermissions
    * → Trả về true nếu có ÍT NHẤT 1 role của user nằm trong danh sách quyền của route
    */
   return userRoles.some((role) => routePermissions.includes(role));
};
