import { BrowserRouter } from 'react-router';
import { Permission } from './permission';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';

import '@app/config/i18n';
import NotificationProvider from './providers/notification-provider';
import { ConfigProvider } from 'antd';
import { themeAntdConfig } from './config';

const queryClient = new QueryClient();

focusManager.setFocused(false);

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <ConfigProvider theme={themeAntdConfig}>
               <Permission />
               <NotificationProvider />
            </ConfigProvider>
         </BrowserRouter>
      </QueryClientProvider>
   );
};

export default App;
