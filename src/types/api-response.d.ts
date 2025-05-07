interface AxiosResponseData<TData = Record<string, any>> {
   map: any;
   success: boolean;
   message: string;
   data: TData;
}

interface HandleErrorApi {
   data: any;
   success: boolean;
   statusCode: number;
   message: { [key: string]: string[] };
}

type ResponseStatus = 0 | 1; // 1 : lỗi, 0: Success

/**
 *
 * @HandleErrorApiResponse
 *
 * - statusCode: Mã lỗi HTTP (ví dụ: 400, 401, 500)
 * - message: Thông báo lỗi
 * - error: Mô tả lỗi hệ thống (ví dụ: "Bad Request", "Unauthorized")
 * - data: Dữ liệu phụ nếu có (chi tiết lỗi cụ thể)
 * - timestamp: Thời điểm lỗi xảy ra (ISO 8601 format)
 * - path: Endpoint
 * - code: Trạng thái trả về (0: thành công, 1: lỗi)
 *
 */

interface HandleErrorApiResponse {
   code: ResponseStatus;
   statusCode: number;
   message: string;
   error?: string;
   data?: T;
   timestamp?: string;
   path?: string;
}

/**
 *
 * @SuccessResponse
 * - statusCode: Mã lỗi HTTP (ví dụ: 400, 401, 500)
 * - message: Thông báo lỗi
 * - data: Dữ liệu trả về
 * - timestamp: Thời điểm lỗi xảy ra (ISO 8601 format)
 * - path: Endpoint
 * - code: Trạng thái trả về (0: thành công, 1: lỗi)
 *
 */

interface SuccessResponse<T> {
   code: ResponseStatus;
   statusCode: number;
   message: string;
   data: T;
   timestamp?: string;
   path?: string;
}

/**
 *
 * @SuccessResponsePaging
 *
 * - statusCode: Mã lỗi HTTP (ví dụ: 400, 401, 500)
 * - message: Thông báo lỗi
 * - data: Dữ liệu trả về
 * - content: Mảng dữ liệu
 * - totalElements: Tổng số phần tử
 * - totalPages: Tổng số trang
 * - page: Trang hiện tại
 * - size: Kích thước trang
 * - hasNext: Có trang tiếp theo hay không
 * - hasPrevious: Có trang trước hay không
 * - timestamp: Thời điểm lỗi xảy ra (ISO 8601 format)
 * - path: Endpoint
 * - code: Trạng thái trả về (0: thành công, 1: lỗi)
 *
 */

interface SuccessResponsePaging<T> {
   code: ResponseStatus;
   statusCode: number;
   message: string;
   data: {
      content: T[];
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
