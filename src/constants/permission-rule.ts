/** Hệ thống Mã quyền phân chia theo Module và CRUD */
export const PERMISSION_RULE = {
   PRODUCT: {
      READ: 'PRODUCT.READ',
      CREATE: 'PRODUCT.CREATE',
      UPDATE: 'PRODUCT.UPDATE',
      DELETE: 'PRODUCT.DELETE',
   },
   USER: {
      READ: 'USER.READ',
      CREATE: 'USER.CREATE',
      UPDATE: 'USER.UPDATE',
      DELETE: 'USER.DELETE',
   },
} as const;
