import React, { Component, type ErrorInfo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Result, Typography, Modal, message } from 'antd';
import { BugOutlined, ReloadOutlined, HomeOutlined, ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons';

interface Props {
   children: React.ReactNode;
   fallback?: React.ReactNode;
   onError?: (error: Error, errorInfo: ErrorInfo) => void;
   mode?: 'global' | 'page'; // 'global' cho toàn app, 'page' cho trang con
}

interface State {
   hasError: boolean;
   error: Error | null;
   componentStack: string | null;
}

interface FallbackProps {
   error: Error;
   componentStack: string | null;
   mode: 'global' | 'page';
   onReset: () => void;
}

// Helper để phân tích chi tiết nơi xảy ra lỗi từ Stack Trace
const parseErrorLocation = (stack?: string) => {
   if (!stack) return null;

   const lines = stack.split('\n');
   // Duyệt qua các dòng stack để tìm dòng đầu tiên không thuộc thư viện bên ngoài (node_modules)
   for (const rawLine of lines.slice(1)) {
      const line = rawLine?.trim();
      if (!line) continue;

      if (
         line.startsWith('at ') &&
         !line.includes('node_modules') &&
         !line.includes('react-router') &&
         !line.includes('@loadable') &&
         !line.includes('react-dom') &&
         !line.includes('react.js')
      ) {
         // Trích xuất Tên hàm và Đường dẫn file cùng dòng/cột
         // Định dạng thông thường: "at FunctionName (fileUrl:line:col)" hoặc "at fileUrl:line:col"
         const match = line.match(/at\s+(.+?)\s+\((.+?)\)/) || line.match(/at\s+(.+)/);
         if (match) {
            const funcName = match[2] ? match[1] : 'Anonymous';
            const fileUrl = match[2] ? match[2] : match[1];

            // Làm sạch đường dẫn (bỏ các query parameters của Vite như ?t=... hoặc tiền tố localhost)
            let cleanFile = fileUrl || '';
            cleanFile = cleanFile.replace(/http:\/\/localhost:\d+/g, '');
            cleanFile = cleanFile.split('?')[0] || cleanFile;

            const lineColMatch = fileUrl?.match(/:(\d+):(\d+)\)?$/) || fileUrl?.match(/:(\d+)\)?$/);
            const lineNum = lineColMatch ? lineColMatch[1] : '';
            const colNum = lineColMatch && lineColMatch[2] ? lineColMatch[2] : '';

            return {
               functionName: funcName,
               fileName: cleanFile,
               line: lineNum,
               column: colNum,
               rawLine: line,
            };
         }
      }
   }
   return null;
};

// Helper để phân tích luồng các Component bị ảnh hưởng trong React
const parseComponentStack = (componentStack?: string | null) => {
   if (!componentStack) return [];
   return componentStack
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('at '))
      .map((line) => {
         const match = line.match(/at\s+([A-Za-z0-9_]+)/);
         return match ? match[1] : '';
      })
      .filter((name): name is string => !!name && name !== 'div' && name !== 'pre' && name !== 'span' && name !== 'p');
};

