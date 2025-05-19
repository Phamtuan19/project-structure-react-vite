/* eslint-disable react-hooks/rules-of-hooks */
import { notification, type NotificationArgsProps } from 'antd';
import React from 'react';
import './notification.style.scss';
import { useTranslation } from 'react-i18next';

let notificationApi: ReturnType<typeof notification.useNotification>[0];

export const setNotificationApi = (api: typeof notificationApi) => {
   notificationApi = api;
};

export const openNotification = (config: Omit<NotificationArgsProps, 'message'> & { message?: React.ReactNode }) => {
   const { t } = useTranslation();

   if (!notificationApi) return;

   const {
      message = t('global.notification'),
      showProgress = true,
      type = 'info',
      placement = 'topRight',
      description,
      ...rest
   } = config;

   if (!notificationApi) return;

   const allowedTypes = ['success', 'info', 'warning', 'error'] as const;
   type NotificationType = (typeof allowedTypes)[number];

   if (allowedTypes.includes(type as NotificationType)) {
      notificationApi[type as NotificationType]({
         ...rest,
         duration: 3,
         message,
         placement,
         showProgress,
         description,
         style: {
            padding: 16,
         },
         className: 'notification-custom',
      });
   }
};
