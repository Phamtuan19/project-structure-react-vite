/**
 * Component hiển thị trang lỗi 403 Forbidden.
 */

import { Link } from 'react-router-dom';

const Forbidden = () => {
   return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-950">
         {/* Background */}
         <div className="absolute top-[-120px] left-[-120px] h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
         <div className="absolute right-[-120px] bottom-[-120px] h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

         <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
            {/* Error Code */}
            <div className="mb-2 text-[120px] leading-none font-black tracking-tight text-white">403</div>

            {/* Badge */}
            <div className="mb-5 inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1 text-sm font-medium text-orange-300">
               Access Denied
            </div>

            {/* Title */}
            <h1 className="mb-3 text-3xl font-bold text-white">Bạn không có quyền truy cập</h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-md text-sm leading-6 text-slate-300">
               Tài khoản của bạn hiện không được phép truy cập vào trang này. Vui lòng liên hệ quản trị viên hoặc quay
               lại trang trước.
            </p>

            {/* Actions */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
               <Link
                  to="/"
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-orange-600"
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
            <div className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-500">Error Code: 403_FORBIDDEN</div>
         </div>
      </div>
   );
};

export default Forbidden;
