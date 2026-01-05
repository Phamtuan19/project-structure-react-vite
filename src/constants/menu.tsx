import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import { ROUTE_PATH } from './routes';

export const MENU_CONFIG = [
   { label: 'menu.dashboard', path: ROUTE_PATH.CMS_DASHBOARD, icon: <FiHome /> },
   { label: 'menu.users', path: '/cms/users', icon: <FiUsers /> },
   { label: 'menu.settings', path: '/cms/settings', icon: <FiSettings /> },
];
