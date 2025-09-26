import { useApiQuery, useCreateMutation, useUpdateMutation, useDeleteMutation } from './useApi';
import { Video, PortfolioVideosResponse } from '@/types';

// 포트폴리오 비디오 목록 가져오기
export const usePortfolioVideos = () => {
  return useApiQuery<PortfolioVideosResponse>(
    ['portfolio-videos'],
    '/api/portfolio-videos',
    {
      staleTime: 5 * 60 * 1000, // 5분간 fresh
      gcTime: 10 * 60 * 1000, // 10분간 캐시
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
