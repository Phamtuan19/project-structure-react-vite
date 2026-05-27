import { Card, Col, Row, Statistic, Table, Tag } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, ArrowUpOutlined } from '@ant-design/icons';

const Dashboard = () => {
   throw new Error('Lỗi giả lập: Dashboard bị crash!');
   // Dữ liệu giả định
   const recentActivities = [
      { key: '1', user: 'Nguyễn Văn A', action: 'Đăng ký tài khoản', time: '5 phút trước', status: 'SUCCESS' },
      { key: '2', user: 'Trần Thị B', action: 'Thanh toán đơn hàng #1293', time: '12 phút trước', status: 'SUCCESS' },
      { key: '3', user: 'Lê Hoàng C', action: 'Yêu cầu hỗ trợ kỹ thuật', time: '1 giờ trước', status: 'PENDING' },
   ];

   const columns = [
      {
         title: 'Người dùng',
         dataIndex: 'user',
         key: 'user',
         render: (text: string) => <span className="font-medium text-gray-700">{text}</span>,
      },
      {
         title: 'Hoạt động',
         dataIndex: 'action',
         key: 'action',
      },
      {
         title: 'Thời gian',
         dataIndex: 'time',
         key: 'time',
         render: (text: string) => <span className="text-xs text-gray-400">{text}</span>,
      },
      {
         title: 'Trạng thái',
         dataIndex: 'status',
         key: 'status',
         render: (status: string) => {
            const color = status === 'SUCCESS' ? 'green' : 'gold';
            return <Tag color={color}>{status}</Tag>;
         },
      },
   ];

   return (
      <div className="space-y-6">
         {/* Welcome Area */}
         <div className="rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-xs">
            <h2 className="text-2xl font-bold">Chào mừng trở lại, Admin!</h2>
            <p className="mt-2 text-blue-100">
               Hệ thống đang hoạt động ổn định. Dưới đây là tóm tắt nhanh về hiệu suất của hệ thống hôm nay.
            </p>
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
                     value={95}
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
                     value={45200000}
                     valueStyle={{ color: '#cf1322' }}
                     prefix={<DollarOutlined />}
                  />
               </Card>
            </Col>
         </Row>

         {/* Table of Recent Activity */}
         <Card title="Hoạt động gần đây" bordered={false} className="shadow-xs">
            <Table dataSource={recentActivities} columns={columns} pagination={false} size="middle" />
         </Card>
      </div>
   );
};

export default Dashboard;
