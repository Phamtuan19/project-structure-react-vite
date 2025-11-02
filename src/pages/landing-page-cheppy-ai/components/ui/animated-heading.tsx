import { motion, useAnimation, type MotionStyle } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedHeadingProps {
   className?: string;
   text: string;
   styleItem?: MotionStyle;
   repeatInterval?: number; // tổng thời gian 1 vòng (ms)
   delayPerChar?: number; // delay giữa các chữ (s)
}

const AnimatedHeading = ({
   className,
   text,
   styleItem,
   repeatInterval, // không gán mặc định
   delayPerChar = 0.05,
}: AnimatedHeadingProps) => {
   const controls = useAnimation();
   const normalizedText = text.replace(/\\n/g, '\n');
   const charCount = normalizedText.split('').length;

   const playAnimation = async () => {
      // Xuất hiện từng chữ
      await controls.start((i) => ({
         opacity: [0, 1],
         y: [20, 0],
         transition: { delay: i * delayPerChar, ease: 'easeOut' },
      }));

      if (!repeatInterval) return;

      // Tính thời gian giữ nguyên trước khi thu
      const totalAppearTime = charCount * delayPerChar * 1000;
      const holdTime = Math.max(0, repeatInterval - totalAppearTime - charCount * delayPerChar * 1000);
      await new Promise((res) => setTimeout(res, holdTime));

      // Thu từng chữ
      await controls.start((i) => ({
         opacity: [1, 0],
         y: [0, -20],
         transition: { delay: i * delayPerChar, ease: 'easeIn' },
      }));
   };

   useEffect(() => {
      if (!repeatInterval) {
         // Chỉ chạy 1 lần nếu không có repeatInterval
         playAnimation();
         return;
      }

      let isMounted = true;

      const loopAnimation = async () => {
         while (isMounted) {
            await playAnimation();
         }
      };

      loopAnimation();

      return () => {
         isMounted = false;
      };
   }, [text, delayPerChar, repeatInterval]);

   return (
      <span className={className}>
         {normalizedText.split('').map((char, index) => {
            if (char === '\n') return <br key={index} />;
            return (
               <motion.span
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  style={styleItem}
               >
                  {char}
               </motion.span>
            );
         })}
      </span>
   );
};

export default AnimatedHeading;
