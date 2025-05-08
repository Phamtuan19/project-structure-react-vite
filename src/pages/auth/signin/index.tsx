/* eslint-disable import/no-named-as-default-member */
import { RadiusUprightOutlined } from '@ant-design/icons';
import { openNotification, SvgIcon } from '@components';
import { Button, Typography } from 'antd';
import i18next from 'i18next';

const Signin = () => {
   return (
      <div className="flex flex-1 flex-col items-center justify-center">
         {i18next.t('global.language')}
         <Typography.Title level={3}>Signin</Typography.Title>
         <SvgIcon name="react" width={300} height={300} />

         <Button
            type="primary"
            onClick={() =>
               openNotification({
                  name: 'Hello',
               })
            }
            icon={<RadiusUprightOutlined />}
         >
            topRight
         </Button>
      </div>
   );
};

export default Signin;
