import { Button, Card, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { ControllerInput, ControllerInputPassword } from '@components';
import { EMAIL_REGEX, USER_NAME_REGEX } from '@constants';
import { useAuth } from '@hooks';

export const loginSchema = z.object({
   identifier: z
      .string()
      .min(1, { message: 'auth.signin.errors.identifier_required' })
      .refine((val) => EMAIL_REGEX.test(val) || USER_NAME_REGEX.test(val), {
         message: 'auth.signin.errors.identifier_invalid',
      }),
   password: z.string().min(1, { message: 'auth.signin.errors.password_required' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
   const { t } = useTranslation();
   const { autSignin, isLoadingSignin } = useAuth();

   const { control, handleSubmit } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         identifier: import.meta.env.VITE_DEV_USERNAME || '',
         password: import.meta.env.VITE_DEV_PASSWORD || '',
      },
   });

   const onSubmit = async (data: LoginFormValues) => {
      autSignin(data);
   };

   return (
      <Card className="w-full max-w-md rounded-2xl border border-gray-100/50 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
         {/* Title & Subtitle */}
         <div className="mb-8 text-center">
            <Typography.Title
               level={2}
               className="!mb-2 !bg-linear-to-r !from-blue-600 !to-indigo-600 !bg-clip-text !text-3xl !font-extrabold !text-transparent"
            >
               {t('auth.signin.title')}
            </Typography.Title>
            <Typography.Text className="text-sm text-gray-400">
               Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.
            </Typography.Text>
         </div>

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Username / Email */}
            <ControllerInput
               label={t('auth.signin.username')}
               name="identifier"
               control={control}
               size="large"
               prefix={<MailOutlined className="text-gray-400" />}
               className="rounded-lg"
            />

            {/* Password */}
            <ControllerInputPassword
               label={t('auth.signin.password')}
               name="password"
               control={control}
               size="large"
               prefix={<LockOutlined className="text-gray-400" />}
               className="rounded-lg"
            />

            {/* Actions: Forgot Password & Register Link */}
            <div className="mt-1 flex items-center justify-between text-xs">
               <span className="text-gray-400">
                  Chưa có tài khoản?{' '}
                  <Link to="/auth/register" className="font-medium text-blue-500 hover:underline">
                     Đăng ký
                  </Link>
               </span>
               <span className="cursor-pointer font-medium text-gray-500 transition hover:text-blue-600">
                  {t('auth.signin.forgot_password')}
               </span>
            </div>

            {/* Submit Button */}
            <Button
               type="primary"
               htmlType="submit"
               size="large"
               loading={isLoadingSignin}
               className="mt-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/30"
            >
               {t('auth.signin.submit')}
            </Button>
         </form>
      </Card>
   );
};
