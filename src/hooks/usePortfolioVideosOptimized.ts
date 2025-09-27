import { useApiQuery, useCreateMutation, useUpdateMutation, useDeleteMutation } from './useApi';
import { Video, PortfolioVideosResponse } from '@/types';

// 포트폴리오 비디오 목록 가져오기
export const usePortfolioVideos = () => {
  return useApiQuery<PortfolioVideosResponse>(
    ['portfolio-videos'],
    '/api/portfolio-videos',
    {
      staleTime: 3 * 60 * 1000, // 3분간 fresh (비디오는 더 자주 업데이트됨)
      gcTime: 15 * 60 * 1000, // 15분간 캐시
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 새로고침 비활성화
    }
  );
};

// 비디오 추가
export const useAddVideo = () => {
  return useCreateMutation<Video, Omit<Video, 'id' | '_id'>>(
    '/api/portfolio-videos',
    [['portfolio-videos']]
  );
};

// 비디오 업데이트
export const useUpdateVideo = () => {
  return useUpdateMutation<Video, Partial<Video> & { _id: string }>(
    (variables) => `/api/portfolio-videos/${variables._id}`,
    [['portfolio-videos']]
  );
};

// 비디오 삭제
export const useDeleteVideo = () => {
  return useDeleteMutation<Video, string>(
    (id) => `/api/portfolio-videos/${id}`,
    [['portfolio-videos']]
  );
};

// 비디오 순서 업데이트
export const useUpdateVideoOrder = () => {
  return useUpdateMutation<{ success: boolean }, { videos: Video[] }>(
    '/api/portfolio-videos/order',
    [['portfolio-videos']]
  );
};
