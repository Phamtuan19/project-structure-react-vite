/**
 * Component hiển thị trang lỗi 500 Internal Server Error.
 */

import { Link } from 'react-router-dom';

const InternalServerError = () => {
   return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
         {/* Background */}
         <div className="absolute top-[-120px] left-[-120px] h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
         <div className="absolute right-[-120px] bottom-[-120px] h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />

         <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
            {/* Error Code */}
            <div className="mb-2 text-[120px] leading-none font-black tracking-tight text-white">500</div>

            {/* Badge */}
            <div className="mb-5 inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-300">
               Internal Server Error
            </div>

            {/* Title */}
            <h1 className="mb-3 text-3xl font-bold text-white">Đã xảy ra lỗi hệ thống</h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-md text-sm leading-6 text-slate-300">
               Hệ thống hiện đang gặp sự cố ngoài ý muốn. Vui lòng thử lại sau hoặc liên hệ quản trị viên nếu lỗi vẫn
               tiếp tục xảy ra.
            </p>

            {/* Actions */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
               <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-600"
               >
                  Thử lại
               </button>

               <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
               >
                  Về trang chủ
               </Link>
            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-500">
               Error Code: 500_INTERNAL_SERVER_ERROR
            </div>
         </div>
      </div>
   );
};

export default InternalServerError;
