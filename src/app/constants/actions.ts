import { z } from 'zod';

/**
 * CRUD action types — kiểm soát quyền ở mức độ hành động trên resource.
 *
 * Phân quyền theo Action là lớp thứ 2 (sau Role).
 * Ví dụ: user có ROLE.USER nhưng allowedActions chỉ là [READ]
 *         → được xem trang, không được tạo / sửa / xóa.
 *
 * Các giá trị được dùng kết hợp với RouteConfig.allowedActions.
 */
export const ACTION = {
   READ: 'read',
   CREATE: 'create',
   UPDATE: 'update',
   DELETE: 'delete',
} as const;

/**
 * Schema validation cho action type.
 * Dùng khi cần parse/validate action từ API hoặc config.
 */
export const ActionSchema = z.nativeEnum(ACTION);

/**
 * Inferred type từ ActionSchema.
 */
export type Action = z.infer<typeof ActionSchema>;
