import { Spin } from 'antd';

const Loading = () => {
   return (
      <div className="absolute z-10 flex h-full w-full items-center justify-center">
         <Spin />
      </div>
   );
};

export default Loading;
