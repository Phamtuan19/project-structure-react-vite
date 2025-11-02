import React from 'react';
import { motion } from 'framer-motion';
import ImageLazy from '../ui/image-lazy';

const HeroSection: React.FC = () => {
   return (
      <section
         style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
         }}
      >
         {/* Hero background image */}
         <ImageLazy
            src="/images/hero-banner.jpg"
            alt="Hero Banner"
            placeholder="/images/hero-placeholder.jpg"
            animation={{
               initial: { opacity: 0, scale: 1.05 },
               animate: { opacity: 1, scale: 1 },
               transition: { duration: 1.2, ease: 'easeOut' },
            }}
            style={{
               position: 'absolute',
               inset: 0,
               width: '100%',
               height: '100%',
               objectFit: 'cover',
               zIndex: 1,
            }}
         />

         {/* Overlay layer */}
         <div
            style={{
               position: 'absolute',
               inset: 0,
               background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)',
               zIndex: 2,
            }}
         />

         {/* Text content */}
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{
               position: 'relative',
               zIndex: 3,
               color: '#fff',
               textAlign: 'center',
               maxWidth: 700,
               padding: '0 20px',
            }}
         >
            <h1
               style={{
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: '1rem',
               }}
            >
               Nâng tầm thương hiệu của bạn
            </h1>
            <p
               style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  opacity: 0.9,
                  marginBottom: '2rem',
               }}
            >
               Giải pháp truyền thông toàn diện – Thiết kế, nội dung, công nghệ & cảm xúc.
            </p>
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               style={{
                  backgroundColor: '#ff4d4f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '14px 32px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
               }}
            >
               Bắt đầu ngay
            </motion.button>
         </motion.div>
      </section>
   );
};

export default HeroSection;
