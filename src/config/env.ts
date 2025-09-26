/**
 * 환경 변수 설정
 * 모든 하드코딩된 URL과 설정값들을 중앙화
 */

export const config = {
  // API URLs
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    youtubeApiUrl: process.env.NEXT_PUBLIC_YOUTUBE_API_URL || 'https://www.googleapis.com/youtube/v3',
  },
  
  // Database
  database: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/couch-potato',
    strapiDatabase: process.env.STRAPI_DATABASE_URL || 'postgresql://localhost:5432/strapi',
  },
  
  // External APIs
  apis: {
    youtube: {
      apiKey: process.env.YOUTUBE_API_KEY || '',
      channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    },
    strapi: {
      token: process.env.STRAPI_API_TOKEN || '',
    },
  },
  
  // App Settings
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'COUCH POTATO',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || '브랜드 스토리를 영상으로 완성하는 크리에이티브 스튜디오',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
  
  // Storage
  storage: {
    localStorageKey: process.env.NEXT_PUBLIC_STORAGE_KEY || 'homePageData',
  },
  
  // Admin Settings
  admin: {
    password: process.env.ADMIN_PASSWORD || 'admin123',
    sessionTimeout: parseInt(process.env.ADMIN_SESSION_TIMEOUT || '3600000'), // 1시간
  },
  
  // Development
  dev: {
    enableDevtools: process.env.NODE_ENV === 'development',
    enableLogging: process.env.NODE_ENV === 'development',
  },
} as const;

// 타입 안전성을 위한 환경 변수 검증
export const validateConfig = () => {
  const required = [
    'MONGODB_URI',
    'YOUTUBE_API_KEY',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`⚠️  다음 환경 변수들이 설정되지 않았습니다: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
};

// 개발 환경에서만 검증 실행
if (process.env.NODE_ENV === 'development') {
  validateConfig();
}
