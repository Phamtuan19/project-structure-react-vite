import React from 'react';

import featureBg from '~/assets/app/image/feature-bg.png';
import feature1 from '~/assets/app/image/feature-1.png';
import feature2 from '~/assets/app/image/feature-2.png';
import feature3 from '~/assets/app/image/feature-3.png';
import beCa1 from '~/assets/app/image/Be Ca 1.png';
import beRong3 from '~/assets/app/image/Be rong 3.png';
import AnimatedHeading from '../ui/animated-heading';
import Slider from '../ui/slider';
import ImageLazy from '../ui/image-lazy';

const FEATURE_LIST = [
   { image: feature1, title: 'Học tiếng Anh với AI', text: 'Luyện nói, sửa lỗi và phản xạ giao tiếp với trợ lý ảo AI' },
   { image: feature2, title: 'Lộ trình học cá nhân hoá', text: 'AI thiết kế bài phù hợp và luyện đúng điểm yếu' },
   {
      image: feature3,
      title: 'Game hoá học tiếng Anh',
      text: 'Làm nhiệm vụ, bài tập, nhận phần thưởng, duy trì thói quen',
   },
];

const FeatureSection = () => {
   return (
      <section
         className="relative flex h-svh w-full flex-col justify-between! bg-gray-800 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${featureBg})` }}
      >
         <div className="pt-16">
            <div className="flex items-center justify-center">
               <AnimatedHeading
                  text="Ứng dụng học tiếng Anh game hóa với AI"
                  className="font-sf text-stroke-yellow justify-start text-center text-4xl leading-[51px] font-bold text-lime-800"
                  styleItem={{ WebkitTextStroke: '1px #FADE8E' }}
               />
            </div>
         </div>
         <div className="flex flex-col gap-3">
            <div className="mt-6 grid h-fit grid-cols-1">
               <Slider
                  items={FEATURE_LIST}
                  autoPlayInterval={6000}
                  renderItem={(feature) => (
                     <div className="flex flex-col items-center gap-4 px-4!">
                        <div className="">
                           <ImageLazy src={feature.image} alt={feature.image} className="h-auto w-full" />
                        </div>
                        <div className="flex flex-col">
                           <h5 className="text-center text-2xl font-extrabold">{feature.title}</h5>
                           <span>{feature.text}</span>
                        </div>
                     </div>
                  )}
               />
            </div>
            <div className="h-auto w-full flex-1">
               <ImageLazy src={beRong3} alt={beRong3} className="h-auto w-full max-w-1/2" />
               <ImageLazy src={beCa1} alt={beCa1} className="h-auto w-full max-w-1/2" />
            </div>
         </div>
      </section>
   );
};

export default FeatureSection;
