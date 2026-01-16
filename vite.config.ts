import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '');

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
               svgo: false, // Tắt tối ưu hóa SVG
               svgoConfig: require('./svgo.config.cjs'), // Tải cấu hình SVGO từ file riêng
            },
            include: '**/*.svg', // Áp dụng plugin cho tất cả file .svg
         }),
         checker({ typescript: false }),
         tsconfigPaths(),
         dynamicImport(),
      ],
      optimizeDeps: {
         exclude: ['pdfjs-dist', 'pdfjs-dist/legacy/build/pdf', 'pdfjs-dist/legacy/build/pdf.worker.min'],
      },
      server: {
         hmr: {
            overlay: false, // Tắt overlay nếu gặp lỗi HMR
         },
         watch: {
            usePolling: true, // Hữu ích khi chạy trên WSL, Docker hoặc hệ thống file chậm
         },
         //  host: true,
         port: 3000,
      },
      define: {
         'process.env': env,
         global: 'window',
      },
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
      },
   };
});
