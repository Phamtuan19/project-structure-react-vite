import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ImageLazy from '../ui/image-lazy';
import cheppyPhone from '~/assets/app/image/hero-phone.png';
import cheppyPhone01 from '~/assets/app/image/hero-phone-01.png';

const CheppyPhones = () => {
   const [active, setActive] = useState<'left' | 'right' | null>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setActive(null);
         }
      };
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
   }, []);

   return (
      <motion.div
         ref={containerRef}
         className="relative w-full max-w-[50%]"
         initial={{ opacity: 0, y: 30, scale: 0.97 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
         {/* Ảnh trái */}
         <motion.div
            onClick={() => setActive(active === 'left' ? null : 'left')}
            animate={{
               x: active === 'left' ? -8 : [-18, -22, -18],
               rotateY: active === 'left' ? 0 : 8,
               rotateZ: active === 'left' ? 0 : -3,
               scale: active === 'left' ? 1.18 : [1, 1.015, 1],
               y: active === 'left' ? -12 : [0, -2, 0],
               zIndex: active === 'left' ? 15 : 2,
               filter: active === 'right' ? 'blur(2px)' : 'none',
            }}
            transition={{
               duration: active === 'left' ? 0.45 : 2.8,
               repeat: active === 'left' ? 0 : Infinity,
               repeatType: 'mirror',
               ease: 'easeInOut',
            }}
            className="absolute cursor-pointer select-none"
         >
            <ImageLazy src={cheppyPhone01} alt="phone-left" className="h-auto w-full object-contain" />
         </motion.div>

         {/* Ảnh phải */}
         <motion.div
            onClick={() => setActive(active === 'right' ? null : 'right')}
            animate={{
               x: active === 'right' ? 6 : [50, 52, 30],
               rotateY: active === 'right' ? 0 : -6,
               rotateZ: active === 'right' ? 0 : 2,
               scale: active === 'right' ? 1.4 : [1, 1.01, 1],
               y: active === 'right' ? -8 : [0, -1.5, 0],
               zIndex: active === 'right' ? 15 : 1,
               filter: active === 'left' ? 'blur(2px)' : 'none',
            }}
            transition={{
               duration: active === 'right' ? 0.4 : 3.2,
               repeat: active === 'right' ? 0 : Infinity,
               repeatType: 'mirror',
               ease: 'easeInOut',
            }}
            className="absolute origin-center cursor-pointer select-none"
         >
            <ImageLazy src={cheppyPhone} alt="cheppy-phone" className="h-auto w-full object-contain" />
         </motion.div>
      </motion.div>
   );
};

export default CheppyPhones;
