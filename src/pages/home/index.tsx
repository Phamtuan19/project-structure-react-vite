import { Table } from '@components';
import { Space, Button } from 'antd';
import { type ColumnDef } from '@tanstack/react-table';

interface User {
   id: string;
   name: string;
   age: number;
   address: string;
}

const Home = () => {
   const data: User[] = [
      { id: '1', name: 'Nguyen Van A', age: 25, address: 'Ha Noii' },
      { id: '2', name: 'Tran Thi B', age: 30, address: 'Da Nang' },
   ];

   const columns: ColumnDef<User, unknown>[] = [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Họ và Tên' },
      { accessorKey: 'age', header: 'Tuổi' },
      { accessorKey: 'address', header: 'Địa chỉ' },
      {
         id: 'actions',
         header: 'Hành động',
         cell: ({ row }) => (
            <Space size="middle">
               <Button type="link" onClick={() => alert(`Edit ${row.original.name}`)}>
                  Sửa
               </Button>
            </Space>
         ),
      },
   ];

   return (
      /* - `h-screen`: Bắt buộc thẻ cha bằng đúng chiều cao màn hình hiển thị.
        - `flex flex-col`: Tạo luồng sắp xếp theo chiều dọc.
      */
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-50 p-6">
         <div className="pet" />

         {/* Khối tiêu đề (Chiếm diện tích tự nhiên) */}
         <div className="mb-4 flex-shrink-0">
            <span className="text-sm text-gray-400">Home Page</span>
            <h2 className="text-xl font-bold text-gray-800">Danh sách Người dùng</h2>
         </div>

         {/* Vùng chứa Table (Chiếm toàn bộ 100% khoảng trống còn lại) */}
         <div className="min-h-0 flex-1 overflow-hidden">
            <Table columnsData={columns} dataSource={data} loading={false} />
         </div>
      </div>
   );
};

export default Home;
