import { useState, useEffect } from 'react';

/**
 *
 */
export function useResponsive() {
   const getDevice = () => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width >= 768 && width < 1024) return 'tablet';
      return 'desktop';
   };

   const [device, setDevice] = useState<string>(getDevice());

   useEffect(() => {
      const handleResize = () => setDevice(getDevice());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return {
      isMobile: device === 'mobile',
      isTablet: device === 'tablet',
      isDesktop: device === 'desktop',
   };
}
