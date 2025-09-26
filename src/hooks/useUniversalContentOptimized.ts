import { useApiQuery, useUpdateMutation } from './useApi';
import { UniversalContentData, UniversalContentResponse } from '@/types';

// 유니버설 콘텐츠 데이터 가져오기
export const useUniversalContent = (pageName: string) => {
  return useApiQuery<UniversalContentResponse>(
    ['universal-content', pageName],
    `/api/update-content?page=${pageName}`,
    {
      staleTime: 5 * 60 * 1000, // 5분간 fresh
      gcTime: 10 * 60 * 1000, // 10분간 캐시
    }
  );
};

// 유니버설 콘텐츠 업데이트
export const useUpdateUniversalContent = (pageName: string) => {
  return useUpdateMutation<
    UniversalContentData,
    { field: string; value: string }
  >(
    '/api/update-content',
    [['universal-content', pageName]],
    {
      onSuccess: (data, variables) => {
        // 추가적인 성공 처리 로직이 있다면 여기에 추가
        console.log(`콘텐츠 업데이트 성공: ${variables.field} = ${variables.value}`);
      },
    }
  );
};
