import type { GuardFn, PermissionValue } from './route.type';

// permissionGuard: Kiểm tra xem user có mã quyền (permission code) cụ thể hay không
export const permissionGuard =
   (requiredPermission: PermissionValue): GuardFn =>
   ({ auth }) => {
      // Lấy danh sách quyền từ thông tin user (ví dụ: auth.user.permissions)
      const userPermissions: string[] = auth.user?.permissions || [];

      return userPermissions.includes(requiredPermission) ? true : false;
   };
