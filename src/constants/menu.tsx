import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import { ROUTE_PATH } from './routes';

export const MENU_CONFIG = [
   { label: 'global.dashboard', path: ROUTE_PATH.CMS_DASHBOARD, icon: <FiHome /> },
   { label: 'global.users', path: '/cms/users', icon: <FiUsers /> },
   { label: 'global.settings', path: '/cms/settings', icon: <FiSettings /> },
];
