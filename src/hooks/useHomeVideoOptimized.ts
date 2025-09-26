import { useApiQuery, useUpdateMutation } from './useApi';
import { HomeVideo, HomeVideoResponse } from '@/types';

// 홈 비디오 데이터 가져오기
export const useHomeVideo = () => {
  return useApiQuery<HomeVideoResponse>(
    ['home-video'],
    '/api/home-video',
    {
      staleTime: 5 * 60 * 1000, // 5분간 fresh
      gcTime: 10 * 60 * 1000, // 10분간 캐시
    }
  );
};

// 홈 비디오 업데이트
export const useUpdateHomeVideo = () => {
  return useUpdateMutation<HomeVideo, Partial<HomeVideo>>(
    '/api/home-video',
    [['home-video']]
  );
};
