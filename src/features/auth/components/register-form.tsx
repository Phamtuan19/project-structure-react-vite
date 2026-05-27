import { Button, Card, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { ControllerInput, ControllerInputPassword } from '@components';
import { EMAIL_REGEX } from '@constants';
import { useAuth } from '@hooks';

export const registerSchema = z
   .object({
      name: z.string().min(1, { message: 'auth.register.errors.name_required' }),
      email: z
         .string()
         .min(1, { message: 'auth.register.errors.email_required' })
         .regex(EMAIL_REGEX, { message: 'auth.register.errors.email_invalid' }),
      password: z.string().min(6, { message: 'auth.register.errors.password_min' }),
      confirmPassword: z.string().min(1, { message: 'auth.register.errors.confirm_password_required' }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'auth.register.errors.passwords_must_match',
      path: ['confirmPassword'],
   });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
   const { t } = useTranslation();
   const { authRegister, isLoadingRegister } = useAuth();
   const navigate = useNavigate();

   const { control, handleSubmit } = useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
   });

   const onSubmit = async (data: RegisterFormValues) => {
      authRegister(
         {
            name: data.name,
            email: data.email,
            password: data.password,
         },
         () => {
            // Đăng ký thành công, chuyển hướng đến trang đăng nhập
            void navigate('/auth/signin');
         },
      );
   };

   return (
      <Card className="w-full max-w-md rounded-2xl border border-gray-100/50 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
         {/* Title & Subtitle */}
         <div className="mb-8 text-center">
            <Typography.Title
               level={2}
               className="mb-2! !bg-linear-to-r !from-indigo-600 !to-violet-600 !bg-clip-text !text-3xl !font-extrabold !text-transparent"
            >
               {t('auth.register.title')}
            </Typography.Title>
            <Typography.Text className="text-sm text-gray-400">
               Tạo một tài khoản mới để bắt đầu sử dụng dịch vụ.
            </Typography.Text>
         </div>

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Full Name */}
            <ControllerInput
               label={t('auth.register.name')}
               name="name"
               control={control}
               size="large"
               prefix={<UserOutlined className="text-gray-400" />}
               className="rounded-lg"
            />

            {/* Email */}
            <ControllerInput
               label={t('auth.register.email')}
               name="email"
               control={control}
               size="large"
               prefix={<MailOutlined className="text-gray-400" />}
               className="rounded-lg"
            />

            {/* Password */}
            <ControllerInputPassword
               label={t('auth.register.password')}
               name="password"
               control={control}
               size="large"
               prefix={<LockOutlined className="text-gray-400" />}
               className="rounded-lg"
            />

            {/* Confirm Password */}
            <ControllerInputPassword
               label={t('auth.register.confirm_password')}
               name="confirmPassword"
               control={control}
               size="large"
               prefix={<LockOutlined className="text-gray-400" />}
               className="rounded-lg"
            />

            {/* Login Link */}
            <div className="mt-1 text-center text-xs">
               <span className="text-gray-400">
                  {t('auth.register.login_link') || 'Đã có tài khoản?'}{' '}
                  <Link to="/auth/signin" className="font-medium text-indigo-500 hover:underline">
                     Đăng nhập
                  </Link>
               </span>
            </div>

            {/* Submit Button */}
            <Button
               type="primary"
               htmlType="submit"
               size="large"
               loading={isLoadingRegister}
               className="mt-4 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-violet-500/30"
            >
               {t('auth.register.submit')}
            </Button>
         </form>
      </Card>
   );
};
