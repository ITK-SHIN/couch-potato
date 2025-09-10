import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 데이터가 5분간 fresh 상태로 유지
      staleTime: 5 * 60 * 1000,
      // 데이터가 10분간 캐시에 유지
      gcTime: 10 * 60 * 1000,
      // 실패 시 3번 재시도
      retry: (failureCount, error: any) => {
        // MongoDB 연결 에러인 경우 2번만 재시도 (너무 많은 재시도 방지)
        if (
          error?.code === "MongoServerSelectionError" ||
          error?.message?.includes("SSL routines") ||
          error?.message?.includes("tlsv1 alert internal error")
        ) {
          return failureCount < 2;
        }
        // 네트워크 에러인 경우 2번 재시도
        if (error?.code === "NETWORK_ERROR" || error?.status >= 500) {
          return failureCount < 2;
        }
        // 기타 에러는 재시도하지 않음
        return false;
      },
      // 재시도 간격 (지수 백오프)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // 백그라운드에서 자동으로 데이터 새로고침
      refetchOnWindowFocus: false,
      // 네트워크 재연결 시 자동 새로고침
      refetchOnReconnect: true,
    },
    mutations: {
      // 뮤테이션 실패 시 2번 재시도
      retry: (failureCount, error: any) => {
        if (
          error?.code === "MongoServerSelectionError" ||
          error?.message?.includes("SSL routines")
        ) {
          return failureCount < 2;
        }
        return false;
      },
    },
  },
});
