import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Result, Typography } from 'antd';
import { BugOutlined, ReloadOutlined } from '@ant-design/icons';
import * as Sentry from '@sentry/react';

interface Props {
   children: ReactNode;
   fallback?: ReactNode;
   onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
   hasError: boolean;
   error?: Error;
   errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      const { onError } = this.props;

      Sentry.captureException(error, {
         contexts: {
            errorInfo: {
               componentStack: errorInfo.componentStack,
            },
         },
      });

      onError?.(error, errorInfo);

      this.setState({ error, errorInfo });
   }

   handleRetry = () => {
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
   };

   render() {
      const { children, fallback } = this.props;
      const { hasError, error, errorInfo } = this.state;

      if (hasError) {
         if (fallback) {
            return fallback;
         }

         return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
               <Result
                  status="error"
                  icon={<BugOutlined className="text-red-500" />}
                  title={
                     <Typography.Title level={3} className="mb-2 text-gray-800">
                        Oops! Something went wrong
                     </Typography.Title>
                  }
                  subTitle={
                     <div className="mb-4 text-gray-600">
                        <p className="mb-2">
                           We're sorry, but something unexpected happened. Our team has been notified and is working to
                           fix this issue.
                        </p>

                        {import.meta.env.DEV && error && (
                           <details className="mt-4 rounded bg-gray-100 p-3 text-sm">
                              <summary className="cursor-pointer font-medium">Error Details (Development)</summary>
                              <pre className="mt-2 whitespace-pre-wrap text-red-600">
                                 {error.toString()}
                                 {errorInfo?.componentStack}
                              </pre>
                           </details>
                        )}
                     </div>
                  }
                  extra={
                     <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        <Button type="primary" icon={<ReloadOutlined />} onClick={this.handleRetry} size="large">
                           Try Again
                        </Button>
                        <Button onClick={() => (window.location.href = '/')} size="large">
                           Go Home
                        </Button>
                     </div>
                  }
               />
            </div>
         );
      }

      return <div key={hasError ? 'error' : 'normal'}>{children}</div>;
   }
}

export default ErrorBoundary;
