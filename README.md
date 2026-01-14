# 🚀 Project Structure - React Boilerplate

> Cấu trúc dự án React 19 + Vite + TypeScript chuẩn production-ready.
> Tích hợp sẵn: TailwindCSS, Ant Design 5, Zustand, TanStack Query, i18next, Sentry, kiểm tra chất lượng mã, và hỗ trợ staging/production mode.

## 📝 Giới thiệu

**project-structure** là bộ khởi tạo (boilerplate) giúp bạn bắt đầu nhanh một dự án React hiện đại, tối ưu cho môi trường production. Dự án đã tích hợp sẵn các công nghệ phổ biến, cấu hình tối ưu, kiểm tra chất lượng mã, và hỗ trợ phát triển đa môi trường (staging/production). Phù hợp cho cá nhân, nhóm phát triển hoặc doanh nghiệp muốn tiết kiệm thời gian setup ban đầu.

## 📦 Công nghệ sử dụng

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [Ant Design 5](https://ant.design/)
- [Zustand](https://zustand-demo.pmnd.rs/) - State Management
- [TanStack Query](https://tanstack.com/query/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)
- [Sentry](https://sentry.io/) - Error Monitoring
- ESLint + Prettier + Husky + Lint-staged
- [Vitest](https://vitest.dev/) - Testing Framework

---

## 🚀 Quick Start

```sh
# Clone project
 git clone <repo-url> your-app
 cd your-app

# Cài đặt dependencies
 npm install

# Chạy dev server
 npm run dev
```

## 🛠️ Các lệnh phát triển

### Development

- `npm run dev` — Chạy development server (hot reload)
- `npm run staging` — Chạy server với mode staging
- `npm run production` — Chạy server với mode production

### Build

- `npm run build` — Build cho production
- `npm run build-staging` — Build cho staging
- `npm run build-production` — Build cho production
- `npm run preview` — Preview production build

### Code Quality

- `npm run lint` — Kiểm tra code với ESLint
- `npm run lint:fix` — Tự động fix ESLint issues
- `npm run format:check` — Kiểm tra format với Prettier
- `npm run format:fix` — Tự động format code
- `npm run type:check` — Kiểm tra TypeScript types
- `npm run validate` — Chạy lint + type check

### Testing

- `npm run test` — Chạy tests
- `npm run test:run` — Chạy tests (headless)
- `npm run test:ui` — Chạy tests với UI
- `npm run test:coverage` — Chạy tests với coverage report

### Utilities

- `npm run setup` — Setup project (git init + husky)

## 📁 Cấu trúc dự án

```text
src/
  ├── app/           # Cấu hình, provider, context, permission, routes
  │   ├── config/    # API, i18n, theme, dayjs configs
  │   ├── context/   # React contexts
  │   ├── providers/ # App providers (notification, etc.)
  │   ├── routes/    # Route configuration và loadable
  │   └── utils/     # App utilities (session storage, permissions)
  ├── assets/        # Static assets (icons, images)
  ├── components/    # Reusable components
  │   ├── builder/   # Page builder components
  │   ├── controller-form/ # Form controllers (input, select, etc.)
  │   ├── shared/    # Shared components (error boundary, loading, etc.)
  │   └── ui/        # UI components
  ├── constants/     # Application constants
  ├── helpers/       # Helper functions
  ├── hooks/         # Custom React hooks
  ├── language/      # i18n resources và configuration
  ├── layouts/       # Layout components
  ├── pages/         # Page components
  │   ├── auth/      # Authentication pages
  │   ├── cms/       # CMS pages
  │   └── errors/    # Error pages
  ├── store/         # Zustand stores
  ├── routes/        # Route definitions
  ├── styles/        # Global styles
  ├── test/          # Test setup
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  └── main.tsx       # Application entry point
public/              # Public static files
node_modules/        # Dependencies
package.json         # Package configuration
vite.config.ts       # Vite configuration
tsconfig.json        # TypeScript configuration
.eslintrc.cjs        # ESLint configuration
Dockerfile           # Docker configuration
```

### Giải thích các thư mục chính

- **app/**: Chứa các cấu hình core của ứng dụng (API, i18n, theme), providers, context, permission system và route configuration.
- **assets/**: Tài nguyên tĩnh như icons, images được sử dụng trong toàn bộ ứng dụng.
- **components/**: Components tái sử dụng, được chia thành các nhóm: shared (chung), ui (giao diện), controller-form (form controls), và builder (page builder).
- **constants/**: Hằng số và cấu hình dùng chung trong toàn dự án.
- **helpers/**: Các hàm helper hỗ trợ xử lý logic nhỏ lẻ.
- **hooks/**: Custom React hooks để tái sử dụng logic giữa các components.
- **language/**: Quản lý đa ngôn ngữ với i18next, chứa resources và cấu hình.
- **layouts/**: Layout components cho các trang khác nhau (CMS layout, main layout).
- **pages/**: Page components được tổ chức theo tính năng (auth, cms, errors, home).
- **store/**: Zustand stores cho state management toàn cục.
- **routes/**: Định nghĩa các route types (auth routes, private routes, CMS routes).
- **styles/**: Styles global, Tailwind configuration.
- **types/**: TypeScript type definitions và interfaces.
- **utils/**: Utility functions dùng chung.
- **main.tsx**: Entry point của React application.

## 🔧 Tính năng chính

- **🔐 Authentication**: JWT-based auth với refresh token
- **👥 Role-based Access Control**: Permission system với roles
- **🌐 Internationalization**: Đa ngôn ngữ (EN/VI)
- **🎨 Modern UI**: Ant Design 5 + TailwindCSS
- **📱 Responsive**: Mobile-first design
- **⚡ Performance**: Code splitting, lazy loading, optimized builds
- **🐛 Error Handling**: Error boundaries với Sentry integration
- **🧪 Testing**: Vitest + React Testing Library
- **🚀 Production Ready**: Docker support, CI/CD ready

## 📄 License

This project is private and proprietary.
