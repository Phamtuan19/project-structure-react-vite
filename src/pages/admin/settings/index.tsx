import { Form, Input, Button, Switch, Divider, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const Settings = () => {
   const [form] = Form.useForm();

   const onFinish = (values: unknown) => {
      console.log('Saved settings:', values);
      message.success('Cập nhật cài đặt hệ thống thành công!');
   };

   return (
      <div className="max-w-2xl">
         <h2 className="text-xl font-bold text-gray-800">Cấu hình hệ thống</h2>
         <p className="mt-1 mb-6 text-sm text-gray-500">
            Thiết lập các cấu hình vận hành và bảo mật của trang quản trị.
         </p>

         <Form
            form={form}
            layout="vertical"
            initialValues={{
               siteName: 'Admin Portal',
               maintenanceMode: false,
               emailNotifications: true,
               sessionTimeout: 30,
            }}
            onFinish={onFinish}
            requiredMark={false}
         >
            <h3 className="text-base font-semibold text-gray-700">Cài đặt chung</h3>
            <Divider className="my-3" />

            <Form.Item
               label="Tên Website / Cổng quản trị"
               name="siteName"
               rules={[{ required: true, message: 'Vui lòng nhập tên website!' }]}
            >
               <Input placeholder="Nhập tên cổng quản trị..." className="max-w-md" />
            </Form.Item>

            <Form.Item
               label="Chế độ bảo trì hệ thống"
               name="maintenanceMode"
               valuePropName="checked"
               help="Khi kích hoạt, người dùng thông thường sẽ thấy màn hình thông báo bảo trì."
            >
               <Switch />
            </Form.Item>

            <h3 className="mt-8 text-base font-semibold text-gray-700">Bảo mật & Thông báo</h3>
            <Divider className="my-3" />

            <Form.Item
               label="Nhận thông báo qua Email"
               name="emailNotifications"
               valuePropName="checked"
               help="Nhận email thông báo khi có lỗi phát sinh hoặc người dùng đăng ký mới."
            >
               <Switch />
            </Form.Item>

            <Form.Item
               label="Thời gian tự động đăng xuất (Phút)"
               name="sessionTimeout"
               rules={[{ required: true, message: 'Vui lòng nhập số phút!' }]}
               help="Tự động đăng xuất tài khoản quản trị khi không tương tác sau số phút đã chọn."
            >
               <Input type="number" min={5} max={1440} className="max-w-xs" />
            </Form.Item>

            <Divider className="my-6" />

            <Form.Item className="mb-0">
               <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Lưu thay đổi
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default Settings;
