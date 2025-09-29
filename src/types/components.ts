/**
 * 컴포넌트 관련 타입 정의
 */

import {
  Video,
  Category,
  HomeVideo,
  HomePageData,
  UniversalContentData,
} from "./content";

// 관리자 컨텍스트
export interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

// 인라인 에디터
export interface InlineEditorProps {
  value: string;
  field: string;
  className?: string;
  isAdmin?: boolean;
  onSave?: (newValue: string) => void;
  saveMethod?: "api" | "localStorage" | "strapi";
  pageName?: string;
  endpoint?: string;
  id?: number;
  storageKey?: string;
  strapiEndpoint?: string;
  strapiId?: number;
}

// 유니버설 콘텐츠
export interface UniversalContentProps {
  isAdmin: boolean;
  pageName: string;
  fields: {
    [key: string]: {
      value: string;
      className?: string;
    };
  };
}

// 홈페이지 콘텐츠
export interface HomePageContentProps {
  isAdmin: boolean;
}

// 비디오 매니저
export interface VideoManagerProps {
  isAdmin: boolean;
}

// 카테고리 매니저
export interface CategoryManagerProps {
  isAdmin: boolean;
}

// 홈 비디오 매니저
export interface HomeVideoManagerProps {
  isAdmin: boolean;
}

// Strapi 콘텐츠
export interface StrapiContentProps {
  children: (data: unknown) => React.ReactNode;
  render: (data: unknown) => React.ReactNode;
  endpoint: string;
}

// API 응답 타입들
export interface CategoriesResponse {
  categories: Category[];
}

export interface PortfolioVideosResponse {
  videos: Video[];
}

export interface HomeVideoResponse {
  video: HomeVideo | null;
}

export interface UniversalContentResponse {
  data: UniversalContentData;
}
