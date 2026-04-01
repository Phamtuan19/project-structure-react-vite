import { loadable, type RouteProps } from '@app/routes';
import { Outlet } from 'react-router';

const privateRoute: RouteProps = {
   path: '/',
   element: <Outlet />,
   // auth: undefined (mặc định) → layout cha không chặn, children tự xử lý
   children: [
      {
         id: 'home',
         index: true,
         element: loadable({ path: 'home', fullScreen: true }),
         auth: [],
      },
   ],
};

export { privateRoute };
