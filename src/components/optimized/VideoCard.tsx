"use client";

import React, { memo, useCallback, useMemo } from 'react';
import { ThumbnailImage } from './OptimizedImage';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: {
    _id: string;
    videoId: string;
    title: string;
    thumbnail: string;
    category: string;
    client: string;
    year: string;
    stats: {
      views: string;
      likes: string;
    };
  };
  onVideoClick: (videoId: string) => void;
  isAdmin?: boolean;
  className?: string;
}

const VideoCard = memo(function VideoCard({
  video,
  onVideoClick,
  isAdmin = false,
  className,
}: VideoCardProps) {
  // 비디오 클릭 핸들러 메모이제이션
  const handleClick = useCallback(() => {
    onVideoClick(video.videoId);
  }, [onVideoClick, video.videoId]);

  // 썸네일 최적화 설정
  const thumbnailProps = useMemo(() => ({
    src: video.thumbnail,
    alt: video.title,
    width: 400,
    height: 225,
    className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
  }), [video.thumbnail, video.title]);

  // 통계 정보 포맷팅
  const formattedStats = useMemo(() => ({
    views: video.stats.views,
    likes: video.stats.likes,
  }), [video.stats.views, video.stats.likes]);

  return (
    <div
      className={cn(
        "group bg-clapperboard-gray rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-clapperboard-gray-light cursor-pointer",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${video.title} 비디오 보기`}
    >
      {/* 썸네일 */}
      <div className="relative aspect-video overflow-hidden">
        <ThumbnailImage {...thumbnailProps} />
        
        {/* 재생 버튼 오버레이 */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* 카테고리 태그 */}
        <div className="absolute top-3 left-3">
          <span className="bg-potato-orange text-white text-xs font-bold px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>

        {/* 관리자 모드 표시 */}
        {isAdmin && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              관리자
            </span>
          </div>
        )}
      </div>

      {/* 비디오 정보 */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-potato-orange transition-colors duration-300">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <span className="font-medium">{video.client}</span>
          <span className="text-potato-orange font-bold">{video.year}</span>
        </div>

        {/* 통계 정보 */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span>{formattedStats.views}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{formattedStats.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoCard;
