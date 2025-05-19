import { useEffect } from 'react';

export const useTitle = (title?: string) => {
   useEffect(() => {
      if (typeof document === 'undefined' || !title) return;

      const prevTitle = document.title;
      document.title = title;

      return () => {
         document.title = prevTitle;
      };
   }, [title]);
};
