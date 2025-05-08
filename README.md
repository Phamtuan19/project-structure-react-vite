# ⚙️ project-structure

> Cấu trúc dự án React 19 + Vite + TypeScript chuẩn production-ready.  
> Tích hợp sẵn: TailwindCSS, Ant Design 5, Redux Toolkit, React Query, i18next, SSR với Express, kiểm tra chất lượng mã, và hỗ trợ staging/production mode.

---

## 📝 Giới thiệu

**project-structure** là bộ khởi tạo (boilerplate) giúp bạn bắt đầu nhanh một dự án React hiện đại, tối ưu cho môi trường production. Dự án đã tích hợp sẵn các công nghệ phổ biến, cấu hình tối ưu, kiểm tra chất lượng mã, và hỗ trợ phát triển đa môi trường (staging/production). Phù hợp cho cá nhân, nhóm phát triển hoặc doanh nghiệp muốn tiết kiệm thời gian setup ban đầu.

## 📦 Công nghệ sử dụng

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [Ant Design 5](https://ant.design/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://react-query.tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)
- [Express](https://expressjs.com/) (SSR hỗ trợ Vite)
- ESLint + Prettier + Husky + Lint-staged

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

- `npm run dev` — Chạy server phát triển (hot reload)
- `npm run build` — Build production
- `npm run preview` — Xem thử bản build
- `npm run lint` — Kiểm tra chất lượng mã với ESLint
- `npm run format:fix` — Tự động format code với Prettier
- `npm run type:check` — Kiểm tra type với TypeScript

## 📁 Cấu trúc dự án

```text
src/
  ├── app/           # Cấu hình, provider, context, config, permission, routes cho app
  ├── assets/        # Tài nguyên tĩnh: images, icons, svg, ...
  ├── components/    # Component dùng chung (shared, ui, controller-form)
  ├── constants/     # Các hằng số dùng toàn dự án
  ├── helpers/       # Hàm hỗ trợ, helper function
  ├── hooks/         # Custom React hooks (use-auth, use-svg-icon, ...)
  ├── language/      # Đa ngôn ngữ, resources, global
  ├── layouts/       # Layout tổng thể (main-layout, ...)
  ├── pages/         # Các trang (home, auth, menu, errors, ...)
  ├── redux/         # Redux store, slice, rootReducer
  ├── routes/        # Định nghĩa route, private-route, auth-route
  ├── script/        # Script tự động hóa (work-flow-git, detect-package, ...)
  ├── services/      # (nếu có) Giao tiếp API, service layer
  ├── styles/        # File style global, tailwind, ...
  ├── types/         # Định nghĩa type, interface dùng chung
  ├── utils/         # Hàm tiện ích dùng chung
  ├── main.tsx       # Entry point FE
  ├── i18n.d.ts      # Định nghĩa type cho i18n
  ├── env.d.ts       # Định nghĩa type cho biến môi trường
public/              # File tĩnh public cho Vite
.vscode/             # Cấu hình VSCode workspace
.husky/              # Hook git (husky)
node_modules/        # Thư viện cài đặt qua npm/yarn
package.json         # Thông tin, script, dependency dự án
vite.config.ts       # Cấu hình Vite
tsconfig.json        # Cấu hình TypeScript
.eslintrc.cjs        # Cấu hình ESLint
.prettierrc          # Cấu hình Prettier
.gitignore           # File git ignore
Dockerfile           # Docker build config (nếu có)
```

### Giải thích các thư mục chính

- **app/**: Tập trung các cấu hình, provider, context, permission, routes cho toàn bộ ứng dụng. Đây là nơi khởi tạo các context, cấu hình global, và các provider quan trọng.
- **assets/**: Chứa tài nguyên tĩnh như hình ảnh, icon, SVG, ... dùng trong toàn dự án.
- **components/**: Các component tái sử dụng, chia nhỏ theo loại (shared, ui, controller-form) để dễ quản lý và mở rộng.
- **constants/**: Định nghĩa các hằng số dùng chung trong dự án (ví dụ: giá trị enum, key, ...).
- **helpers/**: Các hàm hỗ trợ, xử lý logic nhỏ lẻ, tách biệt khỏi business logic chính.
- **hooks/**: Custom React hooks, giúp tái sử dụng logic giữa các component (ví dụ: use-auth, use-svg-icon, ...).
- **language/**: Quản lý đa ngôn ngữ, resources, file global cho i18n.
- **layouts/**: Các layout tổng thể cho ứng dụng (main-layout, ...), giúp tổ chức giao diện nhất quán.
- **pages/**: Mỗi thư mục là một trang (route) lớn, có thể chứa các sub-page hoặc logic riêng cho từng trang.
- **redux/**: Quản lý state toàn cục với Redux Toolkit, bao gồm store, slice, rootReducer.
- **routes/**: Định nghĩa các loại route (private, auth, ...), giúp kiểm soát quyền truy cập và điều hướng.
- **script/**: Các script tự động hóa quy trình phát triển (ví dụ: git workflow, detect-package, ...).
- **services/**: (Nếu có) Chứa các hàm giao tiếp API, service layer, tách biệt logic gọi API khỏi component.
- **styles/**: File CSS, cấu hình Tailwind, các style global cho toàn dự án.
- **types/**: Định nghĩa type, interface dùng chung toàn dự án, giúp tăng tính type-safe khi phát triển.
- **utils/**: Các hàm tiện ích dùng chung, thường là các function nhỏ, không phụ thuộc vào business logic.
- **main.tsx**: Điểm khởi đầu của ứng dụng FE (frontend entry point).
- **i18n.d.ts, env.d.ts**: Định nghĩa type cho i18n và biến môi trường.
- **public/**: Chứa các file tĩnh public cho Vite (favicon, robots.txt, ...).
- **.vscode/**: Cấu hình workspace cho VSCode (settings, extensions đề xuất, ...).
- **.husky/**: Chứa các hook git (pre-commit, pre-push, ...).
- **package.json**: Thông tin dự án, script, dependency.
- **vite.config.ts**: Cấu hình Vite cho dự án.
- **tsconfig.json**: Cấu hình TypeScript.
- **.eslintrc.cjs**: Cấu hình ESLint.
- **.prettierrc**: Cấu hình Prettier.
- **.gitignore**: File cấu hình các file/thư mục bị git bỏ qua.
- **Dockerfile**: Cấu hình build Docker (nếu có).

---

_Dự án này giúp bạn tiết kiệm thời gian setup, tập trung phát triển tính năng!_
