'use no memo';

import type React from 'react';
import { useMemo, useState } from 'react';
import type { TableProps as AntdTableProps } from 'antd';
import { Table as AntdTable, Button, Pagination, Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import {
   useReactTable,
   getCoreRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   flexRender,
   type ColumnDef,
   type SortingState,
} from '@tanstack/react-table';

import './table.style.scss';
import type { SorterResult } from 'antd/es/table/interface';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface Table<TData> {
   columnsData: ColumnDef<TData, unknown>[];
   dataSource: TData[];

   total?: number;

   manualPagination?: boolean;
   manualSorting?: boolean;

   loading?: boolean;

   rowKey?: keyof TData | ((record: TData) => React.Key);
}

const Table = <TData extends object>({
   columnsData,
   dataSource,
   total = 0,
   manualPagination,
   manualSorting,
   rowKey,
   loading,
}: Table<TData>) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [columnVisibility, setColumnVisibility] = useState({});

   // --- 1. ĐỌC TRẠNG THÁI TỪ URL PARAMS ---
   const page = parseInt(searchParams.get('page') || '1', 10);
   const pageSize = parseInt(searchParams.get('pageSize') || '5', 10);
   const sortBy = searchParams.get('sortBy');
   const sortOrder = searchParams.get('sortOrder');

   const pagination = useMemo(() => ({ pageIndex: page - 1, pageSize }), [page, pageSize]);
   const sorting = useMemo<SortingState>(() => {
      if (sortBy && sortOrder) return [{ id: sortBy, desc: sortOrder === 'desc' }];
      return [];
   }, [sortBy, sortOrder]);

   const columns = useMemo(() => columnsData, [columnsData]);

   // --- 2. KHỞI TẠO TANSTACK TABLE ---
   // eslint-disable-next-line react-hooks/incompatible-library
   const table = useReactTable<TData>({
      data: dataSource,
      columns,
      state: {
         sorting,
         pagination,
         columnVisibility,
      },
      manualSorting: manualSorting || false,
      manualPagination: manualPagination || false,
      pageCount: Math.ceil((total || dataSource.length) / pageSize),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
   });

   const antdColumns: AntdTableProps<TData>['columns'] = useMemo(() => {
      return table.getFlatHeaders().map((header) => {
         const columnId = header.column.id;
         return {
            id: columnId,
            title: () => flexRender(header.column.columnDef.header, header.getContext()),
            dataIndex: columnId,
            key: columnId,
            sorter: header.column.getCanSort(),
            sortOrder: sortBy === columnId ? (sortOrder === 'desc' ? 'descend' : 'ascend') : null,
         };
      });
   }, [table, sortBy, sortOrder]);

   // Lấy dữ liệu đã phân trang và sort từ nội bộ TanStack
   const rowData = table.getRowModel().rows.map((row) => row.original);

   // --- 3. HÀM CẬP NHẬT URL PARAMS CHUNG ---
   const updateUrlParams = (newPage: number, newPageSize: number, currentSorter?: SorterResult<TData>) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', String(newPage));
      newParams.set('pageSize', String(newPageSize));

      if (currentSorter && !Array.isArray(currentSorter) && currentSorter.field && currentSorter.order) {
         newParams.set('sortBy', String(currentSorter.field));
         newParams.set('sortOrder', currentSorter.order === 'descend' ? 'desc' : 'asc');
      } else if (currentSorter) {
         newParams.delete('sortBy');
         newParams.delete('sortOrder');
      }
      setSearchParams(newParams);
   };

   // Xử lý khi user bấm sort trên Header của Antd
   const handleTableChange: AntdTableProps<TData>['onChange'] = (_antdPagination, _filters, sorter) => {
      const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
      updateUrlParams(page, pageSize, singleSorter);
   };

   const totalPages = Math.ceil(total / pageSize);
   const isPrevDisabled = page <= 1;
   const isNextDisabled = page >= totalPages;

   return (
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
         {/* TABLE */}
         <div className="relative flex flex-1 overflow-hidden rounded-2xl">
            <AntdTable<TData>
               columns={antdColumns}
               dataSource={rowData}
               rowKey={rowKey}
               className="custom-table h-full w-full"
               onChange={handleTableChange}
               pagination={false}
               loading={false}
               scroll={{
                  x: 'max-content',
                  y: '100%',
               }}
               locale={{
                  emptyText: (
                     <div className="flex flex-col items-center justify-center py-16">
                        <img src="/images/empty-data.svg" alt="empty" className="mb-3 h-28 w-28 opacity-80" />

                        <p className="text-sm font-medium text-gray-500">Không có dữ liệu</p>

                        <p className="mt-1 text-xs text-gray-400">Không tìm thấy dữ liệu phù hợp</p>
                     </div>
                  ),
               }}
            />

            {/* LOADING OVERLAY */}
            {loading && (
               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[2px]">
                  <Spin size="large" />

                  <span className="mt-4 text-sm font-medium text-gray-500">Đang tải dữ liệu...</span>
               </div>
            )}
         </div>

         {/* FOOTER */}
         <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-gray-100 px-4 py-3 shadow-sm">
            {/* LEFT */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
               <span>Tổng:</span>

               <span className="font-semibold text-gray-800">{total}</span>

               <span>bản ghi</span>
            </div>

            {/* RIGHT */}
            <Pagination
               className="custom-pagination"
               current={page}
               pageSize={pageSize}
               total={total}
               showSizeChanger
               showQuickJumper
               pageSizeOptions={['5', '10', '20', '50', '100']}
               showTotal={(total, range) => `${range[0]}-${range[1]} trên ${total} bản ghi`}
               onChange={(newPage, newPageSize) => {
                  updateUrlParams(newPage, newPageSize);
               }}
               itemRender={(pageNumber, type, originalElement) => {
                  const isActive = pageNumber === page;

                  if (type === 'prev') {
                     return <Button size="middle" disabled={isPrevDisabled} icon={<LeftOutlined />} />;
                  }

                  if (type === 'next') {
                     return <Button size="middle" disabled={isNextDisabled} icon={<RightOutlined />} />;
                  }

                  if (type === 'page') {
                     return <Button type={isActive ? 'primary' : 'text'} size="middle" icon={pageNumber} />;
                  }

                  return originalElement;
               }}
            />
         </div>
      </div>
   );
};

export default Table;
