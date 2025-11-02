import React from 'react';
import heroBg from '~/assets/app/image/hero-bg.png';
// import cheppyBanner from '~/assets/app/svg/cheppy-banner.svg?url';
import cheppyBanner from '~/assets/app/image/cheppy-banner.png';
import cheppyPhone from '~/assets/app/image/hero-phone.png';
import ImageLazy from '../ui/image-lazy';
import AnimatedHeading from '../ui/animated-heading';
import { motion } from 'framer-motion';
import DownloadGooglePlayButton from '../ui/download-google-play-button';
import DownloadIOSButton from '../ui/download-ios-button';

const HeroSection = () => {
   return (
      <section
         className="relative min-h-screen w-full overflow-hidden bg-gray-800 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${heroBg})` }}
      >
         {/* Centered Banner */}
         <div className="absolute top-2/5 left-1/2 z-20 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-4">
            <div className="relative flex h-full flex-col items-center justify-center">
               <div className="absolute -top-2 right-0 !pr-6">
                  <AnimatedHeading
                     text="Ứng dụng học tiếng anh\nGame hóa với AI"
                     className="transform text-base font-extrabold text-black"
                     repeatInterval={10000}
                  />
               </div>
               {/* Banner với hiệu ứng */}
               <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative w-full max-w-[90%]"
               >
                  <motion.div
                     animate={{
                        y: [0, -5, 0], // di chuyển nhẹ lên xuống
                        scale: [1, 1.02, 1], // phồng lên một chút
                     }}
                     transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                     }}
                  >
                     <ImageLazy src={cheppyBanner} alt="cheppyBanner" className="h-auto w-full object-contain" />
                  </motion.div>
               </motion.div>
               <div className="flex flex-col items-center justify-center gap-10">
                  <div className="flex items-center justify-between gap-x-4">
                     <DownloadGooglePlayButton className="rounded px-2" />
                     <DownloadIOSButton />
                  </div>

                  <motion.div
                     className="relative w-full max-w-[50%]"
                     initial={{ opacity: 0, y: 50, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 50, scale: 0.95 }}
                     transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                     <motion.div
                        animate={{
                           y: [0, -5, 0], // nhún nhẹ lên xuống
                           scale: [1, 1.02, 1], // phồng nhẹ
                        }}
                        transition={{
                           duration: 3,
                           repeat: Infinity,
                           repeatType: 'loop',
                           ease: 'easeInOut',
                        }}
                     >
                        <ImageLazy src={cheppyPhone} alt="cheppyPhone" className="h-auto w-full object-contain" />
                     </motion.div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default HeroSection;
