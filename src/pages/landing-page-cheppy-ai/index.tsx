import FeatureSection from './components/feature-section';
import HeroSection from './components/hero-section';
import Header from './header';
import { ScrollSnapContainer, ScrollSnapFrame } from './scroll-snap-container/scroll-snap-container';
import './style.css';

const LandingPageCheppyAI = () => {
   return (
      <ScrollSnapContainer>
         <Header />

         {/* Frame hero - full màn hình */}
         <ScrollSnapFrame scrollable>
            <HeroSection />
         </ScrollSnapFrame>

         {/* Frame có nội dung dài */}
         <ScrollSnapFrame>
            <FeatureSection />
         </ScrollSnapFrame>

         {/* Frame cuối */}
         <ScrollSnapFrame
            style={{
               background: '#000',
               color: 'white',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <h1>Liên hệ</h1>
         </ScrollSnapFrame>
      </ScrollSnapContainer>
   );
};

export default LandingPageCheppyAI;
