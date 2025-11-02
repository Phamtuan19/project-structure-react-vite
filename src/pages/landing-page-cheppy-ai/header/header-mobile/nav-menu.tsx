import { motion } from 'framer-motion';
import React from 'react';
import { ReactComponent as ActiveIndicator } from '~/assets/app/svg/activeIndicator.svg';

interface MenuItem {
   key: number;
   label: string;
   href: string;
}

interface NavMenuProps {
   activeMenu: number;
   onSelect: (key: number) => void;
   onClose: () => void;
}

const menuItems: MenuItem[] = [
   { key: 1, label: 'Chúng tôi', href: '#' },
   { key: 2, label: 'Điểm nhấn', href: '#' },
   { key: 3, label: 'Giải pháp', href: '#' },
   { key: 4, label: 'Gói dịch vụ', href: '#' },
   { key: 5, label: 'Kết nối', href: '#' },
];

const NavMenu = ({ activeMenu, onSelect, onClose }: NavMenuProps) => {
   const containerRef = React.useRef<HTMLDivElement>(null);
   const [indicatorPos, setIndicatorPos] = React.useState({ top: 0, height: 0 });

   React.useEffect(() => {
      const activeEl = containerRef.current?.querySelector<HTMLButtonElement>(`[data-key='${activeMenu}']`);
      if (activeEl && containerRef.current) {
         const rect = activeEl.getBoundingClientRect();
         const parentRect = containerRef.current.getBoundingClientRect();
         setIndicatorPos({ top: rect.top - parentRect.top, height: rect.height });
      }
   }, [activeMenu]);

   return (
      <nav ref={containerRef} className="relative mt-6 flex flex-col px-4">
         {/* Indicator */}
         <motion.div
            className="pointer-events-none absolute left-0 w-full"
            animate={{ y: indicatorPos.top, height: indicatorPos.height }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
         >
            <ActiveIndicator className="absolute h-full w-full" />
         </motion.div>

         {menuItems.map((item) => (
            <button
               key={item.key}
               data-key={item.key}
               type="button"
               onClick={() => {
                  onSelect(item.key);
                  onClose();
               }}
               className={`relative z-10 w-full px-2 py-3 text-left text-lg font-medium transition-all ${
                  activeMenu === item.key
                     ? 'scale-105 text-yellow-500'
                     : 'text-gray-800 hover:text-gray-900 active:scale-95'
               }`}
            >
               {item.label}
            </button>
         ))}
      </nav>
   );
};

export default NavMenu;
