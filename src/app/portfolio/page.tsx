"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getChannelVideos, isYouTubeAPIConfigured } from "@/utils/youtube";

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(75);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [iframeRef, setIframeRef] = useState(null);
  const [videoContainerRef, setVideoContainerRef] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [player, setPlayer] = useState(null);

  const openVideoModal = (videoId) => {
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

    if (iframeRef && isPlayerReady) {
      // YouTube iframe API를 통해 음소거 상태 변경 (올바른 JSON 포맷)
      const message = JSON.stringify({
        event: "command",
        func: newMuteState ? "mute" : "unMute",
        args: [],
      });
      iframeRef.contentWindow?.postMessage(message, "*");
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);

    // 볼륨이 0이면 음소거, 아니면 음소거 해제
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }

    // 디바운스를 위한 타이머 설정
    if (window.volumeChangeTimer) {
      clearTimeout(window.volumeChangeTimer);
    }

    window.volumeChangeTimer = setTimeout(() => {
      if (iframeRef && isPlayerReady) {
        console.log(`Setting volume to: ${newVolume}`);

        // 먼저 음소거 해제 (볼륨이 0이 아닌 경우)
        if (newVolume > 0) {
          const unmuteMessage = JSON.stringify({
            event: "command",
            func: "unMute",
            args: [],
          });
          iframeRef.contentWindow?.postMessage(unmuteMessage, "*");
        }

        // 볼륨 설정
        const volumeMessage = JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [newVolume],
        });
        iframeRef.contentWindow?.postMessage(volumeMessage, "*");

        // 볼륨이 0이면 음소거
        if (newVolume === 0) {
          setTimeout(() => {
            const muteMessage = JSON.stringify({
              event: "command",
              func: "mute",
              args: [],
            });
            iframeRef.contentWindow?.postMessage(muteMessage, "*");
          }, 100);
        }
      }
    }, 100); // 100ms 디바운스
  };

  const toggleFullscreen = () => {
    if (videoContainerRef) {
      if (!document.fullscreenElement) {
        // 전체화면 진입
        if (videoContainerRef.requestFullscreen) {
          videoContainerRef.requestFullscreen();
        } else if (videoContainerRef.webkitRequestFullscreen) {
          videoContainerRef.webkitRequestFullscreen();
        } else if (videoContainerRef.mozRequestFullScreen) {
          videoContainerRef.mozRequestFullScreen();
        } else if (videoContainerRef.msRequestFullscreen) {
          videoContainerRef.msRequestFullscreen();
        }
      } else {
        // 전체화면 종료
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  };

  // YouTube API에서 실제 영상 데이터 로드
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);

        // YouTube API가 설정되어 있는지 확인
        if (!isYouTubeAPIConfigured()) {
          console.warn("YouTube API key not configured, using fallback data");
          // 폴백 데이터 사용
          setPortfolioItems(getFallbackPortfolioData());
          setLoading(false);
          return;
        }

        // YouTube API에서 데이터 가져오기
        const videos = await getChannelVideos(20); // 최대 20개 영상

        if (videos && videos.length > 0) {
          setPortfolioItems(videos);
          console.log(`Loaded ${videos.length} videos from YouTube API`);
        } else {
          // API에서 데이터를 가져오지 못한 경우 폴백 데이터 사용
          console.warn("No videos returned from API, using fallback data");
          setPortfolioItems(getFallbackPortfolioData());
        }
      } catch (err) {
        console.error("Error loading portfolio data:", err);
        setError("영상 데이터를 불러오는 중 오류가 발생했습니다.");
        // 에러 발생 시에도 폴백 데이터 사용
        setPortfolioItems(getFallbackPortfolioData());
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

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
            onReady: (event) => {
              console.log("YouTube Player ready!");
              // 초기 볼륨 설정
              event.target.setVolume(volume);
              // 초기에는 항상 음소거 상태
              event.target.mute();
              console.log(
                `Initial volume set to: ${volume}, muted: ${isMuted}`
              );
            },
            onStateChange: (event) => {
              console.log("Player state changed:", event.data);
            },
          },
        });
        setPlayer(newPlayer);
      } catch (error) {
        console.error("Error creating YouTube player:", error);
      }
    }
  }, [isPlayerReady, iframeRef, player]);

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

  const categories = [
    { id: "all", name: "전체", icon: "🎬" },
    { id: "youtube", name: "YouTube", icon: "📹" },
    { id: "wedding", name: "웨딩", icon: "💒" },
    { id: "brand", name: "브랜드", icon: "🏢" },
    { id: "commercial", name: "광고", icon: "📺" },
    { id: "corporate", name: "기업홍보", icon: "🏭" },
    { id: "event", name: "이벤트", icon: "🎉" },
    { id: "education", name: "교육", icon: "📚" },
    { id: "social", name: "소셜미디어", icon: "📱" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

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

        <div className="relative z-10 min-h-screen px-4 flex items-center justify-center">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-6xl">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="mb-8 animate-fade-in">
                  <span className="inline-block px-6 py-2 bg-yellow-400 rounded-full text-black text-sm font-bold border-2 border-yellow-500 mb-6 shadow-xl">
                    🎬 OUR PORTFOLIO
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slide-up drop-shadow-2xl">
                  작품 갤러리
                </h1>

                <p className="text-xl md:text-2xl text-yellow-300 leading-relaxed mb-12 animate-fade-in-delayed font-bold drop-shadow-lg">
                  COUCH POTATO의 실제 작품들을 감상해보세요
                </p>

                <div className="animate-slide-up-delayed">
                  <Link href="#portfolio-grid">
                    <button className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-yellow-300">
                      🎬 작품 갤러리 보기
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Featured Video */}
              <div className="animate-slide-up-delayed">
                <div className="relative group transform scale-110">
                  {/* Video Container with Glassmorphism Frame */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl">
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
                        <span className="px-3 py-1 bg-red-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          🏆 대표작
                        </span>
                        <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          👗 패션 광고
                        </span>
                        <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
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
                              onChange={(e) => {
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
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse delay-1000 shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Filter Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio-grid" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-gray-600 text-lg">
                YouTube 채널에서 영상을 불러오는 중...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-600 mb-2">오류 발생</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <p className="text-sm text-gray-500">
                기본 포트폴리오 데이터를 표시합니다.
              </p>
            </div>
          )}

          {/* Portfolio Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
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
                          categories.find((cat) => cat.id === item.category)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-blue-600 font-semibold">
                        {item.client}
                      </span>
                      <span className="text-sm text-gray-500">{item.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => openVideoModal(item.videoId)}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                      >
                        🎬 영상 재생
                      </button>
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-red-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
                      >
                        채널 방문
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              우리의 성과
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
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
                <div className="text-4xl md:text-5xl font-black text-black mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
            다음 작품의 주인공은?
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            여러분의 브랜드 스토리를 COUCH POTATO만의 스타일로 완성해보세요.
            다음 포트폴리오의 주인공이 되어보시지 않으시겠어요?
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                🚀 프로젝트 시작하기
              </button>
            </Link>
            <a
              href="https://www.youtube.com/@TryToShinDirect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-12 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                🎬 YouTube 채널 구독
              </button>
            </a>
            <Link href="/process">
              <button className="px-12 py-5 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300">
                📋 제작 과정 보기
              </button>
            </Link>
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
            onClick={(e) => e.stopPropagation()}
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
