import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { ErrorState } from './types';

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  });

  const handleError = useCallback((error: Error | string) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    
    setErrorState({
      error: errorMessage,
      isError: true,
    });

    // 토스트 알림 표시
    toast.error(errorMessage, {
      duration: 4000,
      position: 'top-right',
    });

    console.error('API Error:', errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    });
  }, []);

  return {
    ...errorState,
    handleError,
    clearError,
  };
};

// 로딩 상태 관리
export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

// API 상태 통합 관리
export const useApiState = () => {
  const errorHandler = useErrorHandler();
  const loadingState = useLoadingState();

  return {
    ...errorHandler,
    ...loadingState,
  };
};
