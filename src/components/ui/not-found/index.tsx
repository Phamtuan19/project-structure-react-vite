/**
 * Component hiển thị trang lỗi 404 Not Found.
 */

import { Link } from 'react-router-dom';

const NotFound = () => {
   return (
      <div className="relative -m-6 flex h-full w-full items-center justify-center overflow-hidden bg-slate-950">
         {/* Background Blur */}
         <div className="absolute top-[-120px] left-[-120px] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
         <div className="absolute right-[-120px] bottom-[-120px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

         <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
            {/* 404 */}
            <div className="mb-2 text-[120px] leading-none font-black tracking-tight text-white">404</div>

            {/* Badge */}
            <div className="mb-5 inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-300">
               Oops! Page not found
            </div>

            {/* Title */}
            <h1 className="mb-3 text-3xl font-bold text-white">Trang bạn tìm kiếm không tồn tại</h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-md text-sm leading-6 text-slate-300">
               Có thể đường dẫn đã bị thay đổi, trang đã bị xoá hoặc bạn nhập sai URL. Hãy quay lại trang chủ để tiếp
               tục trải nghiệm.
            </p>

            {/* Actions */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
               <Link
                  to="/"
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-600"
               >
                  Về trang chủ
               </Link>

               <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
               >
                  Quay lại
               </button>
            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-500">Error Code: 404_NOT_FOUND</div>
         </div>
      </div>
   );
};

export default NotFound;
