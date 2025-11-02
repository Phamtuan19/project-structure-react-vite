import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as ActiveIndicator } from '~/assets/app/svg/activeIndicator.svg';
import cheppyLogo from '~/assets/app/svg/chepp-logo.svg?url';
import NavMenu from './nav-menu';
import ImageLazy from '@pages/landing-page-cheppy-ai/components/ui/image-lazy';
import { useResponsive } from '@pages/landing-page-cheppy-ai/hooks/use-responsive';

const menuItems = [
   { key: 1, label: 'Chúng tôi', href: '#' },
   { key: 2, label: 'Điểm nhấn', href: '#' },
   { key: 3, label: 'Giải pháp', href: '#' },
   { key: 4, label: 'Gói dịch vụ', href: '#' },
   { key: 5, label: 'Kết nối', href: '#' },
];

const HeaderTablet = () => {
   const [activeMenu, setActiveMenu] = useState<number>(1);
   const containerRef = useRef<HTMLDivElement>(null);
   const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
   const { isTablet } = useResponsive();

   useEffect(() => {
      if (containerRef.current) {
         const activeEl = containerRef.current.querySelector<HTMLDivElement>(`[data-key='${activeMenu}']`);
         if (activeEl) {
            const rect = activeEl.getBoundingClientRect();
            const parentRect = containerRef.current.getBoundingClientRect();
            setIndicatorStyle({
               width: rect.width,
               left: rect.left - parentRect.left,
            });
         }
      }
   }, [activeMenu]);

   return (
      <div className="fixed top-5 right-4 left-0 z-[9999999] flex items-center justify-between !px-4 pl-4 lg:justify-end">
         {isTablet && <ImageLazy src={cheppyLogo} alt="logo" className="!h-10 !w-10" />}

         <div className="relative hidden items-center justify-end gap-3 md:inline-flex lg:pr-[10%]" ref={containerRef}>
            {/* Motion Indicator */}
            <motion.div
               className="pointer-events-none absolute top-0 left-0"
               style={{ height: '100%' }}
               animate={{ x: indicatorStyle.left, width: indicatorStyle.width }}
               transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
               <ActiveIndicator
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute top-0 left-0 h-full w-full"
               />
            </motion.div>

            {menuItems.map((item) => (
               <div key={item.key} data-key={item.key}>
                  <NavMenu {...item} isActive={activeMenu === item.key} onClick={() => setActiveMenu(item.key)} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default HeaderTablet;
