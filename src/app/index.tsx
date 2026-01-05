import { BrowserRouter } from 'react-router';
import { Permission } from './permission';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';

import '@app/config/i18n';
import NotificationProvider from './providers/notification-provider';
import { ConfigProvider } from 'antd';
import { themeAntdConfig } from './config';
import AuthInitializer from '@components/shared/authInitializer';

const queryClient = new QueryClient();

focusManager.setFocused(false);

const App = () => {
   return (
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
   );
};

export default App;
