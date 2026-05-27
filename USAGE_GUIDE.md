# 📘 Hướng dẫn Sử dụng Project Structure React Vite

Tài liệu này cung cấp hướng dẫn chi tiết cách phát triển và mở rộng ứng dụng dựa trên cấu trúc dự án hiện tại.

---

## 1. Cài đặt ban đầu

Yêu cầu: **Node.js 20+** và **npm/yarn/pnpm**.

```bash
# Cài đặt dependencies
npm install

# Khởi tạo git và husky (nếu mới clone)
npm run setup
```

---

## 2. Các lệnh Scripts quan trọng

| Lệnh                 | Mô tả                                                         |
| :------------------- | :------------------------------------------------------------ |
| `npm run dev`        | Chạy môi trường phát triển (Hot Reload)                       |
| `npm run build`      | Build dự án cho môi trường production                         |
| `npm run preview`    | Xem trước bản build production tại local                      |
| `npm run validate`   | Chạy cả `lint` và `type:check` (Khuyên dùng trước khi commit) |
| `npm run test`       | Chạy các unit test với Vitest                                 |
| `npm run format:fix` | Tự động sửa lỗi định dạng code bằng Prettier                  |

---

## 3. Cách thêm một Trang mới (New Page)

Dự án sử dụng hệ thống **Dynamic Loadable**. Bạn không cần import thủ công vào router nếu tuân thủ quy tắc đặt tên.

### Bước 1: Tạo file trang

Tạo thư mục và file tại `src/pages/{tên-trang}/index.tsx`.
Ví dụ: `src/pages/dashboard/index.tsx`

### Bước 2: Khai báo Route

Mở `src/routes/private-route.tsx` (hoặc `auth-route.tsx`) và thêm vào mảng `children`:

```tsx
{
  id: 'dashboard', // Unique ID
  path: '/dashboard',
  element: loadable({ path: 'dashboard' }), // path khớp với tên thư mục trong src/pages
  auth: ['ADMIN'], // (Tùy chọn) Chỉ cho phép ADMIN truy cập
}
```

---

## 4. Sử dụng Hệ thống Phân quyền (RBAC)

Hệ thống sử dụng thuộc tính `auth` trong định nghĩa route:

- `auth: undefined` (mặc định): Công khai, ai cũng vào được.
- `auth: []`: Yêu cầu đã đăng nhập (bất kể role nào).
- `auth: ['ADMIN', 'MANAGER']`: Yêu cầu đăng nhập và phải có một trong các role này.

---

## 5. Quản lý State với Zustand

Tạo store mới trong `src/store/{tên-store}/`:

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AppState {
   count: number;
   increment: () => void;
}

export const useAppStore = create<AppState>()(
   immer((set) => ({
      count: 0,
      increment: () =>
         set((state) => {
            state.count += 1;
         }),
   })),
);
```

---

## 6. Đa ngôn ngữ (i18n)

1. Thêm key dịch vào `src/language/vi.json` và `src/language/en.json`.
2. Sử dụng hook `useTranslation` trong component:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
   const { t } = useTranslation();
   return <h1>{t('common.welcome')}</h1>;
};
```

---

## 7. Quy trình Commit Code

Dự án áp dụng **Conventional Commits**. Khi commit, bạn phải tuân thủ format:
`<type>(<scope>): <subject>`

Các type phổ biến:

- `feat`: Tính năng mới.
- `fix`: Sửa lỗi.
- `docs`: Thay đổi tài liệu.
- `style`: Thay đổi format code (không ảnh hưởng logic).
- `refactor`: Tái cấu trúc code.
- `perf`: Cải thiện hiệu năng.

_Ví dụ:_ `git commit -m "feat(auth): thêm chức năng quên mật khẩu"`

---

## 8. Cấu hình UI & Theme

- **Tailwind v4**: Chỉnh sửa tại `src/styles/global.css`.
- **Ant Design**: Chỉnh sửa theme (colors, border radius...) tại `src/app/config/theme-antd.ts`.

---

> [!NOTE]
> Mọi thay đổi về cấu trúc thư mục lớn nên được thảo luận với team lead để đảm bảo tính nhất quán của Boilerplate.
