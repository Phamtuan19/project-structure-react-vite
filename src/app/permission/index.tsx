 
import { useMemo } from 'react';
import { useNavigate, useRoutes, useLocation, matchRoutes, type RouteObject } from 'react-router';
import { SETTINGS_CONFIG } from '../config';
import { flattenRoutes, ROUTES } from '../routes';
import { getSessionRedirectUrl, resetSessionRedirectUrl, setSessionRedirectUrl } from '../utils';
import { checkUserPermission } from './check-user-permission';
import type { Role } from '../constants';
import { useAuth, useDeepCompareEffect } from '@hooks';
import { ROUTE_PATH } from '@constants';

/** URL mặc định để redirect khi user chưa đăng nhập — thường là trang login. */
const { SIGN_IN_REDIRECT_URL } = SETTINGS_CONFIG;

/** Danh sách tất cả routes đã flatten (ghĩa: nested routes được san phẳng thành 1 mảng).
 *  Dùng cho matchRoutes() để tìm route tương ứng với pathname hiện tại. */
const flattenedRoutes = flattenRoutes(ROUTES);

/**
 * Permission component — bảo vệ routes dựa trên auth config và chuyển hướng
 * người dùng khi không có quyền truy cập.
 *
 * Logic:
 * 1. Chờ auth khởi tạo xong (isInitialized + không loading)
 * 2. Tìm route đang truy cập bằng `id` (chính xác hơn so sánh path string)
 * 3. Gọi checkUserPermission với auth config của route
 * 4. Redirect phù hợp:
 *    - Chưa login + không có quyền → lưu URL hiện tại → redirect signin
 *    - Đã login + không có quyền  → redirect về home
 *    - Đã login + đang ở /auth    → redirect ra khỏi auth pages
 */
