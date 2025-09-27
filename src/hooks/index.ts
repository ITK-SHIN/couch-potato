/**
 * 최적화된 커스텀 훅들을 중앙에서 export
 */

// 공통 API 훅들
export * from "./useApi";
export * from "./useErrorHandler";
export * from "./types";

// 최적화된 훅들
export * from "./useCategoriesOptimized";
export * from "./usePortfolioVideosOptimized";
export * from "./useHomeVideoOptimized";
export * from "./useUniversalContentOptimized";

// 기존 훅들 (하위 호환성을 위해 유지)
export {
  useCategories,
  useAddCategory as useAddCategoryLegacy,
  useUpdateCategory,
  useDeleteCategory,
} from "./useCategories";
export {
  usePortfolioVideos,
  useAddVideo as useAddVideoLegacy,
  useUpdateVideo,
  useDeleteVideo,
} from "./usePortfolioVideos";
export {
  useHomeVideo as useHomeVideoLegacy,
  useUpdateHomeVideo,
} from "./useHomeVideo";
// useUniversalContent는 useUniversalContentOptimized에서 export됨
