import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UniversalContentData, UniversalContentResponse } from '@/types';

// 유니버설 콘텐츠 데이터 가져오기
export const useUniversalContent = (pageName: string) => {
  return useQuery<UniversalContentResponse>({
    queryKey: ['universal-content', pageName],
    queryFn: async () => {
      const response = await fetch(`/api/update-content?page=${pageName}`);
      if (!response.ok) {
        throw new Error(`${pageName} 페이지 콘텐츠를 불러오는데 실패했습니다.`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시
  });
};

// 유니버설 콘텐츠 업데이트
export const useUpdateUniversalContent = (pageName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ field, value }: { field: string; value: string }) => {
      const response = await fetch('/api/update-content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: pageName,
          field,
          value,
        }),
      });

      if (!response.ok) {
        throw new Error('콘텐츠 업데이트에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      // 해당 페이지의 콘텐츠 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['universal-content', pageName] });
    },
  });
};
