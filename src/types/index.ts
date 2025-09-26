/**
 * 모든 타입 정의를 중앙에서 export
 */

// API 관련 타입
export * from './api';

// 콘텐츠 관련 타입
export * from './content';

// 컴포넌트 관련 타입
export * from './components';

// 글로벌 타입 (기존 global.d.ts 내용)
export interface Window {
  YT: any;
  onYouTubeIframeAPIReady: (() => void) | null;
  volumeChangeTimer: number;
}

// 환경 설정 타입
export interface AppConfig {
  api: {
    baseUrl: string;
    strapiUrl: string;
    youtubeApiUrl: string;
  };
  database: {
    mongodbUri: string;
    strapiDatabase: string;
  };
  apis: {
    youtube: {
      apiKey: string;
      channelId: string;
    };
    strapi: {
      token: string;
    };
  };
  app: {
    name: string;
    description: string;
    version: string;
    environment: string;
  };
  storage: {
    localStorageKey: string;
  };
  admin: {
    password: string;
    sessionTimeout: number;
  };
  dev: {
    enableDevtools: boolean;
    enableLogging: boolean;
  };
}
