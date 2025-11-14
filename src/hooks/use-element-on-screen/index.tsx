/* eslint-disable jsdoc/check-indentation */
/* eslint-disable tsdoc/syntax */
import { useEffect, useRef, useState } from 'react';

interface Props {
   options: IntersectionObserverInit;
}

/**
 * useElementOnScreen
 *
 * Hook kiểm tra xem một phần tử có đang xuất hiện trong viewport hay không,
 * sử dụng IntersectionObserver.
 *
 * @function
 * @description
 * - Tự động tạo và xoá IntersectionObserver đúng cách bằng `disconnect()`.
 * - Luôn cleanup trước khi tạo observer mới khi options thay đổi.
 * - Không lạm dụng vào dependency array (ref không thay đổi).
 * - Tối ưu để tránh leak, double-observer và re-render không cần thiết.
 * @param {Object} params
 * @param {IntersectionObserverInit} params.options - Cấu hình cho IntersectionObserver (root, threshold, rootMargin)
 * @returns {[React.RefObject<HTMLDivElement>, boolean]} Một mảng bất biến gồm:
 *  - `ref`: Gắn vào phần tử cần quan sát
 *  - `isVisible`: `true` khi phần tử xuất hiện trong viewport, ngược lại `false`
 * @example
 * const [ref, isVisible] = useElementOnScreen({
 *   options: { threshold: 0.5 }
 * });
 *
 * return (
 *   <div ref={ref}>
 *     {isVisible ? "Element is visible" : "Not visible"}
 *   </div>
 * );
 */
const useElementOnScreen = ({ options }: Props) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const observerRef = useRef<IntersectionObserver | null>(null);

   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
         const entry = entries[0];
         if (!entry) return;

         setIsVisible(entry.isIntersecting);
      }, options);

      observerRef.current.observe(el);

      return () => {
         observerRef.current?.disconnect();
      };
   }, [options]);

   return [containerRef, isVisible] as const;
};

export default useElementOnScreen;
