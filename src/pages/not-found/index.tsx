import React from 'react';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router';

const NotFound: React.FC = () => {
   return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
         <h1 className="animate-bounce text-9xl font-extrabold text-indigo-500">404</h1>
         <h2 className="mt-4 text-3xl font-semibold">Oops! Page Not Found</h2>
         <p className="mt-2 max-w-sm text-center text-gray-600 dark:text-gray-400">
            The page you are looking for does not exist or has been moved.
         </p>
         <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded bg-indigo-500 px-6 py-3 font-medium text-white shadow transition hover:bg-indigo-600"
         >
            <FiHome size={20} />
            Go Home
         </Link>
      </div>
   );
};

export default NotFound;
