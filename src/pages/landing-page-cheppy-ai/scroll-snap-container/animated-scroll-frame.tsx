import type { ReactNode, FC } from 'react';

import styles from './scroll-snap.module.css';
import { motion, type Variants } from 'framer-motion';

const itemVariants: Variants = {
   // Trạng thái ban đầu: Ẩn và dịch chuyển (Ví dụ: từ dưới lên)
   hidden: { opacity: 0, y: 100, scale: 0.95 },
   // Trạng thái animate: Hiện ra và về vị trí ban đầu
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         duration: 0.8,
         ease: [0.17, 0.55, 0.55, 1],
      },
   },
};

interface ScrollFrameProps {
   children: ReactNode;
   id: string;
   rootRef?: React.RefObject<HTMLElement | null>;
}

export const AnimatedScrollFrame: FC<ScrollFrameProps> = ({ children, id, rootRef }) => {
   return (
      <motion.section
         className={styles.frame} // Bây giờ 'styles.frame' đã được định nghĩa
         id={id}
         // 2. Kích hoạt animation
         initial="hidden"
         whileInView="visible"
         viewport={{
            root: rootRef,
            once: true,
            amount: 0.8,
         }}
      >
         {/* 3. Bọc nội dung bên trong để áp dụng animation */}
         <motion.div variants={itemVariants} style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {children}
         </motion.div>
      </motion.section>
   );
};
