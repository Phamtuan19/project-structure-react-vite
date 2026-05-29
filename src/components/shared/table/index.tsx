'use no memo';

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

interface TableCustomProps<TData extends object> extends Omit<AntdTableProps<TData>, 'columns' | 'dataSource'> {
   columnsData: ColumnDef<TData, unknown>[];
   dataSource: TData[];

   total?: number;

   manualPagination?: boolean;
   manualSorting?: boolean;

   loading?: boolean;

   syncToUrl?: boolean;
   urlPrefix?: string;
}

const Table = <TData extends object>({
   columnsData,
   dataSource,
   total = 0,
   manualPagination,
   manualSorting,
   rowKey,
   loading,
   syncToUrl = true,
   urlPrefix,
   onChange,
   ...restProps
}: TableCustomProps<TData>) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [columnVisibility, setColumnVisibility] = useState({});

   // --- LOCAL STATES FOR FALLBACK WHEN syncToUrl = false ---
   const [localPage, setLocalPage] = useState(1);
   const [localPageSize, setLocalPageSize] = useState(5);
   const [localSortBy, setLocalSortBy] = useState<string | null>(null);
   const [localSortOrder, setLocalSortOrder] = useState<string | null>(null);

   // --- KEYS FOR URL PARAMS ---
   const pageKey = urlPrefix ? `${urlPrefix}_page` : 'page';
   const pageSizeKey = urlPrefix ? `${urlPrefix}_pageSize` : 'pageSize';
   const sortByKey = urlPrefix ? `${urlPrefix}_sortBy` : 'sortBy';
   const sortOrderKey = urlPrefix ? `${urlPrefix}_sortOrder` : 'sortOrder';

   // --- READ STATE FROM URL OR LOCAL ---
   const page = syncToUrl ? parseInt(searchParams.get(pageKey) || '1', 10) : localPage;
   const pageSize = syncToUrl ? parseInt(searchParams.get(pageSizeKey) || '5', 10) : localPageSize;
   const sortBy = syncToUrl ? searchParams.get(sortByKey) : localSortBy;
   const sortOrder = syncToUrl ? searchParams.get(sortOrderKey) : localSortOrder;

   const pagination = useMemo(() => ({ pageIndex: page - 1, pageSize }), [page, pageSize]);
   const sorting = useMemo<SortingState>(() => {
      if (sortBy && sortOrder) return [{ id: sortBy, desc: sortOrder === 'desc' }];
      return [];
   }, [sortBy, sortOrder]);

   const columns = useMemo(() => columnsData, [columnsData]);

   // --- KHỞI TẠO TANSTACK TABLE ---
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
         const restColumnProps = { ...header.column.columnDef };
         delete restColumnProps.header;
         delete restColumnProps.cell;
         return {
            id: columnId,
            title: () => flexRender(header.column.columnDef.header, header.getContext()),
            dataIndex: columnId,
            key: columnId,
            sorter: header.column.getCanSort(),
            sortOrder: sortBy === columnId ? (sortOrder === 'desc' ? 'descend' : 'ascend') : null,
            render: (_value, _record, index) => {
               // eslint-disable-next-line security/detect-object-injection
               const row = table.getRowModel().rows[index];
               const cell = row?.getVisibleCells().find((c) => c.column.id === columnId);
               return cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : _value;
            },
            ...restColumnProps,
         };
      });
   }, [table, sortBy, sortOrder]);

   // Lấy dữ liệu đã phân trang và sort từ nội bộ TanStack
   const rowData = table.getRowModel().rows.map((row) => row.original);

   // --- HÀM CẬP NHẬT TRẠNG THÁI CHUNG ---
   const updateParams = (newPage: number, newPageSize: number, currentSorter?: SorterResult<TData>) => {
      if (syncToUrl) {
         const newParams = new URLSearchParams(searchParams);
         newParams.set(pageKey, String(newPage));
         newParams.set(pageSizeKey, String(newPageSize));

         if (currentSorter && !Array.isArray(currentSorter) && currentSorter.field && currentSorter.order) {
            newParams.set(sortByKey, String(currentSorter.field));
            newParams.set(sortOrderKey, currentSorter.order === 'descend' ? 'desc' : 'asc');
         } else if (currentSorter) {
            newParams.delete(sortByKey);
            newParams.delete(sortOrderKey);
         }
         setSearchParams(newParams);
      } else {
         setLocalPage(newPage);
         setLocalPageSize(newPageSize);
         if (currentSorter && !Array.isArray(currentSorter) && currentSorter.field && currentSorter.order) {
            setLocalSortBy(String(currentSorter.field));
            setLocalSortOrder(currentSorter.order === 'descend' ? 'desc' : 'asc');
         } else if (currentSorter) {
            setLocalSortBy(null);
            setLocalSortOrder(null);
         }
      }
   };

   // Xử lý khi user bấm sort trên Header của Antd
   const handleTableChange: AntdTableProps<TData>['onChange'] = (antdPagination, filters, sorter, extra) => {
      const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
      updateParams(page, pageSize, singleSorter);
      onChange?.(antdPagination, filters, sorter, extra);
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
               {...restProps}
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
                  updateParams(newPage, newPageSize);
               }}
               itemRender={(pageNumber, type, originalElement) => {
                  if (type === 'prev') {
                     return (
                        <Button
                           size="middle"
                           disabled={isPrevDisabled}
                           icon={<LeftOutlined className="text-xs" />}
                           className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-blue-500 hover:text-blue-500 disabled:bg-gray-50 disabled:text-gray-300"
                        />
                     );
                  }

                  if (type === 'next') {
                     return (
                        <Button
                           size="middle"
                           disabled={isNextDisabled}
                           icon={<RightOutlined className="text-xs" />}
                           className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:border-blue-500 hover:text-blue-500 disabled:bg-gray-50 disabled:text-gray-300"
                        />
                     );
                  }

                  if (type === 'page') {
                     const isActive = pageNumber === page;
                     return (
                        <Button
                           type={isActive ? 'primary' : 'text'}
                           size="middle"
                           className={`flex h-9 w-9 max-w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                              isActive
                                 ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                           }`}
                        >
                           {pageNumber}
                        </Button>
                     );
                  }

                  return originalElement;
               }}
            />
         </div>
      </div>
   );
};

export default Table;
