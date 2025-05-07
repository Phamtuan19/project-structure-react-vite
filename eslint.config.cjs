module.exports = {
   // Đặt cấu hình này là root để ESLint không tìm kiếm các cấu hình ở các thư mục cha
   root: true,

   // Thiết lập môi trường (environment) để cho phép các biến global tương ứng với các môi trường được sử dụng
   env: {
      browser: true, // Môi trường trình duyệt (cho phép các global như `window`, `document`)
      es2020: true, // Sử dụng ES2020 như là phiên bản ECMAScript
      node: true, // Môi trường Node.js (cho phép các global như `process`, `module`)
   },

   // Các cấu hình mở rộng mà ESLint sẽ áp dụng cho dự án
   extends: [
      'eslint:recommended', // Cấu hình mặc định của ESLint, bao gồm các quy tắc cơ bản
      'plugin:import/recommended', // Khuyến nghị các quy tắc cho việc tổ chức các import trong dự án
      'plugin:jsx-a11y/recommended', // Khuyến nghị các quy tắc để đảm bảo tính khả dụng (accessibility) cho JSX
      'plugin:react/recommended', // Các quy tắc chuẩn cho việc phát triển ứng dụng React
      'plugin:react/jsx-runtime', // Cấu hình cho JSX runtime trong React
      'plugin:react-hooks/recommended', // Các quy tắc dành riêng cho React hooks (chẳng hạn như `useEffect`, `useState`, v.v.)
      'plugin:security/recommended', // Các quy tắc bảo mật cho mã nguồn
      'prettier', // Tích hợp Prettier để định dạng mã nguồn theo chuẩn (giúp đồng bộ hóa style)
   ],

   // Danh sách các thư mục và file mà ESLint sẽ bỏ qua khi kiểm tra
   ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.js'],

   // Các cấu hình đặc biệt cho các loại file khác nhau
   overrides: [
      {
         // Cấu hình dành riêng cho các file TypeScript (*.ts và *.tsx)
         files: ['*.ts', '*.tsx'],
         extends: [
            'plugin:@typescript-eslint/eslint-recommended', // Các quy tắc cho TypeScript
            'plugin:@typescript-eslint/recommended', // Các quy tắc khuyến nghị cho TypeScript
            'plugin:import/typescript', // Quy tắc import cho TypeScript
         ],
         parser: '@typescript-eslint/parser', // Sử dụng parser của TypeScript để ESLint có thể hiểu được mã TypeScript
         parserOptions: {
            // Thiết lập cấu hình cho TypeScript (chỉ định tsconfig để ESLint hiểu cấu hình của dự án)
            project: ['./tsconfig.json', './tsconfig.node.json'],
            tsconfigRootDir: __dirname, // Đặt thư mục gốc của tsconfig
         },
         plugins: ['@typescript-eslint'], // Sử dụng plugin TypeScript của ESLint
         rules: {
            // Các quy tắc đặc biệt cho TypeScript
            '@typescript-eslint/no-misused-promises': [
               'error',
               { checksVoidReturn: { arguments: false, attributes: false } },
            ],
            '@typescript-eslint/ban-types': ['error', { extendDefaults: true, types: { '{}': false } }],
            '@typescript-eslint/naming-convention': [
               'warn',
               {
                  selector: 'default',
                  format: ['camelCase', 'PascalCase', 'UPPER_CASE'], // Quy tắc đặt tên theo các chuẩn như camelCase, PascalCase
                  leadingUnderscore: 'allow', // Cho phép dấu gạch dưới ở đầu biến
               },
            ],
         },
      },
      {
         // Cấu hình dành riêng cho các file kiểu định nghĩa TypeScript (*.d.ts) và các file cấu hình khác
         files: [
            '*.d.ts',
            'prettier.config.ts', // File cấu hình Prettier
            'tailwind.config.ts', // File cấu hình TailwindCSS
            'vite.config.ts', // File cấu hình Vite
            './src/pages/**/*.tsx', // Các file trang trong thư mục src
         ],
         rules: {
            'import/no-default-export': 'off', // Tắt quy tắc không cho phép export mặc định
            'react/display-name': 'off', // Tắt quy tắc yêu cầu hiển thị tên component trong React
         },
      },
   ],

   // Các cấu hình liên quan đến parser cho JSX
   parserOptions: {
      ecmaFeatures: {
         jsx: true, // Cho phép cú pháp JSX
      },
   },

   // Các plugin mà ESLint sẽ sử dụng
   plugins: [
      'filename-rules', // Kiểm tra quy tắc tên file
      'import', // Kiểm tra quy tắc import
      'jsdoc', // Kiểm tra việc sử dụng JSDoc
      'jsx-a11y', // Kiểm tra tính khả dụng của JSX
      'react', // Các quy tắc dành cho React
      'react-hooks', // Các quy tắc dành cho React hooks
      'react-refresh', // Kiểm tra cho React Refresh (HMR)
      'security', // Các quy tắc bảo mật
      'tsdoc', // Kiểm tra cú pháp TSDoc
   ],

   // Các quy tắc được áp dụng cho toàn bộ dự án
   rules: {
      //   'import/order': [
      //      'error',
      //      {
      //         'newlines-between': 'always', // Yêu cầu có khoảng trắng giữa các nhóm import
      //         pathGroups: [
      //            { pattern: '@app', group: 'internal' },
      //            { pattern: '@app/**', group: 'internal' },

      //            { pattern: '@components', group: 'internal' },
      //            { pattern: '@components/**', group: 'internal' },
      //         ],
      //         groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index'], 'unknown'], // Quy định nhóm import
      //         alphabetize: { order: 'asc', caseInsensitive: true }, // Sắp xếp import theo thứ tự chữ cái
      //      },
      //   ],
      'import/no-default-export': 'error',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-syntax': 'warn',
      'jsdoc/no-blank-blocks': 'warn',
      'jsdoc/require-jsdoc': [
         'warn',
         {
            publicOnly: true,
            require: {},
            enableFixer: true,
         },
      ],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': ['warn', { checkDestructuredRoots: false }],
      'jsdoc/require-throws': 'error',
      'jsdoc/require-hyphen-before-param-description': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/tag-lines': ['warn', 'never', { startLines: 1 }],
      'jsdoc/sort-tags': 'warn',
      'react/button-has-type': 'error',
      'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
      'react/display-name': 'warn',
      'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react/jsx-curly-brace-presence': 'warn',
      'react/jsx-fragments': 'error',
      'react/jsx-max-depth': ['error', { max: 20 }],
      'react/jsx-no-script-url': 'error',
      'react/jsx-pascal-case': 'error',
      'jsx-a11y/label-has-associated-control': 'off',
      'react/no-array-index-key': 'off',
      'react/no-children-prop': 'error',
      'react/no-danger': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-unused-prop-types': 'error',
      'react/no-unstable-nested-components': ['off' | 'warn' | 'error', { allowAsProps: true | false }],
      'react/prefer-stateless-function': 'error',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'tsdoc/syntax': 'warn',
   },

   // Cấu hình cho resolver của import
   settings: {
      'import/resolver': {
         node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'], // Các phần mở rộng mà ESLint sẽ sử dụng khi giải quyết import
         },
         typescript: true, // Cho phép giải quyết các import TypeScript
      },
      react: {
         version: 'detect', // Tự động phát hiện phiên bản React đang sử dụng
      },
   },
};
