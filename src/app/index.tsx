import '@/app/config/dayjs.config';
import '@app/config/i18n';
import { BrowserRouter } from 'react-router';
import { Permission } from './permission';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NotificationProvider from './providers/notification-provider';
import { ConfigProvider } from 'antd';
import { themeAntdConfig } from './config';
import { RouterProvider } from './routes';
import ErrorBoundary from '@components/shared/error-boundary';

const queryClient = new QueryClient();

focusManager.setFocused(false);

const App = () => {
   return (
      <ErrorBoundary>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <ConfigProvider theme={themeAntdConfig}>
                  <RouterProvider>
                     <Permission />
                     <NotificationProvider />
                  </RouterProvider>
               </ConfigProvider>
            </BrowserRouter>
         </QueryClientProvider>
      </ErrorBoundary>
   );
};

export default App;
