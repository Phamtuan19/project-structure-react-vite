type ResponseStatus = 0 | 1; // 1 : lỗi, 0: Success

/**
 * Interface phản hồi lỗi từ API.
 *
 * Các trường bao gồm:
 * - `statusCode`: Mã lỗi HTTP (vd: 400, 401, 500)
 * - `message`: Thông báo lỗi
 * - `error`: Mô tả lỗi hệ thống
 * - `data`: Dữ liệu phụ nếu có
 * - `timestamp`: Thời điểm lỗi xảy ra (ISO 8601 format)
 * - `path`: Endpoint gây lỗi
 * - `code`: Trạng thái trả về (0: thành công, 1: lỗi)
 */
interface ErrorApiResponse<TData = unknown> {
   code: ResponseStatus;
   statusCode: number;
   message: string;
   error?: string;
   data?: TData;
   timestamp?: string;
   path?: string;
}

/**
 * Cấu trúc phản hồi thành công từ API.
 *
 * Các trường bao gồm:
 * - `statusCode`: Mã HTTP (vd: 200)
 * - `message`: Thông báo thành công
 * - `data`: Dữ liệu trả về
 * - `timestamp`: Thời điểm phản hồi (ISO 8601 format)
 * - `path`: Endpoint tương ứng
 * - `code`: Trạng thái trả về (0: thành công, 1: lỗi)
 */
interface SuccessResponsePaging<TData = unknown> {
   code: ResponseStatus;
   statusCode: number;
   message: string;
   data: {
      content: TData[];
      totalElements: number;
      totalPages: number;
      page: number;
      size: number;

      hasNext: boolean;
      hasPrevious: boolean;
   };
   timestamp?: string;
   path?: string;
}
interface SuccessResponseNonPaging<TData = unknown> {
   code: ResponseStatus;
   statusCode: number;
   message: string;
   data: {
      content: TData;
      totalElements: number;
      totalPages: number;
      page: number;
      size: number;

      hasNext: boolean;
      hasPrevious: boolean;
   };
   timestamp?: string;
   path?: string;
}
interface SuccessResponse<TData = unknown> {
   code: ResponseStatus;
   statusCode: number;
   message: string;
   data: TData;
   timestamp?: string;
   path?: string;
}
