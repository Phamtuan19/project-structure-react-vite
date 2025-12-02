import React from 'react';
import { ROUTE_PATH } from '@constants';
import { cn } from '@utils';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router';
import { Button, Tooltip } from 'antd';
import { MENU_CONFIG } from '@constants/menu';
import { useAuth } from '@hooks';
import { useTranslation } from 'react-i18next';

interface CmsSidebarProps {
   collapsed: boolean;
   onToggleSidebar: () => void;
}

interface MenuItem {
   label: string;
   path: string;
   icon: React.ReactNode;
}

const CmsSidebar: React.FC<CmsSidebarProps> = ({ collapsed, onToggleSidebar }) => {
   const { t } = useTranslation();
   const { authLogout } = useAuth();

   return (
      <aside
         className={cn(
            'fixed z-50 flex h-full flex-col bg-white shadow-lg transition-all duration-300 dark:bg-gray-900',
            collapsed ? 'w-20' : 'w-52',
         )}
      >
         {/* Header */}
         <div className="flex h-16 items-center justify-center border-b border-gray-200 px-2 dark:border-gray-700">
            <div className="relative flex w-full items-center justify-center">
               {/* Icon luôn ở center khi collapsed */}
               <Button
                  type="text"
                  shape="circle"
                  size="middle"
                  onClick={onToggleSidebar}
                  className={cn('absolute items-center rounded transition hover:bg-indigo-100 dark:hover:bg-gray-700', {
                     'left-0 translate-x-0': !collapsed,
                  })}
                  icon={<FiMenu size={22} className="mt-1 text-indigo-600" />}
               />

               {/* Text */}
               <h1
                  className={cn(
                     'overflow-hidden text-center text-xl font-bold whitespace-nowrap text-indigo-600 transition-all duration-300 select-none',
                     {
                        'w-0 opacity-0': collapsed,
                        'ml-1 w-auto opacity-100': !collapsed, // ml-8 để không bị chồng icon
                     },
                  )}
               >
                  CMS Dashboard
               </h1>
            </div>
         </div>

         {/* Menu */}
         <nav className="flex-1 space-y-2 overflow-y-auto p-2">
            {MENU_CONFIG.map((item) => (
               <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                     cn(
                        'group flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-gray-800',
                        {
                           'bg-linear-to-r from-indigo-400 to-indigo-600 font-semibold text-white shadow-md': isActive,
                           'justify-center': collapsed,
                        },
                     )
                  }
               >
                  <div className="text-lg transition-all">{item.icon}</div>
                  {!collapsed && <span className="truncate">{t(item.label as never)}</span>}
               </NavLink>
            ))}
         </nav>

         {/* Footer */}
         <div className="flex items-center justify-between border-t border-gray-200 p-4 dark:border-gray-700">
            {!collapsed && <span className="truncate font-medium text-gray-700 dark:text-gray-200">Tuấn Phạm</span>}
            <Button
               type="text"
               className="rounded text-gray-600 transition hover:bg-red-500 hover:text-white"
               icon={<FiLogOut size={20} className="mt-1" />}
               onClick={authLogout}
            />
         </div>
      </aside>
   );
};

export default CmsSidebar;
