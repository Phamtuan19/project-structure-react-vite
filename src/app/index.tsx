import { BrowserRouter } from 'react-router';
import { Permission } from './permission';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';

import '@app/config/i18n';
import NotificationProvider from './providers/notification-provider';
import { ConfigProvider } from 'antd';
import { themeAntdConfig } from './config';

const queryClient = new QueryClient();

focusManager.setFocused(false);

function App() {
   return (
      <Provider store={store}>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <ConfigProvider theme={themeAntdConfig}>
                  <Permission />
                  <NotificationProvider />
               </ConfigProvider>
            </BrowserRouter>
         </QueryClientProvider>
      </Provider>
   );
}

export default App;
