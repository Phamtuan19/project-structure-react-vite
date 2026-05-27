import { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import { WifiOutlined } from '@ant-design/icons';

const Loading = () => {
   const [showSlowWarning, setShowSlowWarning] = useState(false);

   useEffect(() => {
      const startTime = performance.now();

      // Hẹn giờ 2.5 giây để hiển thị cảnh báo kết nối chậm
      const slowTimer = setTimeout(() => {
         setShowSlowWarning(true);
      }, 2500);

      return () => {
         clearTimeout(slowTimer);

         const endTime = performance.now();
         const duration = endTime - startTime;

         // Báo cáo tốc độ load trang trong console và hiển thị cảnh báo
         if (duration > 2000) {
            console.warn(`⚠️ [Performance] Tải trang chậm: ${duration.toFixed(0)}ms`);
            void message.warning({
               content: `Tải trang hơi chậm (${(duration / 1000).toFixed(1)} giây). Vui lòng kiểm tra lại kết nối mạng.`,
               duration: 4.5,
               key: 'slow-load-warning', // Tránh hiển thị trùng lặp tin nhắn
            });
         } else {
            console.log(`⚡ [Performance] Tải trang hoàn tất: ${duration.toFixed(0)}ms`);
         }
      };
   }, []);

   return (
      <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center bg-white/70 select-none">
         <Spin size="large" />

         {showSlowWarning && (
            <div className="mt-4 flex animate-pulse items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600 shadow-xs">
               <WifiOutlined />
               <span>Kết nối đang chậm. Vui lòng đợi trong giây lát...</span>
            </div>
         )}
      </div>
   );
};

export default Loading;
