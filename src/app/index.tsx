import '@/app/config/dayjs.config';
import '@app/config/i18n';
import { BrowserRouter } from 'react-router';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NotificationProvider from './providers/notification-provider';
import { ConfigProvider } from 'antd';
import { themeAntdConfig } from './config';
import { RouterProvider, AppRoutes } from './routes';
import { ErrorBoundary } from '@components';

const queryClient = new QueryClient();

focusManager.setFocused(false);

const App = () => {
   return (
      <ErrorBoundary mode="global">
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <ConfigProvider theme={themeAntdConfig}>
                  <RouterProvider>
                     <AppRoutes />
                     <NotificationProvider />
                  </RouterProvider>
               </ConfigProvider>
            </BrowserRouter>
         </QueryClientProvider>
      </ErrorBoundary>
   );
};

export default App;
