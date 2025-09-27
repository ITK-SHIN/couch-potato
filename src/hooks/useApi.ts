import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse, ApiError } from '@/types';

// 공통 API 에러 처리
export const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `API 요청 실패 (${response.status})`;
  
  try {
    const errorData: ApiError = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch {
    // JSON 파싱 실패 시 기본 메시지 사용
  }
  
  throw new Error(errorMessage);
};

// 공통 fetch 함수
export const apiFetch = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

// 공통 GET 훅
export const useApiQuery = <T>(
  queryKey: (string | number)[],
  url: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T>({
    queryKey,
    queryFn: () => apiFetch<T>(url),
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시
    ...options,
  });
};

// 공통 POST/PUT/DELETE 훅
export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    invalidateQueries?: (string | number)[][];
    onSuccess?: (data: TData, variables: TVariables) => void;
  } & Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn' | 'onSuccess'>
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      // 쿼리 무효화
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // 성공 콜백
      options?.onSuccess?.(data, variables);
    },
  });
};

// CRUD 작업을 위한 공통 훅들
export const useCreateMutation = <TData, TVariables>(
  url: string,
  invalidateQueries: (string | number)[][],
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
  } & Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn' | 'onSuccess'>
) => {
  return useApiMutation<TData, TVariables>(
    (variables) => apiFetch<TData>(url, {
      method: 'POST',
      body: JSON.stringify(variables),
    }),
    {
      invalidateQueries,
      ...options,
    }
  );
};

export const useUpdateMutation = <TData, TVariables>(
  url: string | ((variables: TVariables) => string),
  invalidateQueries: (string | number)[][],
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
  } & Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn' | 'onSuccess'>
) => {
  return useApiMutation<TData, TVariables>(
    (variables) => {
      const endpoint = typeof url === 'function' ? url(variables) : url;
      return apiFetch<TData>(endpoint, {
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

export const useDeleteMutation = <TData, TVariables>(
  url: string | ((variables: TVariables) => string),
  invalidateQueries: (string | number)[][],
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
  } & Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn' | 'onSuccess'>
) => {
  return useApiMutation<TData, TVariables>(
    (variables) => {
      const endpoint = typeof url === 'function' ? url(variables) : url;
      return apiFetch<TData>(endpoint, {
        method: 'DELETE',
      });
    },
    {
      invalidateQueries,
      ...options,
    }
  );
};
