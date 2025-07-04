import { Navigation } from '@components';
import { Outlet } from 'react-router';

const MainLayout = () => {
   return (
      <div className="flex h-screen w-screen overflow-hidden">
         <Navigation />
         <Outlet />
      </div>
   );
};

export default MainLayout;
