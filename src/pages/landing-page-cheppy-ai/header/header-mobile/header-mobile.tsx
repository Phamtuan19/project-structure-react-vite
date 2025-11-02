/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import cheppyLogo from '~/assets/app/svg/chepp-logo.svg?url';
import barChart from '~/assets/app/svg/bar-chart.svg?url';
import ImageLazy from '@pages/landing-page-cheppy-ai/components/ui/image-lazy';
import { cn } from '@utils';
import { motion } from 'framer-motion';

const menuItems = [
   { key: 1, label: 'Chúng tôi', href: '#' },
   { key: 2, label: 'Điểm nhấn', href: '#' },
   { key: 3, label: 'Giải pháp', href: '#' },
   { key: 4, label: 'Gói dịch vụ', href: '#' },
   { key: 5, label: 'Kết nối', href: '#' },
];

const HeaderMobile = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectKey, setSelectKey] = useState<number>(1);

   return (
      <>
         <header
            className={cn('fixed top-0 right-0 left-0 z-50 sm:right-4', {
               'w-full': isOpen,
            })}
         >
            <div className="relative z-50 flex w-full items-center justify-between !px-4 !py-3">
               <div className="flex items-center gap-2">
                  <ImageLazy src={cheppyLogo} alt="Logo" className="!h-10 !w-10" />
                  <span className="text-lg font-semibold text-gray-900">CheppyAI</span>
               </div>

               <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex h-10 w-10 items-center justify-center"
               >
                  <ImageLazy src={barChart} alt="Menu" className="h-6 w-6" />
               </button>
            </div>
            {isOpen && (
               <div className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-black/80">
                  <div className="flex flex-col items-start gap-y-1 !px-2 !pt-24">
                     {menuItems.map((menu) => {
                        const isActive = menu.key === selectKey;

                        return (
                           <motion.button
                              key={menu.key}
                              type="button"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={cn(
                                 'relative w-full cursor-pointer overflow-hidden rounded-lg !px-4 !py-2 text-left text-lg font-semibold transition-all duration-200',
                                 {
                                    'bg-yellow-500/20 text-yellow-400 shadow-lg': isActive,
                                    'text-white hover:bg-yellow-500/10 hover:text-yellow-400': !isActive,
                                 },
                              )}
                              onClick={() => {
                                 setSelectKey(menu.key);
                                 setIsOpen(false);
                              }}
                           >
                              {/* Shine effect khi hover */}
                              <span className="pointer-events-none absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                              {menu.label}
                           </motion.button>
                        );
                     })}
                  </div>
               </div>
            )}
         </header>
      </>
   );
};

export default HeaderMobile;
