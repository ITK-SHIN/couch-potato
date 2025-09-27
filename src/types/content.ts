/**
 * 콘텐츠 관련 타입 정의
 */

// 비디오 관련 타입
export interface Video {
  _id: string;
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  client: string;
  year: string;
  videoUrl: string;
  order: number;
  stats: {
    views: string;
    likes: string;
  };
  tags: Array<{
    id: string;
    text: string;
    color: string;
  }>;
}

// 홈 비디오
export interface HomeVideo {
  _id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  isActive: boolean;
  order: number;
  lastUpdated: string;
  // 추가 정보 (선택적)
  client?: string;
  year?: string;
  stats?: {
    views: string;
    likes: string;
  };
  tags?: Array<{
    id: string;
    text: string;
    color: string;
  }>;
}

// 카테고리
export interface Category {
  id: string;
  name: string;
  icon: string;
  order: number;
}

// 홈페이지 데이터
export interface HomePageData {
  tagline1: string;
  tagline2: string;
  tagline3: string;
  lastUpdated?: string;
}

// 유니버설 콘텐츠
export interface UniversalContentData {
  [key: string]: string;
}

// YouTube API 응답
export interface YouTubeVideoResponse {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
    statistics: {
      viewCount: string;
      likeCount: string;
    };
  }>;
}
