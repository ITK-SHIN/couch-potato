"use client";

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import UniversalContent from "@/components/ui/UniversalContent";
import { useAdmin } from "@/contexts/AdminContext";
import { SmallYellowBtn } from "@/components/ui/Button";
import { ThumbnailImage } from "@/components/optimized/OptimizedImage";

import { PortfolioVideo, VideoTag } from "@/types/video";

interface PortfolioSectionProps {
  latestVideos: PortfolioVideo[];
  onVideoClick: (videoId: string) => void;
}

const PortfolioSection = React.memo(function PortfolioSection({
  latestVideos,
  onVideoClick,
}: PortfolioSectionProps) {
  const { isAdmin } = useAdmin();

  // 비디오 클릭 핸들러 메모이제이션
  const handleVideoClick = useCallback(
    (videoId: string) => {
      onVideoClick(videoId);
    },
    [onVideoClick]
  );

  // 비디오 목록 메모이제이션
  const memoizedVideos = useMemo(() => latestVideos, [latestVideos]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="home"
              fields={{
                portfolio_title: {
                  value: "작품 갤러리",
                  className:
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6",
                },
              }}
            />
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="home"
              fields={{
                portfolio_subtitle: {
                  value: "COUCH POTATO의 실제 작품들을 감상해보세요",
                  className:
                    "text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12",
                },
              }}
            />
          </p>

          {/* 최신 작품 3개 표시 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {latestVideos.map((video, index) => (
              <div
                key={video.id}
                className="group relative bg-clapperboard-gray-light rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onVideoClick(video.videoId)}
                      className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-red-700"
                    >
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                      {video.category === "commercial"
                        ? "광고"
                        : video.category === "wedding"
                        ? "웨딩"
                        : video.category === "corporate"
                        ? "기업"
                        : "기타"}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-2 text-white text-xs bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="flex items-center gap-1">
                        👁 {video.stats?.views || "0"}
                      </span>
                      <span className="flex items-center gap-1">
                        ❤️ {video.stats?.likes || "0"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="space-y-2 sm:space-y-3">
                    {/* Client & Year */}
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="flex items-center gap-1">
                        🏢 {video.client || "클라이언트"}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="flex items-center gap-1">
                        📅 {video.year || "2024"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight line-clamp-2">
                      {video.title || "영상 제목"}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                      {video.description || "영상 설명"}
                    </p>

                    {/* Tags */}
                    {video.tags && video.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {video.tags.slice(0, 2).map((tag: VideoTag) => (
                          <span
                            key={tag.id}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              tag.color === "potato-orange"
                                ? "bg-potato-orange text-white"
                                : tag.color === "clapperboard-gray"
                                ? "bg-clapperboard-gray text-white"
                                : tag.color === "potato-orange-light"
                                ? "bg-potato-orange-light text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <SmallYellowBtn href="/portfolio" text="🎬 작품 갤러리 보기" />
        </div>
      </div>
    </section>
  );
});

export default PortfolioSection;
