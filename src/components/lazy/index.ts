/**
 * 지연 로딩 컴포넌트들
 * 페이지별 코드 스플리팅을 위한 동적 import
 */

import { lazy } from 'react';

// 페이지 컴포넌트들
export const LazyAboutPage = lazy(() => import('@/app/about/page'));
export const LazyContactPage = lazy(() => import('@/app/contact/page'));
export const LazyLocationPage = lazy(() => import('@/app/location/page'));
export const LazyPortfolioPage = lazy(() => import('@/app/portfolio/page'));
export const LazyProcessPage = lazy(() => import('@/app/process/page'));

// 섹션 컴포넌트들
export const LazyAboutSection = lazy(() => import('@/components/sections/AboutSection'));
export const LazyCTASection = lazy(() => import('@/components/sections/CTASection'));
export const LazyHeroSection = lazy(() => import('@/components/sections/HeroSection'));
export const LazyPortfolioSection = lazy(() => import('@/components/sections/PortfolioSection'));
export const LazyServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
export const LazyTestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));

// 관리자 컴포넌트들
export const LazyAdminLogin = lazy(() => import('@/components/admin/AdminLogin'));
export const LazyCategoryManager = lazy(() => import('@/components/admin/CategoryManager'));
export const LazyHomeVideoManager = lazy(() => import('@/components/admin/HomeVideoManager'));
export const LazyVideoManager = lazy(() => import('@/components/admin/VideoManager'));

// UI 컴포넌트들
export const LazyVideoModal = lazy(() => import('@/components/ui/VideoModal'));
export const LazyHomePageContent = lazy(() => import('@/components/ui/HomePageContent'));
export const LazyUniversalContent = lazy(() => import('@/components/ui/UniversalContent'));

// 최적화된 컴포넌트들
export const LazyOptimizedImage = lazy(() => import('@/components/optimized/OptimizedImage'));
export const LazyVideoCard = lazy(() => import('@/components/optimized/VideoCard'));

// 에러 바운더리
export const LazyErrorBoundary = lazy(() => import('@/components/ErrorBoundary'));
