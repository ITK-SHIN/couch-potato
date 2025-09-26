import { Category, Video, HomeVideo, UniversalContentData } from '@/types';

// API 응답 타입들
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// CRUD 작업 타입들
export type CreateData<T> = Omit<T, 'id' | '_id'>;
export type UpdateData<T> = Partial<T> & { id: string };
export type DeleteData = { id: string };

// 카테고리 관련 타입
export type CategoryCreateData = CreateData<Category>;
export type CategoryUpdateData = UpdateData<Category>;
export type CategoryDeleteData = DeleteData;

// 비디오 관련 타입
export type VideoCreateData = CreateData<Video>;
export type VideoUpdateData = UpdateData<Video> & { _id: string };
export type VideoDeleteData = DeleteData;

// 홈 비디오 관련 타입
export type HomeVideoUpdateData = Partial<HomeVideo>;

// 유니버설 콘텐츠 관련 타입
export type UniversalContentUpdateData = {
  field: string;
  value: string;
};

// 순서 업데이트 타입
export type OrderUpdateData<T> = {
  items: T[];
};

// 훅 옵션 타입
export interface HookOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  retryDelay?: number;
}

// 에러 타입
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// 로딩 상태 타입
export interface LoadingState {
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
}

// 에러 상태 타입
export interface ErrorState {
  error: string | null;
  isError: boolean;
}

// API 상태 통합 타입
export interface ApiState extends LoadingState, ErrorState {
  isSuccess: boolean;
  isIdle: boolean;
}