export const Permission = () => {
   const auth = useAuth();
   const { isAuthenticated, isInitialized, isLoading } = auth;

   /**
    * Trích xuất danh sách role của user hiện tại từ auth state.
    *
    * Lý do dùng useMemo: user object có thể thay đổi reference khi data thay đổi,
    * nên cần memoize để tránh re-render không cần thiết.
    * Nếu user = null → mảng rỗng → checkUserPermission sẽ trả false ở các route yêu cầu login.
    */
   const userRoles: Role[] = useMemo(() => (auth.user ? [auth.user.roles] : []), [auth.user]);

   /** Dùng useNavigate để chuyển hướng trong react-router v6. */
   const navigate = useNavigate();

   /** Render các route đã được định nghĩa trong ROUTES.
    *  useRoutes thay thế cho <Routes>/<Route> khi muốn render routes bên trong component. */
   const routes = useRoutes(ROUTES as RouteObject[]);

   /** pathname hiện tại từ URL — dùng để match với route config. */
   const { pathname } = useLocation();

   /**
    * Kiểm tra xem pathname hiện tại có phải auth route hay không.
    * Auth route = các trang /auth/* (signin, signup, forgot-password...).
    *
    * Mục đích: Khi user đã đăng nhập mà vẫn cố vào trang login,
    * component sẽ redirect ra khỏi /auth thay vì giữ ở đó.
    */
   const isAuthRoute = pathname.startsWith('/auth');

   /**
    * redirectUnauthorized — xử lý chuyển hướng khi user không có quyền truy cập route.
    *
    * Hai trường hợp:
    * 1. Chưa đăng nhập (isAuthenticated = false)
    *    → Redirect thẳng đến trang signin.
    *    → KHÔNG lưu session URL vì user chưa login → chưa có "trang trước đó" hợp lệ.
    *
    * 2. Đã đăng nhập nhưng không có quyền (isAuthenticated = true)
    *    → Lấy URL đã lưu trước đó (setSessionRedirectUrl) làm redirect target.
    *    → Nếu không có URL lưu → fallback về SIGN_IN_REDIRECT_URL.
    *    → Sau khi redirect xong → xóa session URL (resetSessionRedirectUrl)
    *      để tránh reuse URL cũ cho lần redirect tiếp theo.
    *
    * Lưu ý: Hàm này KHÔNG xử lý việc lưu URL — việc lưu URL được gọi
    * trước khi hàm này được invoke (bên trong useDeepCompareEffect).
    */
   const redirectUnauthorized = () => {
      /** Lấy URL đã lưu trong sessionStorage (VD: '/profile' khi user bị redirect từ trang profile).
       *  Fallback về SIGN_IN_REDIRECT_URL nếu không có URL nào được lưu. */
      const redirectUrl = getSessionRedirectUrl() || SIGN_IN_REDIRECT_URL;

      if (!isAuthenticated) {
         /** Chưa login → chuyển hướng đến trang đăng nhập.
          *  Không cần resetSessionRedirectUrl ở đây vì chưa login thì chưa lưu URL hợp lệ. */
         navigate(SIGN_IN_REDIRECT_URL);
      } else {
         /** Đã login + không có quyền → xóa URL cũ rồi redirect đến URL đã lưu (hoặc '/').
          *  resetSessionRedirectUrl đảm bảo mỗi redirect chỉ dùng URL 1 lần. */
         resetSessionRedirectUrl();
         navigate(redirectUrl);
      }
   };

   /**
    * Effect chính — chạy mỗi khi auth state hoặc pathname thay đổi.
    *
    * useDeepCompareEffect thay vì useEffect thuần:
    * Vì userRoles là mảng được tạo bằng useMemo, dùng deep comparison
    * để đảm bảo effect re-run khi NỘI DUNG mảng role thay đổi
    * (không chỉ reference thay đổi).
    */
   useDeepCompareEffect(() => {
      /**
       * Bước 1: Guard clause — không làm gì nếu auth chưa khởi tạo xong.
       *
       * isInitialized: auth store đã resolve trạng thái (đã login thật hay chưa).
       * isLoading: không có request nào đang pending (tránh race condition).
       *
       * Nếu bỏ qua bước này, checkUserPermission sẽ chạy với
       * isAuthenticated = undefined → kết quả sai.
       */
      if (!isInitialized || isLoading) return;

      /**
       * Bước 2: Tìm route tương ứng với pathname hiện tại.
       *
       * matchRoutes: API của react-router v6 để match URL với route tree.
       * Nó trả về mảng các matched routes (parent + child), ta chỉ lấy index 0 = route gần nhất.
       *
       * matchedRoutes?.[0] có thể undefined nếu URL không khớp route nào
       * (VD: 404 page). Trong trường hợp này → return để không redirect linh tinh.
       */
      const matchedRoutes = matchRoutes(flattenedRoutes as RouteObject[], pathname);
      const matched = matchedRoutes?.[0];
      if (!matched || !matched.route) return;

      /**
       * Bước 3: Map matched.route (từ react-router) về route config gốc trong flattenedRoutes.
       *
       * flattenRoutes() trả về mảng route config có thêm trường `auth` và `id`.
       * react-router's matched.route chỉ có `path`, `id`, `index` — không có `auth`.
       *
       * Matching strategy:
       * - Nếu route gốc có `id` → so sánh bằng id (chuẩn nhất, tránh conflict giữa /:id và /users).
       * - Nếu không có `id` → so sánh bằng path.
       * - Nếu là index route → so sánh cả hai đều là index=true.
       *
       * Lý do không dùng matched.route.id trực tiếp: matched.route có thể là
       * lazy route object chưa resolved, nên cần tìm lại trong flattenedRoutes
       * để lấy đầy đủ config (auth, id, path...).
       */
      const matchedRouteConfig = flattenedRoutes.find((route) =>
         route.id
            ? route.id === (matched.route as Record<string, unknown>).id
            : route.path === matched.route.path || (route.index === true && matched.route.index === true),
      );

      if (!matchedRouteConfig) return;

      /**
       * Bước 4: Kiểm tra quyền truy cập.
       *
       * checkUserPermission là pure function — nhận vào:
       *   - routePermissions: auth config khai báo ở route (VD: [ROLE.USER] hoặc [] hoặc undefined).
       *   - isAuthenticatedUser: user đã login chưa.
       *   - userRoles: danh sách role của user (dùng cho Tầng 4 — role cụ thể).
       *
       * Trả về boolean: true = được phép, false = không được phép.
       * Kết quả này quyết định luồng redirect bên dưới.
       */
      const userHasPermission = checkUserPermission({
         routePermissions: matchedRouteConfig.auth,
         isAuthenticatedUser: isAuthenticated,
         userRoles,
      });

      /**
       * Bước 5: Redirect người dùng đã login ra khỏi auth pages.
       *
       * Khi user đã đăng nhập (isAuthenticated = true) nhưng URL vẫn là /auth/*
       * (VD: đang ở /auth/signin mà chưa logout), component sẽ redirect ra ngoài.
       *
       * Redirect target ưu tiên:
       *   1. URL đã lưu trong sessionStorage (VD: '/profile' nếu user bị redirect
       *      từ /profile → /auth/signin rồi login lại → về /profile).
       *   2. SIGN_IN_REDIRECT_URL (/) nếu không có URL nào được lưu.
       *
       * Điều kiện: isAuthRoute = pathname.startsWith('/auth')
       * Cần check điều này để tránh redirect loop khi /auth/signin tự redirect
       * về chính nó.
       */
      if (isAuthenticated && isAuthRoute) {
         navigate(getSessionRedirectUrl() || SETTINGS_CONFIG.SIGN_IN_REDIRECT_URL);
         return;
      }

      /**
       * Bước 6: Lưu URL hiện tại khi user không có quyền (chuẩn bị cho redirect).
       *
       * Session URL dùng để: sau khi user login xong, quay lại đúng trang
       * mà họ đang cố truy cập trước đó.
       *
       * Hai trường hợp lưu:
       * - isAuthenticated = true (đã login nhưng không có quyền)
       *   → Lưu SIGN_IN_REDIRECT_URL ('/') — vì user đã login rồi,
       *     nên "trang trước đó" không còn ý nghĩa, redirect về home là hợp lý.
       *   → Cũng tránh trường hợp user lặp redirect loop giữa các trang không có quyền.
       *
       * - isAuthenticated = false (chưa login)
       *   → Lưu pathname hiện tại (VD: '/profile') — đây là trang mà user
       *     MUỐN vào, nên sau khi login xong cần quay lại đây.
       *
       * KHÔNG lưu nếu pathname === /auth/signin vì đó là trang login,
       * không có URL "trước đó" hữu ích để quay lại.
       */
      if (!userHasPermission && pathname !== ROUTE_PATH.SIGN_IN) {
         if (isAuthenticated) {
            setSessionRedirectUrl(SETTINGS_CONFIG.SIGN_IN_REDIRECT_URL);
         } else {
            setSessionRedirectUrl(pathname);
         }
      }

      /**
       * Bước 7: Redirect khi không có quyền.
       *
       * Gọi redirectUnauthorized() chỉ khi user thực sự không có quyền.
       * redirectUnauthorized() sẽ:
       *   - Chưa login → navigate('/auth/signin')
       *   - Đã login   → navigate('/')
       *
       * Việc tách riêng Bước 6 (lưu URL) và Bước 7 (redirect) là cố ý:
       * setSessionRedirectUrl() phải được gọi TRƯỚC navigate() để URL được ghi
       * vào sessionStorage KỊP THỜI trước khi trang chuyển.
       */
      if (!userHasPermission) {
         redirectUnauthorized();
      }
   }, [pathname, isAuthenticated, isInitialized, isLoading, userRoles]);

   /** Render outlet — các child routes được render tại đây bởi useRoutes(ROUTES). */
   return <>{routes}</>;
};
