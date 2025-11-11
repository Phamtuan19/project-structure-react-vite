import React from 'react';
import { Link } from 'react-router';
import { ReactComponent as ChplayIcon } from '~/assets/app/svg/chplay.svg';
import { motion } from 'framer-motion';
import { cn } from '@utils';

interface DownloadGooglePlayButtonProps {
   className?: string;
}

const DownloadGooglePlayButton: React.FC<DownloadGooglePlayButtonProps> = ({ className }) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20, scale: 0.95 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
         className={cn('w-fit', className)}
      >
         <Link
            to="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center gap-2.5 overflow-hidden rounded-xl! bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-900 px-2.5! py-1.5! font-medium text-white shadow-[0_0_6px_rgba(255,255,255,0.08)] transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.97] sm:px-3 sm:py-2 md:px-4 md:py-2"
         >
            {/* Hiệu ứng ánh sáng quét ngang */}
            <span className="absolute inset-0 translate-x-[-150%] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]" />

            {/* Icon */}
            <ChplayIcon className="h-6 w-6 shrink-0 text-white transition-transform duration-300 ease-out group-hover:scale-110 sm:h-5 sm:w-5 md:h-6 md:w-6" />

            {/* Text */}
            <div className="z-10 flex flex-col text-left leading-tight transition-transform duration-300 ease-out group-hover:-translate-y-px">
               <span className="text-[7px] tracking-widest opacity-70 sm:text-[8px] md:text-[9px]">GET IT ON</span>
               <span className="text-[10px] font-semibold sm:text-[12px] md:text-[14px]">Google Play</span>
            </div>
         </Link>
      </motion.div>
   );
};

export default DownloadGooglePlayButton;
