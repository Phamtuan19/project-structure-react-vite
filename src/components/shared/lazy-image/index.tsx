/* eslint-disable jsdoc/check-indentation */
/* eslint-disable @typescript-eslint/naming-convention */
import { cn } from '@utils';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageType extends React.ImgHTMLAttributes<HTMLImageElement> {
   /** Ảnh blur preview chất lượng thấp (base64 hoặc ảnh nhỏ 16–48px) */
   lowSrc?: string;

   /** Ảnh gốc chất lượng cao (bắt buộc) */
   src: string;

   /** Ảnh fallback khi load thất bại */
   fallbackSrc?: string;

   /** Giữ tỉ lệ khung hình → tránh layout shift (VD: "16/9", "4/3", "1/1") */
   aspectRatio?: `${number}/${number}`;

   /** ClassName cho container bọc ngoài (wrapper div) */
   containerClassName?: string;

   /** Ưu tiên tải ảnh: dùng "high" cho ảnh Hero / LCP */
   fetchPriority?: 'high' | 'low' | 'auto';

   /** Responsive images srcSet */
   srcSet?: string;

   /** Responsive sizes để browser chọn kích thước ảnh hợp lý */
   sizes?: string;
}

/**
 * Ảnh Lazy Load + Blur Placeholder + Prefetch trước viewport.
 * Tối ưu UX + Perf: giảm flicker, tránh CLS, tiết kiệm bandwidth.
 *
 * @example
 * <LazyImage
 *   src="/images/banner.webp"
 *   lowSrc="/images/banner-blur.webp"
 *   aspectRatio="16/9"
 * />
 * @example (Ảnh LCP Hero)
 * <LazyImage
 *   src="/images/hero.avif"
 *   fetchPriority="high"
 *   loading="eager"
 *   aspectRatio="16/9"
 * />
 * @example (Responsive srcSet)
 * <LazyImage
 *   src="/img/1920.webp"
 *   lowSrc="/img/blur.webp"
 *   srcSet="/img/480.webp 480w, /img/960.webp 960w, /img/1920.webp 1920w"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 */
const LazyImage = ({
   lowSrc,
   src,
   alt,
   fallbackSrc,
   srcSet,
   sizes,
   className,
   aspectRatio,
   containerClassName,
   fetchPriority = 'auto',
   decoding = 'async',
   loading = 'lazy',
   ...rest
}: LazyImageType) => {
   const { ref, inView } = useInView({
      triggerOnce: true,
      rootMargin: '300px 0px',
   });
   const [loaded, setLoaded] = useState(false);
   const [error, setError] = useState(false);

   const hasLow = Boolean(lowSrc);
   const finalSrc = error ? fallbackSrc || src : hasLow && !loaded ? lowSrc : src;

   return (
      <div
         ref={ref}
         style={aspectRatio ? { aspectRatio } : undefined}
         className={cn('overflow-hidden', containerClassName)}
      >
         {inView && (
            <img
               {...rest}
               src={finalSrc}
               alt={alt}
               srcSet={loaded ? srcSet : undefined}
               sizes={sizes}
               fetchPriority={fetchPriority}
               decoding={decoding}
               loading={loading}
               onLoad={(e) => {
                  const img = e.currentTarget;
                  if (img.decode) {
                     img.decode().then(() => {
                        requestAnimationFrame(() => setLoaded(true));
                     });
                  } else {
                     setLoaded(true);
                  }
               }}
               onError={() => setError(true)}
               className={cn(
                  'h-full w-full object-cover opacity-50 blur-lg transition-all duration-300 ease-out',
                  className,
                  {
                     'scale-100 opacity-100 blur-none': loaded,
                  },
               )}
            />
         )}
      </div>
   );
};

export default LazyImage;
