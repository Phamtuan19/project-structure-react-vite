import React from 'react';
import { Layout, Avatar, Badge, Dropdown, Menu, Button, theme } from 'antd';
import { FiMenu, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '@hooks';
import { useTranslation } from 'react-i18next';

interface CmsHeaderProps {
   collapsed: boolean;
   onToggleSidebar: () => void;
}

const CmsHeader: React.FC<CmsHeaderProps> = ({ collapsed, onToggleSidebar }) => {
   const { t } = useTranslation();
   const { authLogout } = useAuth();

   const userMenu = {
      items: [
         { key: '1', icon: <FiUser />, label: t('common.profile') },
         { key: '2', icon: <FiSettings />, label: t('common.setting') },
         { key: '3', icon: <FiLogOut />, label: t('common.logout') },
      ],
      onclick: () => {},
   };

   const notificationsMenu = {
      items: [
         { key: '1', label: 'New user registered' },
         { key: '2', label: 'Server backup completed' },
         { key: '3', label: 'New comment on post' },
      ],
   };

   return (
      <Layout.Header className="flex w-full items-center justify-end border-b border-gray-200 bg-white! px-4! py-2 shadow-lg transition-all">
         {/* Right */}
         <div className="flex items-center gap-8">
            {/* Notifications */}
            <Dropdown menu={notificationsMenu} placement="bottomRight" arrow trigger={['hover']}>
               <Badge count={3} size="small" offset={[0, 0]}>
                  <Button
                     type="text"
                     shape="circle"
                     size="middle"
                     className="rounded p-2 transition hover:bg-indigo-100 dark:hover:bg-gray-700"
                  >
                     <FiBell size={20} className="text-indigo-600" />
                  </Button>
               </Badge>
            </Dropdown>

            {/* User */}
            <Dropdown menu={userMenu} placement="bottomRight" arrow>
               <div className="flex cursor-pointer items-center gap-2 rounded-full transition">
                  <Avatar size={32} icon={<FiUser />} />
                  <span className="hidden font-medium text-gray-700 select-none md:block">Tuấn Phạm</span>
               </div>
            </Dropdown>
         </div>
      </Layout.Header>
   );
};

export default CmsHeader;
