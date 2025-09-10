import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface HomeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  tags: Array<{
    id: string;
    text: string;
    color: string;
  }>;
  stats: {
    views: string;
    likes: string;
  };
  client: string;
  year: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  lastUpdated: string;
}

interface HomeVideoResponse {
  video: HomeVideo | null;
}

// 홈 비디오 데이터 가져오기
export const useHomeVideo = () => {
  return useQuery<HomeVideoResponse>({
    queryKey: ["home-video"],
    queryFn: async () => {
      const response = await fetch("/api/home-video");
      if (!response.ok) {
        throw new Error("홈 비디오를 불러오는데 실패했습니다.");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시
  });
};

// 홈 비디오 업데이트
export const useUpdateHomeVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoData: Partial<HomeVideo>) => {
      const response = await fetch("/api/home-video", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        throw new Error("홈 비디오 업데이트에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: () => {
      // 홈 비디오 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ["home-video"] });
    },
  });
};
