import react from '@vitejs/plugin-react-swc'; // Sử dụng plugin React SWC cho Vite để tối ưu hóa React build
import path from 'path';
import { defineConfig } from 'vite'; // Hàm để định nghĩa cấu hình Vite
import { checker } from 'vite-plugin-checker'; // Kiểm tra lỗi TypeScript
import dynamicImport from 'vite-plugin-dynamic-import'; // Hỗ trợ dynamic imports
import svgr from 'vite-plugin-svgr'; // Vite plugin để xử lý SVG như React components
import tsconfigPaths from 'vite-tsconfig-paths'; // Hỗ trợ alias từ tsconfig
import tailwindcss from '@tailwindcss/vite'; // Hỗ trợ Tailwind CSS
// import viteCompression from 'vite-plugin-compression'; // Nén các file tĩnh
import strip from '@rollup/plugin-strip'; // Loại bỏ console.log và debugger trong quá trình build

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   const isDev = mode === 'development';

   return {
      base: '/',
      plugins: [
         react(),
         svgr({
            svgrOptions: {
               exportType: 'named', // Xuất dưới dạng named exports
               icon: true, // Cho phép dùng SVG như một icon
               ref: true, // Cho phép dùng ref trên SVG
               titleProp: true, // Cho phép thêm title vào SVG
               svgo: !isDev, // Tắt tối ưu hóa SVG
               svgoConfig: require('./svgo.config.cjs'), // Tải cấu hình SVGO từ file riêng
            },
            include: '**/*.svg', // Áp dụng plugin cho tất cả file .svg
         }),

         // Kiểm tra lỗi TypeScript trong quá trình phát triển
         checker({
            typescript: true,
         }),
         dynamicImport(),
         tsconfigPaths(),
         tailwindcss(),
         //  viteCompression({
         //     verbose: true, // In thông báo khi nén file
         //     threshold: 10240, // Chỉ nén các file lớn hơn 10KB
         //     algorithm: 'gzip', // Sử dụng thuật toán gzip để nén
         //     ext: '.gz', // Thêm phần mở rộng '.gz' cho các file nén
         //  }),
      ],
      server: {
         port: 8088,

         hmr: {
            overlay: false, // tránh crash giao diện dev khi gặp error
         },
         watch: {
            usePolling: isDev, // tự động bật polling khi chạy trong Docker/WSL
         },
      },
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
      },
      build: {
         outDir: 'dist', // Đường dẫn thư mục output của build
         assetsDir: 'assets', // Đường dẫn thư mục chứa các tài nguyên (hình ảnh, font, v.v)
         cssCodeSplit: true, // Tách các file CSS thành các chunks nhỏ
         treeShaking: true, // Tối ưu hóa mã nguồn bằng cách loại bỏ các mã không sử dụng

         // Cấu hình Rollup để phân chia chunk và tối ưu hóa output
         rollupOptions: {
            output: {
               input: 'src/client/main.tsx',

               // Cấu hình output phù hợp, không sử dụng splitChunks
               assetFileNames: 'assets/[name].[hash][extname]',
               chunkFileNames: 'chunks/[name].[hash].js',
               entryFileNames: 'assets/[name].[hash].js',

               // Tạo các chunk riêng cho các thư viện bên ngoài và components
               manualChunks(id) {
                  if (id.includes('node_modules')) {
                     if (id.includes('react')) return 'react-vendor';
                     if (id.includes('@mui') || id.includes('antd')) return 'ui-vendor';
                     return 'vendor';
                  }
               },
            },
            plugins: [
               strip({
                  include: ['**/*.ts', '**/*.tsx'], // Áp dụng cho tất cả các file TypeScript
                  functions: ['console.*', 'assert.*'], // Loại bỏ tất cả các console.* và assert.*
                  debugger: true, // Loại bỏ các debugger
               }),
            ],
         },

         // Tối ưu hóa JavaScript và CSS bằng Terser
         minify: 'terser', // Sử dụng Terser để nén mã nguồn JS
         sourcemap: false, // Tắt sourcemaps để giảm dung lượng output
         chunkSizeWarningLimit: 600, // Giới hạn cảnh báo kích thước chunk, nếu quá 600KB
         reportCompressedSize: false, // Tắt báo cáo kích thước nén của file output

         // Tùy chọn Terser để loại bỏ console.log và comment
         terserOptions: {
            compress: {
               drop_console: true, // Loại bỏ tất cả console.log
               drop_debugger: true, // Loại bỏ debugger
            },
            format: {
               comments: false, // Loại bỏ tất cả các comment trong mã nguồn
            },
         },
      },
      preview: {
         headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
         },
      },

      // Định nghĩa môi trường sản xuất
      define: {
         'process.env.NODE_ENV': JSON.stringify(mode), // Đảm bảo mã được tối ưu hóa cho production
         global: 'window',
      },
   };
});
