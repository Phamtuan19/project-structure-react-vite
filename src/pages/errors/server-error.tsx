import { FrownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@constants';

/**
 *
 * 500 Error Page - Internal Server Error
 *
 * This page is displayed when there is an unexpected error on the server side.
 * It can be used as a fallback for Error Boundaries or for handling HTTP 500 responses.
 *
 * @returns A user-friendly error page with a "Go Home" button.
 */

const ServerError = () => {
   const navigate = useNavigate();

   return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
         {/* Error icon */}
         <FrownOutlined className="mb-4 text-6xl text-red-500" />

         {/* Error title */}
         <h1 className="mb-2 text-4xl font-bold text-gray-800">500 - Internal Server Error</h1>

         {/* Error description */}
         <p className="mb-6 text-base text-gray-500">Sorry, something went wrong on our end. Please try again later.</p>

         {/* Go home button */}
         <Button type="primary" onClick={() => navigate(ROUTE_PATH.HOME)}>
            Go to Homepage
         </Button>
      </div>
   );
};

export default ServerError;
