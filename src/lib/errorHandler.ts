/**
 * 에러 처리 유틸리티 함수들
 */

export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
  timestamp: string;
  stack?: string;
}

export class CustomError extends Error {
  public type: ErrorType;
  public code?: string;
  public statusCode?: number;
  public details?: any;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN_ERROR,
    code?: string,
    statusCode?: number,
    details?: any
  ) {
    super(message);
    this.name = 'CustomError';
    this.type = type;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// HTTP 상태 코드에 따른 에러 타입 결정
export const getErrorTypeFromStatusCode = (statusCode: number): ErrorType => {
  switch (true) {
    case statusCode >= 400 && statusCode < 500:
      if (statusCode === 401) return ErrorType.AUTHENTICATION_ERROR;
      if (statusCode === 403) return ErrorType.AUTHORIZATION_ERROR;
      if (statusCode === 404) return ErrorType.NOT_FOUND_ERROR;
      if (statusCode === 422) return ErrorType.VALIDATION_ERROR;
      return ErrorType.API_ERROR;
    case statusCode >= 500:
      return ErrorType.SERVER_ERROR;
    default:
      return ErrorType.UNKNOWN_ERROR;
  }
};

// 네트워크 에러 감지
export const isNetworkError = (error: any): boolean => {
  return (
    error.name === 'TypeError' &&
    (error.message.includes('fetch') || error.message.includes('network'))
  );
};

// API 에러를 AppError로 변환
export const transformToAppError = (error: any): AppError => {
  const timestamp = new Date().toISOString();
  
  // 이미 AppError인 경우
  if (error instanceof CustomError) {
    return {
      type: error.type,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
      timestamp,
      stack: error.stack,
    };
  }

  // 네트워크 에러
  if (isNetworkError(error)) {
    return {
      type: ErrorType.NETWORK_ERROR,
      message: '네트워크 연결을 확인해주세요.',
      timestamp,
      stack: error.stack,
    };
  }

  // HTTP 응답 에러
  if (error.response) {
    const statusCode = error.response.status;
    return {
      type: getErrorTypeFromStatusCode(statusCode),
      message: error.response.data?.message || error.message,
      code: error.response.data?.code,
      statusCode,
      details: error.response.data?.details,
      timestamp,
      stack: error.stack,
    };
  }

  // 일반 에러
  return {
    type: ErrorType.UNKNOWN_ERROR,
    message: error.message || '알 수 없는 오류가 발생했습니다.',
    timestamp,
    stack: error.stack,
  };
};

// 사용자 친화적 에러 메시지 생성
export const getUserFriendlyMessage = (error: AppError): string => {
  switch (error.type) {
    case ErrorType.NETWORK_ERROR:
      return '인터넷 연결을 확인해주세요.';
    case ErrorType.AUTHENTICATION_ERROR:
      return '로그인이 필요합니다.';
    case ErrorType.AUTHORIZATION_ERROR:
      return '접근 권한이 없습니다.';
    case ErrorType.NOT_FOUND_ERROR:
      return '요청한 데이터를 찾을 수 없습니다.';
    case ErrorType.VALIDATION_ERROR:
      return '입력한 정보를 확인해주세요.';
    case ErrorType.SERVER_ERROR:
      return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    case ErrorType.API_ERROR:
      return error.message || '요청 처리 중 오류가 발생했습니다.';
    default:
      return error.message || '알 수 없는 오류가 발생했습니다.';
  }
};

// 에러 로깅
export const logError = (error: AppError, context?: string) => {
  const logData = {
    type: error.type,
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    context,
    timestamp: error.timestamp,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  // 개발 환경에서는 콘솔에 출력
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', logData);
  }

  // 프로덕션 환경에서는 에러 모니터링 서비스에 전송
  if (process.env.NODE_ENV === 'production') {
    // 실제 서비스에서는 Sentry, LogRocket 등을 사용
    console.log('Production error logging:', logData);
  }
};