const ErrorFallback = ({ error, componentStack, mode, onReset }: FallbackProps) => {
   const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(mode === 'global');

   const handleReload = () => {
      window.location.reload();
   };

   const handleAction = () => {
      onReset();
      if (mode === 'global') {
         window.location.href = '/';
      } else {
         void navigate(-1);
      }
   };

   const errorMessage = error.message || String(error);
   const errorStack = error.stack;

   const errorLocation = parseErrorLocation(errorStack);
   const componentChain = parseComponentStack(componentStack);

   const handleCopyError = async () => {
      try {
         const locationText = errorLocation
            ? `Location: ${errorLocation.functionName} (${errorLocation.fileName}:${errorLocation.line}:${errorLocation.column})\n`
            : '';
         const chainText = componentChain.length > 0 ? `Component Hierarchy: ${componentChain.join(' ➜ ')}\n` : '';
         const fullText = `Error: ${errorMessage}\n${locationText}${chainText}\nStack Trace:\n${errorStack || 'N/A'}`;
         await navigator.clipboard.writeText(fullText);
         void message.success('Đã sao chép chi tiết lỗi vào bộ nhớ tạm!');
      } catch (err) {
         console.error('Failed to copy text: ', err);
         void message.error('Không thể sao chép lỗi.');
      }
   };

   // Giao diện Lỗi Toàn Cục (Global mode)
   if (mode === 'global') {
      return (
         <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 select-none">
            {/* Background Placeholder */}
            <div className="animate-pulse text-center opacity-30">
               <BugOutlined className="text-8xl text-slate-300" />
               <h1 className="mt-4 text-xl font-semibold text-slate-400">Hệ thống đang phục hồi...</h1>
            </div>

            <Modal
               title={
                  <div className="flex items-center gap-2 text-red-600">
                     <BugOutlined />
                     <span className="font-bold">Hệ thống phát hiện lỗi lớn</span>
                  </div>
               }
               open={isModalOpen}
               onOk={handleAction}
               onCancel={handleAction}
               width={750}
               okText="Về Trang chủ"
               cancelButtonProps={{ style: { display: 'none' } }}
               closable={false}
               centered
               styles={{
                  body: {
                     maxHeight: 'calc(100vh - 220px)',
                     overflowY: 'auto',
                  },
               }}
            >
               <Result
                  status="error"
                  title="Ứng dụng gặp sự cố ngoài ý muốn"
                  subTitle={
                     <div className="mt-2 space-y-3 text-left text-sm text-gray-500">
                        <p>
                           Hệ thống đã ghi nhận lỗi này và sẽ tự động gửi báo cáo đến đội ngũ kỹ thuật. Vui lòng tải lại
                           trang hoặc quay lại Trang chủ để tiếp tục sử dụng.
                        </p>

                        {import.meta.env.DEV && (
                           <div className="mt-4 space-y-3">
                              {/* Vị trí file bị lỗi */}
                              {errorLocation && (
                                 <div className="rounded border border-blue-100 bg-blue-50/50 p-4">
                                    <span className="font-semibold text-blue-700">Vị trí phát hiện lỗi:</span>
                                    <div className="mt-2 space-y-1 font-mono text-xs text-gray-700">
                                       <div>
                                          <span className="text-gray-400">Hàm/Component:</span>{' '}
                                          <span className="font-semibold text-blue-600">
                                             {errorLocation.functionName}
                                          </span>
                                       </div>
                                       <div>
                                          <span className="text-gray-400">Tệp tin:</span>{' '}
                                          <span className="font-semibold text-gray-600">{errorLocation.fileName}</span>
                                       </div>
                                       <div>
                                          <span className="text-gray-400">Vị trí:</span>{' '}
                                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800">
                                             Dòng {errorLocation.line}, Cột {errorLocation.column}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {/* Chi tiết Stack Trace */}
                              <details className="rounded border border-gray-200 bg-gray-50 p-3 text-left">
                                 <summary className="cursor-pointer text-xs font-semibold text-gray-600 select-none">
                                    Stack Trace Chi Tiết
                                 </summary>
                                 <pre className="mt-2 max-h-40 overflow-auto font-mono text-[11px] whitespace-pre-wrap text-red-600">
                                    {errorMessage}
                                    {`\n\nStack Trace:\n${errorStack}`}
                                 </pre>
                              </details>
                           </div>
                        )}
                     </div>
                  }
                  extra={
                     <div className="flex justify-center gap-3">
                        <Button type="primary" icon={<ReloadOutlined />} onClick={handleReload}>
                           Thử lại
                        </Button>
                        <Button icon={<HomeOutlined />} onClick={handleAction}>
                           Về Trang chủ
                        </Button>
                     </div>
                  }
               />
            </Modal>
         </div>
      );
   }

   // Giao diện Lỗi Cấp Trang (Page mode)
   return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-6 select-none">
         <Result
            status="error"
            icon={<BugOutlined className="text-5xl text-red-500" />}
            title={
               <Typography.Title level={4} className="m-0 text-gray-800">
                  Đã xảy ra sự cố hiển thị trang!
               </Typography.Title>
            }
            subTitle={
               <div className="mt-2 max-w-lg text-sm text-gray-500">
                  <p>
                     Rất tiếc, đã có lỗi xảy ra khi tải hoặc kết xuất trang này. Vui lòng thử tải lại trang hoặc quay
                     lại trang trước đó.
                  </p>
               </div>
            }
            extra={
               <div className="flex flex-wrap justify-center gap-3">
                  <Button type="primary" icon={<ReloadOutlined />} onClick={handleReload}>
                     Tải lại trang
                  </Button>
                  <Button icon={<ArrowLeftOutlined />} onClick={handleAction}>
                     Quay lại
                  </Button>
                  <Button type="dashed" danger icon={<BugOutlined />} onClick={() => setIsModalOpen(true)}>
                     Xem chi tiết lỗi
                  </Button>
               </div>
            }
         />

         {/* Modal chi tiết lỗi cấp trang */}
         <Modal
            title={
               <div className="flex items-center gap-2 text-red-600">
                  <BugOutlined />
                  <span>Chi tiết lỗi hệ thống</span>
               </div>
            }
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            width={750}
            okText="Đóng"
            cancelButtonProps={{ style: { display: 'none' } }}
            centered
            styles={{
               body: {
                  maxHeight: 'calc(100vh - 220px)',
                  overflowY: 'auto',
               },
            }}
         >
            <div className="mt-4 space-y-4">
               {/* 1. Thông báo lỗi */}
               <div className="rounded border border-red-100 bg-red-50/50 p-4">
                  <div className="flex items-center justify-between">
                     <span className="font-semibold text-red-700">Thông báo lỗi:</span>
                     <Button
                        type="text"
                        size="small"
                        disabled={!errorMessage}
                        htmlType="button"
                        icon={<CopyOutlined />}
                        onClick={handleCopyError}
                        className="text-gray-500 hover:text-blue-600"
                     >
                        Sao chép lỗi
                     </Button>
                  </div>
                  <p className="mt-1 font-mono text-sm whitespace-pre-wrap text-red-600">{errorMessage}</p>
               </div>

               {/* 2. Định vị file & dòng code bị crash */}
               {errorLocation && (
                  <div className="rounded border border-blue-100 bg-blue-50/50 p-4">
                     <span className="font-semibold text-blue-700">Định vị nguồn phát sinh lỗi:</span>
                     <div className="mt-2 space-y-1.5 font-mono text-xs text-gray-700">
                        <div>
                           <span className="text-gray-400">Hàm/Component:</span>{' '}
                           <span className="font-bold text-blue-700">{errorLocation.functionName}</span>
                        </div>
                        <div>
                           <span className="text-gray-400">Tệp tin bị lỗi:</span>{' '}
                           <span className="font-semibold text-gray-800">{errorLocation.fileName}</span>
                        </div>
                        <div>
                           <span className="text-gray-400">Dòng/Cột:</span>{' '}
                           <span className="rounded bg-blue-100 px-2 py-0.5 font-bold text-blue-800">
                              Dòng {errorLocation.line}, Cột {errorLocation.column}
                           </span>
                        </div>
                     </div>
                  </div>
               )}

               {/* 3. Luồng phân cấp Component bị sập */}
               {componentChain.length > 0 && (
                  <div className="rounded border border-slate-100 bg-slate-50/50 p-4">
                     <span className="font-semibold text-slate-700">Luồng phân cấp Component bị ảnh hưởng:</span>
                     <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-xs">
                        {componentChain.map((comp, idx) => (
                           <React.Fragment key={idx}>
                              {idx > 0 && <span className="text-gray-400">➜</span>}
                              <span
                                 className={`rounded px-1.5 py-0.5 font-semibold ${idx === 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}
                              >
                                 {comp}
                              </span>
                           </React.Fragment>
                        ))}
                     </div>
                  </div>
               )}

               {/* 4. Chi tiết stack trace */}
               {errorStack && (
                  <div>
                     <span className="mb-2 block font-semibold text-gray-700">Stack Trace chi tiết:</span>
                     <pre className="max-h-60 overflow-auto rounded bg-slate-900 p-4 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-slate-200">
                        {errorStack}
                     </pre>
                  </div>
               )}
            </div>
         </Modal>
      </div>
   );
};

class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = { hasError: false, error: null, componentStack: null };
   }

   static getDerivedStateFromError(error: Error): Partial<State> {
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      const { onError } = this.props;
      onError?.(error, errorInfo);
      this.setState({ error, componentStack: errorInfo.componentStack ?? null });
      console.error('ErrorBoundary caught an error:', error, errorInfo);
   }

   handleReset = () => {
      this.setState({ hasError: false, error: null, componentStack: null });
   };

   render() {
      const { children, fallback, mode = 'page' } = this.props;
      const { hasError, error, componentStack } = this.state;

      if (hasError && error) {
         if (fallback) {
            return fallback;
         }
         return <ErrorFallback error={error} componentStack={componentStack} mode={mode} onReset={this.handleReset} />;
      }

      return children;
   }
}

export default ErrorBoundary;
