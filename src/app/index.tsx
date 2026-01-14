import { BrowserRouter } from 'react-router';
import { Permission } from './permission';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@app/config/i18n';
import NotificationProvider from './providers/notification-provider';
import { ConfigProvider } from 'antd';
import { themeAntdConfig } from './config';
import AuthInitializer from '@components/shared/authInitializer';
import ErrorBoundary from '@components/shared/error-boundary';

const queryClient = new QueryClient();

focusManager.setFocused(false);

const App = () => {
   return (
      <ErrorBoundary>
         <QueryClientProvider client={queryClient}>
            <AuthInitializer>
               <BrowserRouter>
                  <ConfigProvider theme={themeAntdConfig}>
                     <Permission />
                     <NotificationProvider />
                  </ConfigProvider>
               </BrowserRouter>
            </AuthInitializer>
         </QueryClientProvider>
      </ErrorBoundary>
   );
};

export default App;
