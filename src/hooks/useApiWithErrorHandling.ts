import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useError } from '@/contexts/ErrorContext';
import { AppError, transformToAppError, logError } from '@/lib/errorHandler';

// 에러 처리가 통합된 API fetch 함수
export const apiFetchWithErrorHandling = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // 네트워크 에러나 기타 에러를 AppError로 변환
    const appError = transformToAppError(error);
    logError(appError, `API fetch to ${url}`);
    throw appError;
  }
};

// 에러 처리가 통합된 Query 훅
export const useApiQueryWithErrorHandling = <T>(
  queryKey: (string | number)[],
  url: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) => {
  const { handleError } = useError();

  return useQuery<T>({
    queryKey,
    queryFn: () => apiFetchWithErrorHandling<T>(url),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

// 에러 처리가 통합된 Mutation 훅
export const useApiMutationWithErrorHandling = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    invalidateQueries?: (string | number)[][];
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: AppError, variables: TVariables) => void;
  }
) => {
  const queryClient = useQueryClient();
  const { handleError } = useError();

  return useMutation<TData, AppError, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      // 쿼리 무효화
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // 성공 콜백
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      handleError(error, `Mutation with variables: ${JSON.stringify(variables)}`);
      options?.onError?.(error, variables);
    },
  });
};

// CRUD 작업을 위한 에러 처리 통합 훅들
export const useCreateMutationWithErrorHandling = <TData, TVariables>(
  url: string,
  invalidateQueries: (string | number)[][],
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: AppError, variables: TVariables) => void;
  }
) => {
  return useApiMutationWithErrorHandling<TData, TVariables>(
    (variables) => apiFetchWithErrorHandling<TData>(url, {
      method: 'POST',
      body: JSON.stringify(variables),
    }),
    {
      invalidateQueries,
      ...options,
    }
  );
};

export const useUpdateMutationWithErrorHandling = <TData, TVariables>(
  url: string | ((variables: TVariables) => string),
  invalidateQueries: (string | number)[][],
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: AppError, variables: TVariables) => void;
  }
) => {
  return useApiMutationWithErrorHandling<TData, TVariables>(
    (variables) => {
      const endpoint = typeof url === 'function' ? url(variables) : url;
      return apiFetchWithErrorHandling<TData>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(variables),
      });
    },
    {
      invalidateQueries,
      ...options,
    }
  );
};

export const useDeleteMutationWithErrorHandling = <TData, TVariables>(
  url: string | ((variables: TVariables) => string),
  invalidateQueries: (string | number)[][],
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: AppError, variables: TVariables) => void;
  }
) => {
  return useApiMutationWithErrorHandling<TData, TVariables>(
    (variables) => {
      const endpoint = typeof url === 'function' ? url(variables) : url;
      return apiFetchWithErrorHandling<TData>(endpoint, {
        method: 'DELETE',
      });
    },
    {
      invalidateQueries,
      ...options,
    }
  );
};
