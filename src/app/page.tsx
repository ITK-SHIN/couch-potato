"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const [homeVideo, setHomeVideo] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [latestVideos, setLatestVideos] = useState<any[]>([]);

  // 홈 영상 데이터 로드
  const loadHomeVideo = async () => {
    try {
      const response = await fetch("/api/home-video");
      if (response.ok) {
        const result = await response.json();
        setHomeVideo(result.video);
      }
    } catch (error) {
      console.error("홈 영상 로딩 오류:", error);
    }
  };

  // 홈 영상 변경 핸들러
  const handleHomeVideoChange = (video: any) => {
    setHomeVideo(video);
  };

  // 최신 포트폴리오 영상 로드
  const loadLatestVideos = async () => {
    try {
      const response = await fetch("/api/portfolio-videos");
      if (response.ok) {
        const result = await response.json();
        // 최신 3개 영상만 가져오기
        const latest = result.videos?.slice(0, 3) || [];
        setLatestVideos(latest);
      }
    } catch (error) {
      console.error("최신 영상 로딩 오류:", error);
      // 기본 영상 데이터 설정
      setLatestVideos([
        {
          id: "1",
          videoId: "1CUt84BK_p0",
          title: "패션을 파는 것은 어떨까요?",
          description: "패션 브랜드의 마케팅을 위한 창의적인 광고 영상입니다.",
          thumbnail: "https://img.youtube.com/vi/1CUt84BK_p0/maxresdefault.jpg",
          category: "commercial",
          client: "패션 브랜드",
          year: "2024",
          stats: { views: "150K+", likes: "2.5K+" },
          tags: [
            { id: "tag1", text: "#패션", color: "potato-orange" },
            { id: "tag2", text: "#브랜드영상", color: "clapperboard-gray" },
          ],
        },
        {
          id: "2",
          videoId: "dQw4w9WgXcQ",
          title: "웨딩 영상 제작",
          description: "소중한 순간을 아름답게 담은 웨딩 영상입니다.",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          category: "wedding",
          client: "웨딩 플래너",
          year: "2024",
          stats: { views: "89K+", likes: "1.8K+" },
          tags: [
            { id: "tag1", text: "#웨딩", color: "potato-orange-light" },
            { id: "tag2", text: "#감동", color: "clapperboard-gray" },
          ],
        },
        {
          id: "3",
          videoId: "jNQXAC9IVRw",
          title: "기업 홍보 영상",
          description: "기업의 가치와 비전을 담은 홍보 영상입니다.",
          thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
          category: "corporate",
          client: "기업체",
          year: "2024",
          stats: { views: "120K+", likes: "2.1K+" },
          tags: [
            { id: "tag1", text: "#기업홍보", color: "potato-orange" },
            { id: "tag2", text: "#브랜딩", color: "clapperboard-gray" },
          ],
        },
      ]);
    }
  };

  // 영상 모달 열기
  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  // 영상 모달 닫기
  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  // 홈 영상 로드
  useEffect(() => {
    loadHomeVideo();
    loadLatestVideos();
  }, []);

  return (
    <>
      <HeroSection
        homeVideo={homeVideo}
        onVideoChange={handleHomeVideoChange}
      />

      <ServicesSection />

      <PortfolioSection
        latestVideos={latestVideos}
        onVideoClick={openVideoModal}
      />

      <AboutSection />

      <TestimonialsSection />

      <CTASection />

      <VideoModal
        isOpen={isModalOpen}
        videoId={selectedVideo}
        onClose={closeVideoModal}
      />
    </>
  );
}
