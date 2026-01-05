import React, { useState } from 'react';
import { Outlet } from 'react-router';
import CmsSidebar from './cms-sidebar';
import CmsHeader from './cms-header';
import { cn } from '@utils';

const CmsLayout: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);

   return (
      <div className="flex h-screen overflow-hidden">
         <CmsSidebar collapsed={collapsed} onToggleSidebar={() => setCollapsed(!collapsed)} />

         <div
            className={cn('flex flex-1 flex-col transition-all duration-300', {
               'ml-52': !collapsed,
               'ml-20': collapsed,
            })}
         >
            <CmsHeader collapsed={collapsed} onToggleSidebar={() => setCollapsed(!collapsed)} />

            <main
               className={cn('flex-1 overflow-auto bg-gray-50 p-4 transition-all duration-300 dark:bg-gray-900', {})}
            >
               <Outlet />
            </main>
         </div>
      </div>
   );
};

export default CmsLayout;
