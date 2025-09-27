"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UniversalContent from "@/components/ui/UniversalContent";
import CategoryManager from "@/components/admin/CategoryManager";
import VideoManager from "@/components/admin/VideoManager";
import { useAdmin } from "@/contexts/AdminContext";
import { usePortfolioVideos, useCategories } from "@/hooks";
import {
  BigYellowBtn,
  SmallYellowBorderHoverBigBtn,
  SmallYellowHoverBigBtn,
} from "@/components/ui/Button";

const PortfolioPage = () => {
  const { isAdmin } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(75);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [iframeRef, setIframeRef] = useState<HTMLDivElement | null>(null);
  const [videoContainerRef, setVideoContainerRef] =
    useState<HTMLDivElement | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;

  // React Query 훅 사용
  const { data: portfolioData, isLoading: portfolioLoading, error: portfolioError } = usePortfolioVideos();
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  const portfolioItems = portfolioData?.videos || [];
  const categories = categoriesData?.categories || [];
  const loading = portfolioLoading || categoriesLoading;
  const error = portfolioError || categoriesError;

  // 기본 카테고리 (API 실패 시 사용)
  const getDefaultCategories = () => [
    { id: "all", name: "전체", icon: "🎬", order: 0 },
    { id: "youtube", name: "YouTube", icon: "📹", order: 1 },
    { id: "wedding", name: "웨딩", icon: "💒", order: 2 },
    { id: "brand", name: "브랜드", icon: "🏢", order: 3 },
    { id: "commercial", name: "광고", icon: "📺", order: 4 },
    { id: "corporate", name: "기업홍보", icon: "🏭", order: 5 },
    { id: "event", name: "이벤트", icon: "🎉", order: 6 },
    { id: "education", name: "교육", icon: "📚", order: 7 },
    { id: "social", name: "소셜미디어", icon: "📱", order: 8 },
  ];

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);

    if (player && isPlayerReady) {
      if (newMuteState) {
        player.mute();
      } else {
        player.unMute();
      }
      console.log(`Mute toggled: ${newMuteState}`);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);

    // 볼륨이 0이면 음소거, 아니면 음소거 해제
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }

    // 플레이어 API를 통해 직접 볼륨 조절
    if (player && isPlayerReady) {
      console.log(`Setting volume to: ${newVolume}`);

      // 볼륨 설정
      player.setVolume(newVolume);

      // 볼륨에 따른 음소거 상태 조절
      if (newVolume === 0) {
        player.mute();
      } else if (isMuted && newVolume > 0) {
        player.unMute();
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoContainerRef) {
      if (!document.fullscreenElement) {
        // 전체화면 진입
        const element = videoContainerRef as any;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      } else {
        // 전체화면 종료
        const doc = document as any;
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    }
  };

  // 에러가 발생한 경우 기본 카테고리 사용
  const displayCategories = categories.length > 0 ? categories : getDefaultCategories();

  // YouTube Player API 로드 및 초기화
  useEffect(() => {
    // YouTube API 스크립트 로드
    if (typeof window !== "undefined" && !window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);

      // API 준비 완료 콜백
      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube API loaded");
        setIsPlayerReady(true);
      };
    } else if (window.YT && window.YT.Player) {
      setIsPlayerReady(true);
    }

    return () => {
      // 클린업
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = null;
      }
    };
  }, []);

  // 플레이어 초기화
  useEffect(() => {
    if (
      isPlayerReady &&
      iframeRef &&
      window.YT &&
      window.YT.Player &&
      !player
    ) {
      try {
        console.log("Creating YouTube player...");
        const newPlayer = new window.YT.Player(iframeRef, {
          height: "100%",
          width: "100%",
          videoId: "1CUt84BK_p0",
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: "1CUt84BK_p0",
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
      } catch (error) {
        console.error("Error creating YouTube player:", error);
      }
    }
  }, [isPlayerReady, iframeRef, player, isMuted, volume]);

  // 폴백 데이터 (API가 작동하지 않을 때 사용)
  const getFallbackPortfolioData = () => [
    {
      id: 1,
      title: "패션을 파는 것은 어떨까요?",
      category: "commercial",
      client: "패션 브랜드",
      year: "2024",
      thumbnail: `https://img.youtube.com/vi/1CUt84BK_p0/maxresdefault.jpg`,
      videoId: "1CUt84BK_p0",
      videoUrl: "https://www.youtube.com/watch?v=1CUt84BK_p0",
      description: "패션 브랜드의 마케팅을 위한 창의적인 광고 영상",
    },
    {
      id: 2,
      title: "이 영상은 우지커피 광고 영상입니다.",
      category: "commercial",
      client: "우지커피",
      year: "2024",
      thumbnail: `https://img.youtube.com/vi/__Jx8hdRy3w/maxresdefault.jpg`,
      videoId: "__Jx8hdRy3w",
      videoUrl: "https://www.youtube.com/watch?v=__Jx8hdRy3w",
      description: "우지커피 브랜드를 위한 프로모션 광고 영상",
    },
    {
      id: 3,
      title: "드라마틱 웨딩 세리머니",
      category: "wedding",
      client: "신혼 커플 C",
      year: "2024",
      thumbnail: "/imgs/bg1.jpg",
      videoId: "ScMzIvxBSi4", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "감성 넘치는 웨딩 세리머니의 모든 순간",
    },
    {
      id: 4,
      title: "야외 웨딩 하이라이트",
      category: "wedding",
      client: "신혼 커플 D",
      year: "2024",
      thumbnail: "/imgs/about.jpg",
      videoId: "astISOttCQ0", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "자연 속에서 펼쳐진 아름다운 야외 웨딩",
    },
    {
      id: 5,
      title: "클래식 웨딩 다큐멘터리",
      category: "wedding",
      client: "신혼 커플 E",
      year: "2023",
      thumbnail: "/imgs/about2.jpg",
      videoId: "oHg5SJYRHA0", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "고전적이고 우아한 웨딩의 완벽한 기록",
    },
    {
      id: 6,
      title: "비하인드 메이킹 영상",
      category: "education",
      client: "COUCH POTATO",
      year: "2024",
      thumbnail: "/imgs/about3.jpg",
      videoId: "M7lc1UVf-VE", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "웨딩 촬영 현장의 생생한 비하인드 스토리",
    },
    {
      id: 7,
      title: "브랜딩 영상 제작기",
      category: "brand",
      client: "로컬 브랜드",
      year: "2024",
      thumbnail: "/imgs/1.jpg",
      videoId: "fJ9rUzIMcZQ", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "브랜드의 정체성을 담은 창의적인 영상 제작 과정",
    },
    {
      id: 8,
      title: "이벤트 촬영 하이라이트",
      category: "event",
      client: "이벤트 기획사",
      year: "2023",
      thumbnail: "/imgs/2.jpg",
      videoId: "QH2-TGUlwu4", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "특별한 순간들을 포착한 이벤트 영상",
    },
    {
      id: 9,
      title: "촬영 장비 리뷰",
      category: "education",
      client: "COUCH POTATO",
      year: "2023",
      thumbnail: "/imgs/about.jpg",
      videoId: "xvFZjo5PgG0", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "프로 영상 제작을 위한 장비 소개 및 활용법",
    },
    {
      id: 10,
      title: "SNS 콘텐츠 제작",
      category: "social",
      client: "인플루언서",
      year: "2024",
      thumbnail: "/imgs/about2.jpg",
      videoId: "Ks-_Mh1QhMc", // 실제 YouTube 영상 ID로 교체 필요
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "트렌디한 SNS 콘텐츠 제작 노하우",
    },
  ];



  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredItems.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 카테고리 변경 시 첫 페이지로 이동
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Hero Section */}
      <main className="relative min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/imgs/bg1.jpg"
            alt="COUCH POTATO Portfolio Background"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>

        <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-20 flex items-center justify-center">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="mb-6 sm:mb-8 animate-fade-in">
                  <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-potato-orange rounded-full text-white text-xs sm:text-sm font-bold border-2 border-potato-orange-light mb-4 sm:mb-6 shadow-xl">
                    🎬 OUR PORTFOLIO
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight animate-slide-up drop-shadow-2xl">
                  <UniversalContent
                    isAdmin={isAdmin}
                    pageName="portfolio"
                    fields={{
                      portfolio_title: {
                        value: "작품 갤러리",
                        className:
                          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white",
                      },
                    }}
                  />
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl text-potato-orange-light leading-relaxed mb-8 sm:mb-12 animate-fade-in-delayed font-bold drop-shadow-lg px-4 sm:px-0">
                  <UniversalContent
                    isAdmin={isAdmin}
                    pageName="portfolio"
                    fields={{
                      portfolio_subtitle: {
                        value: "COUCH POTATO의 실제 작품들을 감상해보세요",
                        className:
                          "text-lg sm:text-xl lg:text-2xl text-potato-orange-light font-bold",
                      },
                    }}
                  />
                </p>

                <div className="animate-slide-up-delayed">
                  {/*                   <Link href="#portfolio-grid">
                    <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white font-black rounded-full hover:from-potato-orange-light hover:to-potato-orange transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-potato-orange-light">
                      <UniversalContent
                        isAdmin={isAdmin}
                        pageName="portfolio"
                        fields={{
                          gallery_button: {
                            value: "🎬 작품 갤러리 보기",
                            className: "text-white font-black",
                          },
                        }}
                      />
                    </button>
                  </Link> */}
                  <SmallYellowHoverBigBtn
                    href="#portfolio-grid"
                    text="🎬 작품 갤러리 보기"
                  />
                </div>
              </div>

              {/* Right Featured Video */}
              <div className="animate-slide-up-delayed mt-8 lg:mt-0">
                <div className="relative group transform hover:scale-105 lg:scale-110 lg:hover:scale-115 transition-transform duration-500">
                  {/* Video Container with Glassmorphism Frame */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
                    {/* Video Player */}
                    <div
                      ref={(ref) => setVideoContainerRef(ref)}
                      className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-black/30"
                    >
                      <div
                        ref={(ref) => setIframeRef(ref)}
                        className="w-full h-full rounded-2xl"
                        id="youtube-player"
                      ></div>

                      {/* Simple Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 z-10"
                        title="전체화면"
                      >
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
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Video Information Inside Glass Frame */}
                    <div className="mt-6">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-potato-orange/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          🏆 대표작
                        </span>
                        <span className="px-3 py-1 bg-clapperboard-gray/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          👗 패션 광고
                        </span>
                        <span className="px-3 py-1 bg-potato-orange-light/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          ▶️ 자동재생
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-white text-2xl font-black mb-3 drop-shadow-lg leading-tight">
                        패션을 파는 것은 어떨까요?
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 text-base leading-relaxed mb-4">
                        패션 브랜드의 마케팅을 위한 창의적인 광고 영상입니다.
                        브랜드의 정체성과 가치를 시각적으로 표현하여 고객과의
                        감정적 연결을 만들어내는 작품입니다.
                      </p>

                      {/* Stats and Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span className="flex items-center gap-1">
                            📅 <span>2024</span>
                          </span>
                          <span className="flex items-center gap-1">
                            🏢 <span>패션 브랜드</span>
                          </span>
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (player && player.isMuted !== undefined) {
                                  const newMuted = !isMuted;
                                  setIsMuted(newMuted);

                                  // YouTube Player API로 직접 제어
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
                                  // YouTube Player API로 직접 볼륨 제어
                                  player.setVolume(newVolume);

                                  // 볼륨 0일 때 음소거, 아닐 때 음소거 해제
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
                            {isMuted || volume === 0 ? "음소거" : `${volume}%`}
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
            </div>
          </div>
        </div>
      </main>

      {/* Filter Section */}
      <section className="py-12 sm:py-16 bg-clapperboard-gray-light border-b border-clapperboard-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 카테고리 관리자 (관리자만 표시) */}
          <CategoryManager isAdmin={isAdmin} />

          {/* 카테고리 필터 버튼들 */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {displayCategories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white shadow-lg"
                      : "bg-clapperboard-gray text-white hover:bg-clapperboard-gray-light"
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section
        id="portfolio-grid"
        className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 영상 관리자 (관리자만 표시) */}
          <VideoManager isAdmin={isAdmin} />

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12 sm:py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-gray-300 text-base sm:text-lg">
                영상을 불러오는 중...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
              <h3 className="text-lg sm:text-xl font-bold text-potato-orange mb-2">
                오류 발생
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
              </p>
            </div>
          )}

          {/* Portfolio Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-clapperboard-gray-light rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => openVideoModal(item.videoId)}
                          className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-red-700"
                        >
                          <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/70 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                          {
                            displayCategories.find((cat) => cat.id === item.category)
                              ?.name
                          }
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs sm:text-sm text-potato-orange font-semibold">
                          {item.client}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-potato-orange transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => openVideoModal(item.videoId)}
                          className="flex-1 bg-potato-orange text-white text-center py-2 px-3 sm:px-4 rounded-lg font-semibold hover:bg-potato-orange-dark transition-colors duration-300 text-sm"
                        >
                          🎬 영상 재생
                        </button>
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-clapperboard-gray-dark text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-clapperboard-gray transition-colors duration-300"
                        >
                          채널 방문
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  {/* 이전 페이지 버튼 */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-clapperboard-gray text-white hover:bg-clapperboard-gray-light"
                    }`}
                  >
                    이전
                  </button>

                  {/* 페이지 번호들 */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white shadow-lg"
                            : "bg-clapperboard-gray text-white hover:bg-clapperboard-gray-light"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  {/* 다음 페이지 버튼 */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === totalPages
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-clapperboard-gray text-white hover:bg-clapperboard-gray-light"
                    }`}
                  >
                    다음
                  </button>
                </div>
              )}

              {/* 페이지 정보 */}
              <div className="text-center mt-6 text-gray-400 text-sm">
                {filteredItems.length > 0 ? (
                  <>
                    {startIndex + 1}-{Math.min(endIndex, filteredItems.length)}{" "}
                    / {filteredItems.length}개 영상
                    {selectedCategory !== "all" && (
                      <span className="ml-2">
                        (
                        {
                          displayCategories.find((cat) => cat.id === selectedCategory)
                            ?.name
                        }{" "}
                        카테고리)
                      </span>
                    )}
                  </>
                ) : (
                  "표시할 영상이 없습니다."
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-clapperboard-gray-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="portfolio"
                fields={{
                  stats_title: {
                    value: "우리의 성과",
                    className: "text-4xl md:text-5xl font-black text-white",
                  },
                }}
              />
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-dark mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "60+", label: "완성된 프로젝트", icon: "🎬" },
              { number: "25+", label: "웨딩 촬영", icon: "💒" },
              { number: "40+", label: "만족한 고객", icon: "😊" },
              { number: "150K+", label: "YouTube 조회수", icon: "👀" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-potato-orange to-potato-orange-light text-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="portfolio"
              fields={{
                cta_title: {
                  value: "다음 작품의 주인공은?",
                  className: "text-4xl md:text-5xl font-black",
                },
              }}
            />
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="portfolio"
              fields={{
                cta_subtitle: {
                  value:
                    "여러분의 브랜드 스토리를 COUCH POTATO만의 스타일로 완성해보세요. 다음 포트폴리오의 주인공이 되어보시지 않으시겠어요?",
                  className: "text-xl leading-relaxed opacity-90",
                },
              }}
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <SmallYellowHoverBigBtn
              href="/contact"
              text="🚀 프로젝트 시작하기"
            />
            <a
              href="https://www.youtube.com/@TryToShinDirect."
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="portfolio"
                  fields={{
                    cta_button2: {
                      value: "🎬 YouTube 채널 구독",
                      className: "text-black font-bold",
                    },
                  }}
                />
              </button>
            </a>
            <SmallYellowBorderHoverBigBtn
              href="/process"
              text="📋 제작 과정 보기"
            />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white transition-all duration-300"
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

            {/* YouTube Video */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioPage;
