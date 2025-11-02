import { Link } from 'react-router';
import { motion, useAnimation } from 'framer-motion';
import { ReactComponent as ActiveIndicator } from '~/assets/app/svg/activeIndicator.svg';
import { useEffect } from 'react';

interface NavMenuProps {
   label: string;
   href: string;
   isActive: boolean;
   onClick: () => void;
}

const MotionLink = motion(Link);

const NavMenu = ({ label, href, isActive, onClick }: NavMenuProps) => {
   const indicatorControls = useAnimation();
   const textControls = useAnimation();

   useEffect(() => {
      if (isActive) {
         // 1️⃣ Indicator mở: height -> width
         indicatorControls.start({
            scaleY: 1,
            scaleX: [0, 1],
            opacity: [0, 1],
            transition: {
               scaleY: { duration: 0.2, ease: 'easeOut' },
               scaleX: { delay: 0.2, duration: 0.3, ease: 'easeOut' },
               opacity: { duration: 0.2 },
            },
         });

         // 2️⃣ Text animation: delay theo thời gian indicator mở xong
         textControls.start({
            color: '#FFCE00',
            scale: 1.05,
            transition: { duration: 0.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
         });
      } else {
         // Unactive: text về bình thường ngay lập tức
         textControls.start({
            color: '#000000',
            scale: 1,
            transition: { duration: 0.2, ease: 'easeIn' },
         });

         // Indicator thu về center và fade out
         indicatorControls.start({
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
            transition: { duration: 0.25, ease: 'easeIn' },
         });
      }
   }, [indicatorControls, isActive, textControls]);

   return (
      <MotionLink
         to={href}
         onClick={onClick}
         className="group relative flex h-10 min-w-32 cursor-pointer items-center justify-center overflow-hidden text-center transition-all duration-500 ease-out active:scale-[0.98]"
         initial={false}
         animate={textControls}
      >
         {/* Hiệu ứng ánh sáng */}
         {isActive && (
            <span className="absolute inset-0 z-20 translate-x-[-150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]" />
         )}

         {/* Indicator */}
         <motion.div
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
            style={{ transformOrigin: 'center' }}
            initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
            animate={indicatorControls}
         >
            <ActiveIndicator
               preserveAspectRatio="none"
               className="pointer-events-none absolute top-0 left-0 h-full w-full"
            />
         </motion.div>

         {/* Label */}
         <motion.span className="relative z-10" animate={textControls}>
            {label}
         </motion.span>
      </MotionLink>
   );
};

export default NavMenu;
