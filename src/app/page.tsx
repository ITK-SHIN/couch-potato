"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import StrapiContent from "@/components/StrapiContent";
import HomePageContent from "@/components/HomePageContent";
import HomeVideoManager from "@/components/HomeVideoManager";
import UniversalContent from "@/components/UniversalContent";
import { strapiApiClient } from "@/utils/strapi";
import { useAdmin } from "@/contexts/AdminContext";
import { BigBlackBtn, BigWhiteBtn, BigYellowBtn, SmallYellowBtn } from "./components/Button";

export default function Home() {
  const [homeVideo, setHomeVideo] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);
  const [iframeRef, setIframeRef] = useState<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(75);
  const [latestVideos, setLatestVideos] = useState<any[]>([]);
  const { isAdmin } = useAdmin();

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

  // YouTube Player API 로드 및 초기화
  useEffect(() => {
    // YouTube API 스크립트 로드
    if (typeof window !== "undefined" && !window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);

      // YouTube API 로드 완료 시 콜백
      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube API loaded!");
        setIsPlayerReady(true);
      };
    } else if (window.YT) {
      setIsPlayerReady(true);
    }
  }, []);

  // YouTube Player 생성
  useEffect(() => {
    if (
      isPlayerReady &&
      iframeRef &&
      window.YT &&
      window.YT.Player &&
      !player &&
      homeVideo?.videoId
    ) {
      try {
        console.log("Creating YouTube player...");
        const newPlayer = new window.YT.Player(iframeRef, {
          height: "100%",
          width: "100%",
          videoId: homeVideo.videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: homeVideo.videoId,
            controls: 1,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              console.log("YouTube Player ready!");
              // 초기 볼륨 설정
              event.target.setVolume(volume);
              // 초기에는 항상 음소거 상태
              event.target.mute();
              console.log(
                `Initial volume set to: ${volume}, muted: ${isMuted}`
              );
            },
            onStateChange: (event: any) => {
              console.log("Player state changed:", event.data);
            },
          },
        });
        setPlayer(newPlayer);
        console.log("YouTube player created successfully");
      } catch (error) {
        console.error("Error creating YouTube player:", error);
      }
    }
  }, [isPlayerReady, iframeRef, homeVideo?.videoId, volume, isMuted]);

  // 홈 영상 변경 시 플레이어 업데이트
  useEffect(() => {
    if (player && homeVideo?.videoId) {
      try {
        player.loadVideoById(homeVideo.videoId);
        console.log(`Video changed to: ${homeVideo.videoId}`);
      } catch (error) {
        console.error("Error changing video:", error);
      }
    }
  }, [player, homeVideo?.videoId]);

  return (
    <>
      {/* Hero Section - Enhanced Impact Layout */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <Image
            src="/imgs/1.jpg"
            alt="COUCH POTATO Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80"></div>
        </div>

        {/* Enhanced Content Container */}
        <div className="relative z-10 min-h-screen flex items-center mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content - Enhanced Typography */}
              <div className="text-center lg:text-left space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                    <UniversalContent
                      isAdmin={isAdmin}
                      pageName="home"
                      fields={{
                        tagline1: {
                          value: "브랜드의 이야기를",
                          className:
                            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight",
                        },
                      }}
                    />
                  </h1>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-potato-orange leading-tight">
                    <UniversalContent
                      isAdmin={isAdmin}
                      pageName="home"
                      fields={{
                        tagline2: {
                          value: "영상으로 완성하는",
                          className:
                            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-potato-orange leading-tight",
                        },
                      }}
                    />
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl text-potato-orange-light font-bold">
                    <UniversalContent
                      isAdmin={isAdmin}
                      pageName="home"
                      fields={{
                        tagline3: {
                          value: "크리에이티브 스튜디오",
                          className:
                            "text-lg sm:text-xl lg:text-2xl text-potato-orange-light font-bold",
                        },
                      }}
                    />
                  </p>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col gap-3 sm:gap-4 justify-center lg:justify-start">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                 <BigYellowBtn href="/contact" text="🚀 프로젝트 시작하기" />
                 <BigBlackBtn href="/portfolio" text="🎬 포트폴리오 보기" />

                  </div>

                  <Link href="#services" className="w-full">
                    <button className="group w-full px-5 py-3 sm:px-6 sm:py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-sm sm:text-base">📄</span>
                        <UniversalContent
                          isAdmin={isAdmin}
                          pageName="home"
                          fields={{
                            cta_button3: {
                              value: "서비스 보기 ↓",
                              className: "font-semibold text-sm sm:text-base",
                            },
                          }}
                        />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Content - Portfolio Style Video */}
              <div className="relative">
                {/* Portfolio Style Video Player */}
                {homeVideo && (
                  <div className="animate-slide-up-delayed mt-8 lg:mt-0">
                    <div className="relative group transform hover:scale-105 lg:scale-110 lg:hover:scale-115 transition-transform duration-500">
                      {/* Video Container with Glassmorphism Frame */}
                      <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
                        {/* Video Player */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-black/30">
                          <div
                            ref={setIframeRef}
                            className="w-full h-full rounded-2xl"
                            id="youtube-player"
                          ></div>

                          {/* Loading Indicator */}
                          {!isPlayerReady && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <div className="text-white text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-potato-orange mx-auto mb-2"></div>
                                <p className="text-sm">영상을 불러오는 중...</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Video Information Inside Glass Frame */}
                        <div className="mt-6">
                          {/* Tags */}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-potato-orange/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                              🏆 대표작
                            </span>
                            <span className="px-3 py-1 bg-clapperboard-gray/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                              👗{" "}
                              {homeVideo.category === "commercial"
                                ? "광고"
                                : homeVideo.category === "wedding"
                                ? "웨딩"
                                : "기타"}
                            </span>
                            <span className="px-3 py-1 bg-potato-orange-light/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                              ▶️ 자동재생
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-white text-2xl font-black mb-3 drop-shadow-lg leading-tight">
                            {homeVideo.title || "영상 제목"}
                          </h3>

                          {/* Description */}
                          <p className="text-white/90 text-base leading-relaxed mb-4">
                            {homeVideo.description || "영상 설명"}
                          </p>

                          {/* Stats and Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-white/80">
                              <span className="flex items-center gap-1">
                                📅 <span>{homeVideo.year || "2024"}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                🏢{" "}
                                <span>{homeVideo.client || "클라이언트"}</span>
                              </span>
                            </div>

                            {/* Volume Control */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    if (
                                      player &&
                                      player.isMuted !== undefined
                                    ) {
                                      const newMuted = !isMuted;
                                      setIsMuted(newMuted);

                                      if (newMuted) {
                                        player.mute();
                                      } else {
                                        player.unMute();
                                      }

                                      console.log(
                                        `YouTube player ${
                                          newMuted ? "muted" : "unmuted"
                                        }`
                                      );
                                    } else {
                                      console.warn("YouTube player not ready");
                                    }
                                  }}
                                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
                                  title={isMuted ? "음소거 해제" : "음소거"}
                                >
                                  {isMuted || volume === 0 ? (
                                    <svg
                                      className="w-4 h-4 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="w-4 h-4 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                      />
                                    </svg>
                                  )}
                                </button>

                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={volume}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const newVolume = parseInt(e.target.value);
                                    setVolume(newVolume);
                                    setIsMuted(newVolume === 0);

                                    if (player && player.setVolume) {
                                      player.setVolume(newVolume);

                                      if (newVolume === 0) {
                                        player.mute();
                                      } else {
                                        player.unMute();
                                      }

                                      console.log(
                                        `YouTube volume set to: ${newVolume}`
                                      );
                                    } else {
                                      console.warn(
                                        "YouTube player not ready for volume control"
                                      );
                                    }
                                  }}
                                  className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                                  style={{
                                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`,
                                  }}
                                />
                              </div>

                              <span className="text-white/80 text-xs font-medium min-w-[3rem] text-right">
                                {isMuted || volume === 0
                                  ? "음소거"
                                  : `${volume}%`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-potato-orange to-potato-orange-dark rounded-full animate-pulse shadow-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-clapperboard-gray to-clapperboard-gray-dark rounded-full animate-pulse delay-1000 shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 홈 영상 관리자 (관리자만 표시) - 영상 아래로 이동 */}
                <HomeVideoManager
                  isAdmin={isAdmin}
                  onVideoChange={handleHomeVideoChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-12 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <Link href="#services">
            <div className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-8 h-12 border-2 border-potato-orange/60 rounded-full flex justify-center bg-gradient-to-b from-potato-orange/20 to-potato-orange-light/20 backdrop-blur-sm group-hover:border-potato-orange group-hover:bg-potato-orange/30 transition-all duration-300 shadow-lg">
                <div className="w-2 h-4 bg-gradient-to-b from-potato-orange to-potato-orange-light rounded-full mt-2 animate-pulse group-hover:scale-110 transition-all duration-300"></div>
              </div>
              <span className="text-potato-orange-light/80 text-sm font-bold group-hover:text-potato-orange transition-colors duration-300 tracking-wider">
                SCROLL
              </span>
            </div>
          </Link>
        </div>
      </main>

      {/* Services Section - Enhanced Responsive */}
      <section
        id="services"
        className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  services_title: {
                    value: "우리의 서비스",
                    className:
                      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6",
                  },
                }}
              />
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  services_subtitle: {
                    value: "창의적이고 전문적인 영상 제작 서비스를 제공합니다",
                    className:
                      "text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed",
                  },
                }}
              />
            </p>
          </div>

          <StrapiContent
            endpoint="/api/services"
            render={(services: any[], loading: boolean) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {loading ? (
                  <div className="col-span-full text-center text-gray-300">
                    서비스를 불러오는 중...
                  </div>
                ) : services && services.length > 0 ? (
                  services.map((service: any, index: number) => (
                    <div
                      key={index}
                      className="group bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-clapperboard-gray-light"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
                          {service.attributes?.icon || "🎬"}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                          {service.attributes?.title || "서비스"}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 group-hover:text-white leading-relaxed">
                          {service.attributes?.description || "서비스 설명"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  // 기본 서비스 데이터 표시
                  <>
                    <div className="group bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-clapperboard-gray-light">
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
                          🎬
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                          영상 제작
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 group-hover:text-white leading-relaxed">
                          창의적이고 전문적인 영상 제작 서비스를 제공합니다
                        </p>
                      </div>
                    </div>
                    <div className="group bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-clapperboard-gray-light">
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
                          ✂️
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                          편집 & 후반작업
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 group-hover:text-white leading-relaxed">
                          고품질 편집과 후반작업으로 완성도 높은 영상을
                          제작합니다
                        </p>
                      </div>
                    </div>
                    <div className="group bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-clapperboard-gray-light">
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
                          🎨
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                          브랜딩 & 디자인
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 group-hover:text-white leading-relaxed">
                          브랜드 아이덴티티에 맞는 창의적인 디자인을 제공합니다
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        </div>
      </section>

      {/* Portfolio Showcase - Enhanced Responsive */}
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
                        onClick={() => openVideoModal(video.videoId)}
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
                          {video.tags.slice(0, 2).map((tag: any) => (
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

      {/* About Us Section - Enhanced Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_title: {
                    value: "우리에 대해",
                    className:
                      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6",
                  },
                }}
              />
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_subtitle: {
                    value: "창의적이고 전문적인 영상 제작팀입니다",
                    className:
                      "text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed",
                  },
                }}
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
                🎯
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="home"
                  fields={{
                    about_feature1_title: {
                      value: "전문성",
                      className:
                        "text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white",
                    },
                  }}
                />
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="home"
                  fields={{
                    about_feature1_desc: {
                      value:
                        "다년간의 경험과 전문 지식을 바탕으로 고품질 영상을 제작합니다",
                      className:
                        "text-sm sm:text-base text-gray-300 leading-relaxed",
                    },
                  }}
                />
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
                💡
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="home"
                  fields={{
                    about_feature2_title: {
                      value: "창의성",
                      className:
                        "text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white",
                    },
                  }}
                />
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="home"
                  fields={{
                    about_feature2_desc: {
                      value:
                        "독창적이고 혁신적인 아이디어로 브랜드의 가치를 높입니다",
                      className:
                        "text-sm sm:text-base text-gray-300 leading-relaxed",
                    },
                  }}
                />
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
                ⚡
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="home"
                  fields={{
                    about_feature3_title: {
                      value: "신속성",
                      className:
                        "text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white",
                    },
                  }}
                />
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="home"
                  fields={{
                    about_feature3_desc: {
                      value:
                        "효율적인 워크플로우로 빠르고 정확한 결과를 제공합니다",
                      className:
                        "text-sm sm:text-base text-gray-300 leading-relaxed",
                    },
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  testimonials_title: {
                    value: "고객 리뷰",
                    className:
                      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6",
                  },
                }}
              />
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  testimonials_subtitle: {
                    value: "고객들이 말하는 COUCH POTATO",
                    className:
                      "text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed",
                  },
                }}
              />
            </p>
          </div>

          <StrapiContent
            endpoint="/api/testimonials"
            render={(testimonials: any[], loading: boolean) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {loading ? (
                  <div className="col-span-full text-center text-gray-300">
                    리뷰를 불러오는 중...
                  </div>
                ) : testimonials && testimonials.length > 0 ? (
                  testimonials.map((testimonial: any, index: number) => (
                    <div
                      key={index}
                      className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                          {testimonial.attributes?.name?.charAt(0) || "A"}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg sm:text-xl">
                            {testimonial.attributes?.name || "고객"}
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm">
                            {testimonial.attributes?.company || "회사"}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                        &quot;{testimonial.attributes?.review || "리뷰 내용"}
                        &quot;
                      </p>
                    </div>
                  ))
                ) : (
                  // 기본 리뷰 데이터 표시
                  <>
                    <div className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                          김
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg sm:text-xl">
                            김민수
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm">
                            패션 브랜드 대표
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                        &quot;정말 훌륭한 영상 제작 서비스입니다. 브랜드의
                        가치를 완벽하게 표현해주셨어요.&quot;
                      </p>
                    </div>
                    <div className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                          이
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg sm:text-xl">
                            이지은
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm">
                            웨딩 플래너
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                        &quot;웨딩 영상이 정말 감동적이었어요. 평생 기억에 남을
                        소중한 순간을 아름답게 담아주셨습니다.&quot;
                      </p>
                    </div>
                    <div className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                          박
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg sm:text-xl">
                            박준호
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm">
                            기업 마케팅팀장
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                        &quot;기업 홍보 영상 제작에서 전문성과 창의성을 모두
                        갖춘 팀입니다. 강력 추천합니다!&quot;
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        </div>
      </section>

      {/* CTA Section - Enhanced Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="home"
              fields={{
                cta_title: {
                  value: "지금 시작하세요",
                  className:
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8",
                },
              }}
            />
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="home"
              fields={{
                cta_subtitle: {
                  value: "당신의 브랜드 이야기를 영상으로 만들어보세요",
                  className:
                    "text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed",
                },
              }}
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <SmallYellowBtn href="/contact" text="🚀 프로젝트 시작하기" /> 
          <BigWhiteBtn href="/process" text="📋 제작 과정 보기" />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Player */}
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="Video Player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
