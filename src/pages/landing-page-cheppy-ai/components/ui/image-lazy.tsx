import React, { useEffect, useRef, useState } from 'react';
import { motion, type TargetAndTransition, type Transition } from 'framer-motion';

interface ImageLazyProps extends React.ComponentPropsWithoutRef<typeof motion.img> {
   src: string;
   alt: string;
   placeholder?: string;
   blurEffect?: boolean;
   animation?: {
      initial?: TargetAndTransition;
      animate?: TargetAndTransition;
      transition?: Transition;
   };
}

const ImageLazy: React.FC<ImageLazyProps> = ({
   src,
   alt,
   placeholder,
   blurEffect = true,
   animation,
   style,
   ...rest
}) => {
   const imgRef = useRef<HTMLImageElement | null>(null);
   const [isVisible, setIsVisible] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            const [entry] = entries;
            if (entry?.isIntersecting) {
               setIsVisible(true);
               observer.disconnect();
            }
         },
         { rootMargin: '100px' },
      );

      if (imgRef.current) observer.observe(imgRef.current);
      return () => observer.disconnect();
   }, []);

   const handleLoad = () => setIsLoaded(true);

   return (
      <motion.img
         ref={imgRef}
         src={isVisible ? src : placeholder || ''}
         alt={alt}
         onLoad={handleLoad}
         loading="lazy"
         style={{
            transition: 'filter 0.4s ease, opacity 0.3s ease',
            opacity: isVisible ? 1 : 0.4,
            filter: blurEffect && !isLoaded ? 'blur(10px)' : 'none',
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
            ...style,
         }}
         initial={animation?.initial ?? { opacity: 0, scale: 0.98 }}
         animate={
            isVisible
               ? (animation?.animate ?? { opacity: 1, scale: 1 })
               : (animation?.initial ?? { opacity: 0, scale: 0.98 })
         }
         transition={animation?.transition ?? { duration: 0.8, ease: 'easeOut' }}
         {...rest}
      />
   );
};

export default ImageLazy;
