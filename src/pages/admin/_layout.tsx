/* eslint-disable react/jsx-max-depth */
import { Outlet, Link, useLocation } from 'react-router';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import { DashboardOutlined, SettingOutlined, UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
   const location = useLocation();

   const menuItems = [
      {
         key: '/admin/dashboard',
         icon: <DashboardOutlined />,
         label: <Link to="/admin/dashboard">Bảng điều khiển</Link>,
      },
      {
         key: '/admin/settings',
         icon: <SettingOutlined />,
         label: <Link to="/admin/settings">Cài đặt hệ thống</Link>,
      },
   ];

   const userMenu = {
      items: [
         {
            key: 'profile',
            label: 'Thông tin cá nhân',
            icon: <UserOutlined />,
         },
         {
            type: 'divider' as const,
         },
         {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            danger: true,
         },
      ],
   };

   return (
      <Layout className="h-screen w-screen overflow-hidden">
         {/* Sidebar */}
         <Sider
            breakpoint="lg"
            collapsedWidth="80"
            theme="dark"
            className="select-none"
            style={{
               boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
            }}
         >
            <div className="flex h-16 items-center justify-center border-b border-slate-800 px-4">
               <span className="text-base font-bold tracking-wider text-white">ADMIN PORTAL</span>
            </div>
            <Menu
               theme="dark"
               mode="inline"
               selectedKeys={[location.pathname]}
               items={menuItems}
               className="border-none pt-4"
            />
         </Sider>

         {/* Main Layout */}
         <Layout className="flex flex-col overflow-hidden bg-gray-50">
            {/* Header */}
            <Header className="flex h-16 items-center justify-between bg-white px-6 shadow-xs select-none">
               <div className="flex items-center">
                  <h1 className="m-0 text-lg font-semibold text-gray-800">
                     {location.pathname === '/admin/dashboard' ? 'Dashboard' : 'Settings'}
                  </h1>
               </div>

               <div className="flex items-center gap-6">
                  <Dropdown menu={{ items: [] }} placement="bottomRight" trigger={['click']}>
                     <BellOutlined className="cursor-pointer text-lg text-gray-600 hover:text-blue-600" />
                  </Dropdown>

                  <Dropdown menu={userMenu} placement="bottomRight">
                     <Space className="cursor-pointer">
                        <Avatar icon={<UserOutlined />} className="bg-blue-600" />
                        <span className="hidden text-sm font-medium text-gray-700 md:inline">Admin User</span>
                     </Space>
                  </Dropdown>
               </div>
            </Header>

            {/* Sub-page Content */}
            <Content className="h-full min-h-0 w-full flex-1 overflow-hidden p-6">
               <div className="h-full w-full overflow-y-auto rounded-lg bg-white p-6 shadow-xs">
                  <Outlet />
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default AdminLayout;
