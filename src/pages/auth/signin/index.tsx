import React from 'react';
import { Button, Card, Input, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControllerInput, ControllerInputPassword } from '@components';

type LoginFormValues = {
   username: string;
   password: string;
};

const Login = () => {
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<LoginFormValues>();

   const onSubmit = async (data: LoginFormValues) => {
      console.log('Login data:', data);
      // TODO: gọi API login
   };

   return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
         <Card className="w-[360px] rounded-xl shadow-lg">
            <Typography.Title level={2} className="text-center">
               {t('signin.title')}
            </Typography.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
               <ControllerInput label={t('signin.username')} name="username" control={control} />

               <ControllerInputPassword label={t('signin.password')} name="password" control={control} />

               {/* Submit */}
               <Button type="primary" htmlType="submit" loading={isSubmitting} className="mt-2">
                  {t('signin.submit')}
               </Button>
            </form>
         </Card>
      </div>
   );
};

export default Login;
