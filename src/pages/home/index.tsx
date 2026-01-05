import LazyImage from '@components/shared/lazy-image';

const Home = () => {
   return (
      <div className="">
         <div className="pet" />
         <LazyImage
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=6000&q=90"
            lowSrc="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=24&blur=40&q=1"
            alt="Mountain landscape"
            className="rounded-lg"
            containerClassName="w-full h-screen overflow-hidden"
         />
      </div>
   );
};

export default Home;
