import { notification } from 'antd';
import { useEffect } from 'react';
import { setNotificationApi } from '@components';

const NotificationProvider = () => {
   const [api, contextHolder] = notification.useNotification();

   useEffect(() => {
      setNotificationApi(api);
   }, [api]);

   return <>{contextHolder}</>;
};

export default NotificationProvider;
