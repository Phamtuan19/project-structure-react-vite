import { useCallback, useEffect } from 'react';

export const useClickOutside = <T extends Element>(ref: React.RefObject<T | null>, callback: () => void) => {
   const handleClick = useCallback(
      (e: MouseEvent) => {
         if (ref && ref.current && !ref.current?.contains(e.target as Node)) {
            callback();
         }
      },
      [ref, callback],
   );

   useEffect(() => {
      document.addEventListener('mousedown', handleClick);
      return () => {
         document.removeEventListener('mousedown', handleClick);
      };
   }, [handleClick]);
};
