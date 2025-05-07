import { theme, type ThemeConfig } from 'antd';

/**
 * Ant Design ConfigProvider
 *
 * - Cấu hình ngôn ngữ, kích thước component, direction (LTR/RTL), CSP.
 * - Hỗ trợ theme tùy biến toàn cục và từng component riêng biệt.
 * - Được dùng để bao bọc toàn bộ ứng dụng, đảm bảo style và hành vi nhất quán.
 *
 * @param locale Ngôn ngữ giao diện (vd: viVN, enUS)
 * @param direction Hướng layout: 'ltr' hoặc 'rtl'
 * @param componentSize Kích thước mặc định của các component ('small' | 'middle' | 'large')
 * @param iconPrefixCls Prefix cho icon (ít dùng)
 * @param csp Hỗ trợ CSP: truyền vào nonce nếu có
 * @param autoInsertSpaceInButton Tự động chèn khoảng trắng giữa các ký tự trong Button
 * @param theme Tùy biến theme toàn cục hoặc từng component (token + components)
 */

export const themeAntdConfig: ThemeConfig = {
   algorithm: theme.defaultAlgorithm,
   token: {
      //   colorPrimary: '#1677ff', // màu chủ đạo
      //   borderRadius: 8, // border-radius mặc định
      //   fontSize: 16, // cỡ chữ
   },
   components: {
      //   Button: {
      //      colorPrimary: '#ff4d4f',
      //      fontWeight: 600,
      //   },
   },
};
