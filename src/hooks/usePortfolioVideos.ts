import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Video, PortfolioVideosResponse } from '@/types';

// 포트폴리오 비디오 목록 가져오기
export const usePortfolioVideos = () => {
  return useQuery<PortfolioVideosResponse>({
    queryKey: ["portfolio-videos"],
    queryFn: async () => {
      const response = await fetch("/api/portfolio-videos");
      if (!response.ok) {
        throw new Error("포트폴리오 비디오를 불러오는데 실패했습니다.");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시
  });
};

// 비디오 추가
export const useAddVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoData: Omit<Video, "id" | "_id">) => {
      const response = await fetch("/api/portfolio-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        throw new Error("비디오 추가에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-videos"] });
    },
  });
};

// 비디오 업데이트
export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      _id,
      ...videoData
    }: Partial<Video> & { _id: string }) => {
      const response = await fetch(`/api/portfolio-videos/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `비디오 업데이트에 실패했습니다. (${response.status}: ${
            errorData.error || response.statusText
          })`
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-videos"] });
    },
  });
};

// 비디오 삭제
export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/portfolio-videos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `비디오 삭제에 실패했습니다. (${response.status}: ${
            errorData.error || response.statusText
          })`
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-videos"] });
    },
  });
};

// 비디오 순서 업데이트
export const useUpdateVideoOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videos: Video[]) => {
      const response = await fetch("/api/portfolio-videos/order", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videos }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `비디오 순서 업데이트에 실패했습니다. (${response.status}: ${
            errorData.error || response.statusText
          })`
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-videos"] });
    },
  });
};
