/* eslint-disable security/detect-object-injection */
/* eslint-disable import/no-named-as-default-member */
// src/utils/notification.ts
import { notification, type NotificationArgsProps } from 'antd';
import React from 'react';
import { Context } from '@app/context';
import './notification.style.scss';
import i18next from 'i18next';

let notificationApi: ReturnType<typeof notification.useNotification>[0];

export const setNotificationApi = (api: typeof notificationApi) => {
   notificationApi = api;
};

export const openNotification = (
   config: Omit<NotificationArgsProps, 'description' | 'message'> & { name?: string; message?: React.ReactNode },
) => {
   if (!notificationApi) return;

   const {
      message = i18next.t('global.notification'),
      showProgress = true,
      type = 'info',
      placement = 'topRight',
      ...rest
   } = config;

   if (!notificationApi) return;

   notificationApi[type]({
      ...rest,
      duration: 3,
      message,
      placement,
      showProgress,
      description: <Context.Consumer>{(value) => <span>{value.name}</span>}</Context.Consumer>,
      style: {
         padding: 16,
      },
      className: 'notification-custom',
   });
};
