"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  style,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  // 기본 블러 데이터 URL (1x1 투명 픽셀)
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gray-200 flex items-center justify-center',
          className
        )}
        style={style}
      >
        <span className="text-gray-400 text-sm">이미지를 불러올 수 없습니다</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        sizes={sizes}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

// 특정 용도별 최적화된 이미지 컴포넌트들
export const HeroImage = React.memo((props: Omit<OptimizedImageProps, 'priority' | 'quality'>) => (
  <OptimizedImage
    {...props}
    priority={true}
    quality={90}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
));

export const ThumbnailImage = React.memo((props: Omit<OptimizedImageProps, 'quality' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    quality={60}
    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
  />
));

export const AvatarImage = React.memo((props: Omit<OptimizedImageProps, 'quality' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    quality={70}
    sizes="(max-width: 768px) 80px, 120px"
  />
));

export const BackgroundImage = React.memo((props: Omit<OptimizedImageProps, 'fill' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    fill={true}
    quality={80}
    sizes="100vw"
    style={{ objectFit: 'cover', ...props.style }}
  />
));
