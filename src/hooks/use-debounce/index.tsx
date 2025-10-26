import { useEffect, useState } from 'react';

/**
 * useDebounce: Trả về một giá trị đã được debounce
 *
 * @param value - giá trị bạn muốn debounce (string, number, object, etc.)
 * @param delay - thời gian debounce (ms)
 */
export function useDebounce<T>(value: T, delay: number): T {
   const [debouncedValue, setDebouncedValue] = useState<T>(value);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(timeout); // clear timeout khi value hoặc delay thay đổi
      };
   }, [value, delay]);

   return debouncedValue;
}
