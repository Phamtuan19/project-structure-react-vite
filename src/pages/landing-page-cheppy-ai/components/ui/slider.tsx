import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SliderProps<T> {
   items: T[];
   renderItem: (item: T, index: number) => React.ReactNode;
   autoPlayInterval?: number; // ms
}

const FullScreenSlider = <T,>({ items, renderItem, autoPlayInterval = 3000 }: SliderProps<T>) => {
   const [current, setCurrent] = useState(0);
   const timerRef = useRef<number | null>(null);

   const clearTimer = () => {
      if (timerRef.current) {
         clearInterval(timerRef.current);
         timerRef.current = null;
      }
   };

   const startTimer = () => {
      if (!autoPlayInterval || items.length <= 1) return;
      clearTimer();
      timerRef.current = window.setInterval(() => {
         setCurrent((prev) => (prev + 1) % items.length);
      }, autoPlayInterval);
   };

   useEffect(() => {
      startTimer();
      return () => clearTimer();
   }, [items.length, autoPlayInterval]);

   const handleDragEnd = (event: any, info: any) => {
      const offset = info.offset.x;
      if (offset < -50) setCurrent((prev) => (prev + 1) % items.length);
      if (offset > 50) setCurrent((prev) => (prev - 1 + items.length) % items.length);
      startTimer(); // reset timer
   };

   return (
      <div className="relative h-screen w-screen overflow-hidden">
         <motion.div
            className="flex h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${current * 100}vw` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
         >
            {items.map((item, index) => (
               <div key={index} className="h-screen w-screen flex-shrink-0">
                  {renderItem(item, index)}
               </div>
            ))}
         </motion.div>

         {/* Indicators */}
         <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {items.map((_, i) => (
               <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all ${i === current ? 'bg-white' : 'bg-white/50'}`}
               />
            ))}
         </div>
      </div>
   );
};

export default FullScreenSlider;
