import { useState, useMemo } from 'react';
import type { Key } from 'react';
import { Card, Col, Row, Statistic, Tag, Button, Space, message, Typography } from 'antd';
import {
   UserOutlined,
   ShoppingCartOutlined,
   DollarOutlined,
   ArrowUpOutlined,
   BugOutlined,
   CheckCircleOutlined,
   ClockCircleOutlined,
   CloseCircleOutlined,
} from '@ant-design/icons';
import { Table } from '@components';
import { type ColumnDef } from '@tanstack/react-table';

interface Order {
   id: string;
   customerName: string;
   customerEmail: string;
   amount: number;
   status: 'SUCCESS' | 'PENDING' | 'CANCELLED';
   createdAt: string;
}

const mockOrders: Order[] = [
   {
      id: 'ORD-1001',
      customerName: 'Nguyễn Văn A',
      customerEmail: 'a.nguyen@example.com',
      amount: 1500000,
      status: 'SUCCESS',
      createdAt: '2026-05-27 10:00',
   },
   {
      id: 'ORD-1002',
      customerName: 'Trần Thị B',
      customerEmail: 'b.tran@example.com',
      amount: 890000,
      status: 'SUCCESS',
      createdAt: '2026-05-27 10:12',
   },
   {
      id: 'ORD-1003',
      customerName: 'Lê Hoàng C',
      customerEmail: 'c.le@example.com',
      amount: 2450000,
      status: 'PENDING',
      createdAt: '2026-05-27 11:05',
   },
   {
      id: 'ORD-1004',
      customerName: 'Phạm Minh D',
      customerEmail: 'd.pham@example.com',
      amount: 120000,
      status: 'CANCELLED',
      createdAt: '2026-05-27 11:30',
   },
   {
      id: 'ORD-1005',
      customerName: 'Hoàng Anh E',
      customerEmail: 'e.hoang@example.com',
      amount: 3500000,
      status: 'SUCCESS',
      createdAt: '2026-05-27 12:15',
   },
   {
      id: 'ORD-1006',
      customerName: 'Ngô Quốc F',
      customerEmail: 'f.ngo@example.com',
      amount: 450000,
      status: 'PENDING',
      createdAt: '2026-05-27 13:00',
   },
   {
      id: 'ORD-1007',
      customerName: 'Vũ Thị G',
      customerEmail: 'g.vu@example.com',
      amount: 1800000,
      status: 'SUCCESS',
      createdAt: '2026-05-27 13:45',
   },
   {
      id: 'ORD-1008',
      customerName: 'Đỗ Hữu H',
      customerEmail: 'h.do@example.com',
      amount: 990000,
      status: 'SUCCESS',
      createdAt: '2026-05-27 14:20',
   },
   {
      id: 'ORD-1009',
      customerName: 'Bùi Minh I',
      customerEmail: 'i.bui@example.com',
      amount: 5500000,
      status: 'SUCCESS',
      createdAt: '2026-05-27 15:10',
   },
   {
      id: 'ORD-1010',
      customerName: 'Lý Quốc J',
      customerEmail: 'j.ly@example.com',
      amount: 150000,
      status: 'CANCELLED',
      createdAt: '2026-05-27 15:40',
   },
   {
      id: 'ORD-1011',
      customerName: 'Nguyễn Tiến K',
      customerEmail: 'k.nguyen@example.com',
      amount: 3100000,
      status: 'PENDING',
      createdAt: '2026-05-27 16:00',
   },
   {
      id: 'ORD-1012',
      customerName: 'Trần Vân L',
      customerEmail: 'l.tran@example.com',
      amount: 720000,
      status: 'SUCCESS',
      createdAt: '2026-05-27 16:15',
   },
];

