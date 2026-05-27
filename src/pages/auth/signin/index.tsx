import { LoginForm } from '@features/auth';

const Login = () => {
   return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50/50 via-slate-100 to-indigo-100/50 p-4">
         <LoginForm />
      </div>
   );
};

export default Login;
