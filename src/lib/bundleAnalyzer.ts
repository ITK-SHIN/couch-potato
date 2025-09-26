/**
 * 번들 크기 분석 및 최적화 유틸리티
 */

import React from 'react';

// 동적 import를 위한 유틸리티 함수들
export const dynamicImport = <T>(importFn: () => Promise<T>) => {
  return importFn();
};

// 컴포넌트 지연 로딩
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return React.lazy(importFn);
};

// 페이지별 코드 스플리팅
export const createPageComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return React.lazy(importFn);
};

// 번들 크기 측정
export const measureBundleSize = (name: string, importFn: () => Promise<any>) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    return importFn().then((module) => {
      const end = performance.now();
      console.log(`${name} loaded in ${end - start}ms`);
      return module;
    });
  }
  return importFn();
};

// 트리 쉐이킹을 위한 유틸리티
export const createTreeShakableModule = <T>(module: T) => {
  return module;
};

// 불필요한 의존성 제거를 위한 체크리스트
export const bundleOptimizationChecklist = {
  // React 관련
  react: {
    description: 'React와 React-DOM 최적화',
    checks: [
      'React.memo 사용으로 불필요한 리렌더링 방지',
      'useMemo, useCallback 적절한 사용',
      'React.lazy로 코드 스플리팅 적용',
    ],
  },
  
  // 이미지 최적화
  images: {
    description: '이미지 최적화',
    checks: [
      'Next.js Image 컴포넌트 사용',
      '적절한 이미지 크기 및 품질 설정',
      'WebP 포맷 사용',
      '지연 로딩 적용',
    ],
  },
  
  // 라이브러리 최적화
  libraries: {
    description: '외부 라이브러리 최적화',
    checks: [
      '불필요한 라이브러리 제거',
      '트리 쉐이킹 가능한 라이브러리 사용',
      '번들 크기 큰 라이브러리 동적 import',
      '폴리필 최적화',
    ],
  },
  
  // 코드 스플리팅
  codeSplitting: {
    description: '코드 스플리팅 적용',
    checks: [
      '페이지별 동적 import',
      '컴포넌트별 지연 로딩',
      '라우트별 청크 분리',
      '공통 의존성 추출',
    ],
  },
};

// 번들 분석 결과
export interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: Array<{
    name: string;
    size: number;
    gzippedSize: number;
  }>;
  recommendations: string[];
}

// 번들 최적화 권장사항
export const getBundleOptimizationRecommendations = (): string[] => {
  return [
    'React.lazy()를 사용하여 페이지별 코드 스플리팅 적용',
    '불필요한 의존성 제거 및 트리 쉐이킹 확인',
    '이미지 최적화 및 WebP 포맷 사용',
    '폰트 최적화 및 preload 적용',
    'CSS-in-JS 라이브러리 최적화',
    '번들 분석 도구 사용하여 큰 청크 식별',
  ];
};
