import { Button, Card, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControllerInput, ControllerInputPassword } from '@components';
import { useAuth } from '@hooks';
import { type LoginFormValues, loginSchema } from './signin.schema';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
   const { t } = useTranslation();
   const { autSignin, isLoadingSignin } = useAuth();

   const { control, handleSubmit } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues:
         import.meta.env.MODE === 'development'
            ? { identifier: 'phamtuan19hd@gmail.com', password: 'admin1234' }
            : { identifier: '', password: '' },
   });

   const onSubmit = async (data: LoginFormValues) => {
      autSignin(data);
   };

   return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 p-4">
         <Card className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg transition-transform">
            {/* Logo / Title */}
            <div className="mb-6 text-center">
               <Typography.Title level={2} className="text-3xl font-extrabold text-gray-800">
                  {t('signin.title')}
               </Typography.Title>
               <Typography.Text className="text-gray-500">Welcome back! Please login to your account.</Typography.Text>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
               {/* Username / Email */}
               <ControllerInput
                  label={t('signin.username')}
                  name="identifier"
                  control={control}
                  size="large"
                  prefix={<MailOutlined className="text-gray-400" />}
                  className="rounded-lg border border-gray-300 px-4 py-3 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-100"
               />

               {/* Password */}
               <ControllerInputPassword
                  label={t('signin.password')}
                  name="password"
                  control={control}
                  size="large"
                  prefix={<LockOutlined className="text-gray-400" />}
                  className="rounded-lg border border-gray-300 px-4 py-3 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-100"
               />

               {/* Submit Button */}
               <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoadingSignin}
                  className="mt-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 py-3 text-lg font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:to-indigo-600"
               >
                  {t('signin.submit')}
               </Button>

               {/* Forgot Password */}
               <div className="mt-2 cursor-pointer text-center text-sm text-gray-500 transition hover:text-blue-600">
                  {t('signin.forgot_password')}
               </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-400">© 2025 Your Company</div>
         </Card>
      </div>
   );
};

export default Login;
