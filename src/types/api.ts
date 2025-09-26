/**
 * API 관련 타입 정의
 */

// 기본 API 응답 구조
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// 페이지네이션
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// 에러 응답
export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}
