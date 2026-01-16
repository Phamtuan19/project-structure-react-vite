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
  ├── app/                    # Core application logic
  │   ├── config/            # Application configurations
  │   │   ├── api/           # API configurations (axios, endpoints)
  │   │   ├── dayjs.config.ts # Date/time configuration
  │   │   ├── i18n/          # Internationalization setup
  │   │   ├── settings.ts    # App settings
  │   │   └── theme-antd/    # Ant Design theme configuration
  │   ├── constants/         # App-level constants
  │   ├── context/           # React contexts (notification, etc.)
  │   ├── permission/        # Permission management system
  │   ├── providers/         # App providers (notification, etc.)
  │   ├── routes/            # Route configuration and loadable components
  │   │   ├── config/        # Route configuration utilities
  │   │   └── router-provider.tsx # Router provider
  │   ├── index.tsx          # App component
  │   └── utils/             # App utilities (permissions, session storage)
  ├── assets/                # Static assets (icons, images, SVGs)
  ├── components/            # Reusable components
  │   ├── builder/           # Page builder components
  │   │   └── sections/      # Builder sections
  │   ├── controller-form/   # Form controllers (input, select, checkbox, etc.)
  │   ├── shared/            # Shared components (loading, error boundary, etc.)
  │   └── ui/                # UI components (navigation, etc.)
  ├── constants/             # Global constants (API endpoints, routes, menu)
  ├── helpers/               # Helper functions
  ├── hooks/                 # Custom React hooks (auth, debounced, etc.)
  ├── language/              # i18n resources and configuration
  │   ├── en.json            # English translations
  │   ├── vi.json            # Vietnamese translations
  │   └── resources.ts       # Language resources configuration
  ├── layouts/               # Layout components
  │   └── main-layout/       # Main application layout
  ├── pages/                 # Page components
  │   ├── auth/              # Authentication pages
  │   │   ├── register/      # User registration
  │   │   └── signin/        # User sign-in
  │   ├── errors/            # Error pages (403, 404, 500)
  │   ├── home/              # Home page
  │   └── not-found/         # 404 not found page
  ├── routes/                # Route definitions and guards
  │   ├── auth-route.tsx     # Authentication route guard
  │   ├── private-route.tsx  # Private route guard
  │   └── index.tsx          # Route configuration
  ├── script/                # Utility scripts
  │   ├── detect-package/    # Package manager detection
  │   └── work-flow-git/     # Git workflow scripts
  ├── store/                 # Zustand stores for state management
  │   └── auth-store/        # Authentication state management
  ├── styles/                # Global styles and CSS
  ├── test/                  # Test setup and utilities
  ├── types/                 # TypeScript type definitions
  ├── utils/                 # Utility functions (cn, cookies, etc.)
  ├── env.d.ts               # Environment type definitions
  ├── i18n.d.ts              # i18next type definitions
  └── main.tsx               # Application entry point
public/                      # Public static files (favicon, etc.)
dist/                        # Build output directory
node_modules/                # Dependencies
additional.d.ts              # Additional type definitions
reset.d.ts                   # CSS reset types
commitlint.config.cjs        # Commit linting configuration
lint-staged.config.cjs       # Lint-staged configuration
svgo.config.cjs              # SVGO configuration for icon optimization
package.json                 # Package configuration
vite.config.ts               # Vite build tool configuration
vitest.config.ts             # Vitest testing framework configuration
tsconfig.json                # TypeScript configuration
tsconfig.node.json           # TypeScript config for Node.js files
Dockerfile                   # Docker container configuration
yarn.lock                    # Yarn lockfile
```

### Giải thích các thư mục chính

- **app/**: Chứa logic cốt lõi của ứng dụng bao gồm cấu hình (API, i18n, theme), providers, context, hệ thống phân quyền và cấu hình routes.
- **assets/**: Tài nguyên tĩnh như icons, images, SVGs được sử dụng trong toàn bộ ứng dụng.
- **components/**: Components tái sử dụng, được tổ chức thành: shared (chung), ui (giao diện), controller-form (form controls), và builder (page builder).
- **constants/**: Hằng số và cấu hình dùng chung trong toàn dự án (API endpoints, routes, menu items).
- **helpers/**: Các hàm helper hỗ trợ xử lý logic nhỏ lẻ.
- **hooks/**: Custom React hooks để tái sử dụng logic giữa các components (auth, debounced, click outside, etc.).
- **language/**: Quản lý đa ngôn ngữ với i18next, chứa resources (EN/VI) và cấu hình.
- **layouts/**: Layout components cho các trang khác nhau (main layout).
- **pages/**: Page components được tổ chức theo tính năng (auth, errors, home, not-found).
- **routes/**: Định nghĩa các route types và route guards (auth routes, private routes).
- **script/**: Scripts tiện ích cho phát triển (package manager detection, git workflow).
- **store/**: Zustand stores cho state management toàn cục (authentication store).
- **styles/**: Styles global và cấu hình TailwindCSS.
- **test/**: Cấu hình và setup cho testing framework.
- **types/**: TypeScript type definitions và interfaces cho toàn bộ ứng dụng.
- **utils/**: Utility functions dùng chung (className utilities, cookie storage, etc.).
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
