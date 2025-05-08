import { Outlet } from 'react-router';

const Navigation = () => {
   return (
      <div className="h-full w-60">
         sider bar
         <Outlet />
      </div>
   );
};

export default Navigation;