const Dashboard = () => {
   const [shouldCrash, setShouldCrash] = useState(false);
   const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

   if (shouldCrash) {
      throw new Error('Lỗi giả lập: Dashboard bị crash để thử nghiệm ErrorBoundary!');
   }

   // --- ĐỊNH NGHĨA CỘT BẢNG SỬ DỤNG TANSTACK COLUMN DEF ---
   const orderColumns = useMemo<ColumnDef<Order, unknown>[]>(
      () => [
         {
            id: 'id',
            accessorKey: 'id',
            header: 'Mã đơn hàng',
            cell: (info) => <span className="font-mono font-bold text-blue-600">{info.getValue() as string}</span>,
         },
         {
            id: 'customerName',
            accessorKey: 'customerName',
            header: 'Khách hàng',
            cell: (info) => (
               <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{info.row.original.customerName}</span>
                  <span className="text-xs text-gray-400">{info.row.original.customerEmail}</span>
               </div>
            ),
         },
         {
            id: 'amount',
            accessorKey: 'amount',
            header: 'Số tiền',
            cell: (info) => {
               const value = info.getValue() as number;
               return <span className="font-semibold text-gray-900">{value.toLocaleString('vi-VN')} đ</span>;
            },
         },
         {
            id: 'status',
            accessorKey: 'status',
            header: 'Trạng thái',
            cell: (info) => {
               const status = info.getValue() as Order['status'];
               let color = 'gold';
               let icon = <ClockCircleOutlined />;
               let label = 'Chờ xử lý';

               if (status === 'SUCCESS') {
                  color = 'green';
                  icon = <CheckCircleOutlined />;
                  label = 'Thành công';
               } else if (status === 'CANCELLED') {
                  color = 'red';
                  icon = <CloseCircleOutlined />;
                  label = 'Đã hủy';
               }

               return (
                  <Tag color={color} icon={icon} className="rounded px-2 py-0.5 font-medium">
                     {label}
                  </Tag>
               );
            },
         },
         {
            id: 'createdAt',
            accessorKey: 'createdAt',
            header: 'Thời gian tạo',
            cell: (info) => <span className="text-xs text-gray-500">{info.getValue() as string}</span>,
         },
         {
            id: 'action',
            header: 'Hành động',
            cell: (info) => (
               <Space size="small">
                  <Button
                     size="small"
                     type="link"
                     onClick={() => message.info(`Chi tiết đơn: ${info.row.original.id}`)}
                  >
                     Chi tiết
                  </Button>
                  <Button
                     size="small"
                     type="link"
                     danger
                     onClick={() => message.warning(`Yêu cầu xóa: ${info.row.original.id}`)}
                  >
                     Xóa
                  </Button>
               </Space>
            ),
         },
      ],
      [],
   );

   // Cấu hình lựa chọn dòng (Antd rowSelection)
   const rowSelection = {
      selectedRowKeys,
      onChange: (keys: Key[]) => {
         setSelectedRowKeys(keys);
      },
   };

   return (
      <div className="space-y-6">
         {/* Welcome Area & Actions */}
         <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-xs">
            <div>
               <h2 className="text-2xl font-bold">Chào mừng trở lại, Admin!</h2>
               <p className="mt-2 text-blue-100">
                  Hệ thống đang hoạt động ổn định. Bên dưới là bản demo đầy đủ tính năng của component Table nâng cấp.
               </p>
            </div>
            <Button
               type="primary"
               danger
               icon={<BugOutlined />}
               onClick={() => setShouldCrash(true)}
               className="border-white/20 bg-red-600/90 text-white hover:bg-red-700!"
            >
               Giả lập lỗi sập (ErrorBoundary)
            </Button>
         </div>

         {/* Statistics Grid */}
         <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
               <Card bordered={false} className="shadow-xs transition-shadow duration-300 hover:shadow-md">
                  <Statistic
                     title="Người dùng hoạt động"
                     value={1284}
                     valueStyle={{ color: '#3f8600' }}
                     prefix={<UserOutlined />}
                     suffix={
                        <span className="ml-2 text-xs font-normal text-gray-400">
                           <ArrowUpOutlined /> 12%
                        </span>
                     }
                  />
               </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
               <Card bordered={false} className="shadow-xs transition-shadow duration-300 hover:shadow-md">
                  <Statistic
                     title="Đơn hàng hôm nay"
                     value={mockOrders.length}
                     valueStyle={{ color: '#1890ff' }}
                     prefix={<ShoppingCartOutlined />}
                     suffix={
                        <span className="ml-2 text-xs font-normal text-gray-400">
                           <ArrowUpOutlined /> 8%
                        </span>
                     }
                  />
               </Card>
            </Col>
            <Col xs={24} lg={8}>
               <Card bordered={false} className="shadow-xs transition-shadow duration-300 hover:shadow-md">
                  <Statistic
                     title="Doanh thu (VNĐ)"
                     value={15250000}
                     valueStyle={{ color: '#cf1322' }}
                     prefix={<DollarOutlined />}
                  />
               </Card>
            </Col>
         </Row>

         {/* DEMO TABLE 1: URL SYNC + URL PREFIX + ROW SELECTION + CUSTOM CELLS */}
         <Card
            title={
               <div className="flex w-full flex-wrap items-center justify-between gap-2">
                  <span>Demo Bảng 1: Đồng bộ URL + Chọn dòng + Custom Cell ({selectedRowKeys.length} đã chọn)</span>
                  {selectedRowKeys.length > 0 && (
                     <Button
                        size="small"
                        danger
                        onClick={() => {
                           message.success(`Đã xử lý hàng loạt cho các đơn: ${selectedRowKeys.join(', ')}`);
                           setSelectedRowKeys([]);
                        }}
                     >
                        Xử lý hàng loạt
                     </Button>
                  )}
               </div>
            }
            bordered={false}
            className="shadow-xs"
         >
            <Typography.Paragraph className="mt-[-10px] mb-4 text-xs text-gray-500">
               * Bảng này đồng bộ các tham số phân trang/sắp xếp lên URL với tiền tố <code>orders_</code> (ví dụ:{' '}
               <code>orders_page</code>, <code>orders_sortBy</code>) để tránh đè trạng thái lên các bảng khác.
            </Typography.Paragraph>
            <Table
               columnsData={orderColumns}
               dataSource={mockOrders}
               total={mockOrders.length}
               rowKey="id"
               rowSelection={rowSelection}
               size="middle"
               syncToUrl={true}
               urlPrefix="orders"
               bordered
            />
         </Card>

         {/* DEMO TABLE 2: LOCAL STATE ONLY (NO URL SYNC) */}
         <Card title="Demo Bảng 2: Chỉ lưu Local State (Không ảnh hưởng URL)" bordered={false} className="shadow-xs">
            <Typography.Paragraph className="mt-[-10px] mb-4 text-xs text-gray-500">
               * Bảng này sử dụng Local State trong component để quản lý phân trang và sắp xếp độc lập mà không thay đổi
               bất kỳ tham số nào trên thanh địa chỉ URL.
            </Typography.Paragraph>
            <Table
               columnsData={orderColumns.slice(0, 4)} // Hiển thị 4 cột đầu
               dataSource={mockOrders}
               total={mockOrders.length}
               rowKey="id"
               size="small"
               syncToUrl={false}
            />
         </Card>
      </div>
   );
};

export default Dashboard;
