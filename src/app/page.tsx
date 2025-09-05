"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(75);
  const [iframeRef, setIframeRef] = useState<HTMLDivElement | null>(null);
  const [videoContainerRef, setVideoContainerRef] =
    useState<HTMLDivElement | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);

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

  // 풀스크린 토글 함수
  const toggleFullscreen = () => {
    if (videoContainerRef) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.requestFullscreen();
      }
    }
  };

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
            priority
            className="object-cover opacity-60"
          />
          {/* Enhanced Gradient Overlays - 로고 색상 기반 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-clapperboard-gray/30 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          {/* Animated Gradient Accent - 감자칩 오렌지 */}
          <div className="absolute inset-0 bg-gradient-to-r from-potato-orange/20 via-transparent to-potato-orange-light/20 opacity-50 animate-pulse"></div>
        </div>

        {/* Hero Content - Enhanced Responsive Layout with Mobile Nav Spacing */}
        <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-0 flex items-center justify-center">
          <div className="max-w-7xl w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Content - Responsive Typography & Spacing */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10">
                {/* Enhanced Badge - Better Mobile */}
                <div className="animate-fade-in">
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-potato-orange/20 to-potato-orange-light/20 backdrop-blur-xl rounded-full border border-potato-orange/30 shadow-2xl mb-4 sm:mb-6">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-potato-orange rounded-full animate-ping"></div>
                    <span className="text-potato-orange-light font-bold text-xs sm:text-sm tracking-wider">
                      ⭐ CREATIVE VIDEO PRODUCTION
                    </span>
                  </div>
                </div>

                {/* Massive Brand Title - Better Mobile Typography */}
                <div className="animate-slide-up">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white mb-4 sm:mb-6 leading-[0.9] sm:leading-none">
                    <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                      COUCH
                    </span>
                    <br />
                    <span className="inline-block bg-gradient-to-r from-potato-orange via-potato-orange-light to-potato-orange-dark bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                      POTATO
                    </span>
                  </h1>
                  {/* Decorative Line - Responsive Width */}
                  <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mb-6 sm:mb-8 mx-auto lg:mx-0"></div>
                </div>

                {/* Enhanced Tagline - Better Mobile Typography */}
                <div className="animate-fade-in-delayed space-y-2 sm:space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
                    브랜드의 이야기를
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-potato-orange-light via-potato-orange to-potato-orange-dark bg-clip-text text-transparent">
                      영상으로 완성하는
                    </span>
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
                    크리에이티브 스튜디오
                  </p>
                </div>

                {/* Enhanced CTA Buttons - Better Mobile Layout */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center animate-slide-up-delayed pt-4 sm:pt-6">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <button className="group w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 bg-gradient-to-r from-potato-orange to-potato-orange-light text-white font-black rounded-full hover:from-potato-orange-light hover:to-potato-orange-dark transform hover:scale-110 hover:rotate-1 transition-all duration-300 shadow-2xl border-2 border-potato-orange relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
                        🚀 프로젝트 시작하기
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                  <Link href="/portfolio" className="w-full sm:w-auto">
                    <button className="group w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 border-3 border-potato-orange text-potato-orange font-black rounded-full hover:bg-potato-orange hover:text-white transform hover:scale-110 hover:-rotate-1 transition-all duration-300 shadow-xl relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
                        🎬 포트폴리오 보기
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-potato-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                </div>

                {/* Additional CTA - Better Mobile */}
                <div className="animate-slide-up-delayed pt-2 sm:pt-4">
                  <Link href="#services">
                    <button className="group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-clapperboard-gray/80 to-clapperboard-gray-light/80 backdrop-blur-sm text-white font-bold rounded-full hover:from-clapperboard-gray-light hover:to-clapperboard-gray-dark transform hover:scale-105 transition-all duration-300 shadow-xl border border-white/20">
                      <span className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                        📋 서비스 보기
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Content - Enhanced Responsive Video */}
              <div className="lg:col-span-5 animate-slide-up-delayed mt-8 lg:mt-0">
                <div className="relative group">
                  {/* Enhanced Glassmorphism Frame - Better Mobile Padding */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl hover:scale-105 lg:hover:scale-110 transition-all duration-700 hover:shadow-3xl">
                    {/* Video Player - Better Mobile Aspect */}
                    <div
                      ref={(ref) => setVideoContainerRef(ref)}
                      className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black/30 border border-white/10"
                    >
                      <div
                        ref={(ref) => setIframeRef(ref)}
                        className="w-full h-full rounded-xl sm:rounded-2xl"
                        id="youtube-player-home"
                      ></div>

                      {/* Enhanced Fullscreen Button - Mobile Optimized */}
                      <button
                        onClick={toggleFullscreen}
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 z-10 border border-white/20"
                        title="전체화면"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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

                    {/* Enhanced Video Information - Better Mobile Layout */}
                    <div className="mt-4 sm:mt-6 lg:mt-8 space-y-4 sm:space-y-6">
                      {/* Title and Tags - Responsive Layout */}
                      <div>
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-potato-orange/20 text-potato-orange-light text-xs sm:text-sm font-bold rounded-full border border-potato-orange/30 backdrop-blur-sm">
                            #패션
                          </span>
                          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-clapperboard-gray/20 text-clapperboard-gray-light text-xs sm:text-sm font-bold rounded-full border border-clapperboard-gray/30 backdrop-blur-sm">
                            #브랜드영상
                          </span>
                          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-potato-orange-dark/20 text-potato-orange text-xs sm:text-sm font-bold rounded-full border border-potato-orange-dark/30 backdrop-blur-sm">
                            #대표작
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
                          패션을 파는 것은 어떨까요?
                        </h3>
                      </div>

                      {/* Stats and Controls - Mobile Optimized */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm border-t border-white/10 pt-4 sm:pt-6 gap-4 sm:gap-0">
                        <div className="flex items-center gap-4 sm:gap-6 text-gray-300">
                          <span className="flex items-center gap-2">
                            👁{" "}
                            <span className="font-medium hidden sm:inline">
                              조회수
                            </span>
                          </span>
                          <span className="flex items-center gap-2">
                            ❤️{" "}
                            <span className="font-medium hidden sm:inline">
                              좋아요
                            </span>
                          </span>
                        </div>

                        {/* Enhanced Volume Control - Mobile Friendly */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              onClick={() => {
                                if (player && player.isMuted !== undefined) {
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
                              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
                              title={isMuted ? "음소거 해제" : "음소거"}
                            >
                              {isMuted || volume === 0 ? (
                                <svg
                                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                    clipRule="evenodd"
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
                                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
                              className="w-16 sm:w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                              style={{
                                background: `linear-gradient(to right, #D2691E 0%, #D2691E ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`,
                              }}
                            />
                          </div>

                          <span className="text-xs sm:text-sm text-white/80 font-medium min-w-[3rem]">
                            {isMuted || volume === 0 ? "🔇" : `${volume}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Decorative Elements - Mobile Responsive */}
                  <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-potato-orange to-potato-orange-light rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-clapperboard-gray to-clapperboard-gray-light rounded-full animate-bounce shadow-lg"></div>
                  <div className="absolute top-1/2 -left-3 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-potato-orange-dark to-potato-orange rounded-full animate-ping opacity-75"></div>
                </div>
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
                EXPLORE
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
              SERVICES
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
              다양한 영상 콘텐츠 제작 서비스를 통해 브랜드의 가치를 극대화합니다
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "브랜드 영상",
                description: "기업의 정체성과 가치를 담은 브랜드 스토리 영상",
                icon: "🎬",
              },
              {
                title: "광고 영상",
                description: "임팩트 있는 메시지로 고객의 마음을 사로잡는 광고",
                icon: "📺",
              },
              {
                title: "프로모션 영상",
                description: "제품과 서비스를 효과적으로 어필하는 홍보 영상",
                icon: "🚀",
              },
              {
                title: "이벤트 영상",
                description: "특별한 순간을 기록하고 공유하는 이벤트 영상",
                icon: "🎉",
              },
              {
                title: "교육 콘텐츠",
                description: "전문적이고 이해하기 쉬운 교육용 영상 콘텐츠",
                icon: "📚",
              },
              {
                title: "SNS 콘텐츠",
                description: "소셜미디어 플랫폼에 최적화된 바이럴 콘텐츠",
                icon: "📱",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-clapperboard-gray rounded-2xl hover:bg-potato-orange hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 group-hover:text-white leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase - Enhanced Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              PORTFOLIO
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
              다양한 브랜드와 함께한 프로젝트들을 만나보세요
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative aspect-video bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={`/imgs/${
                    item === 1 ? "1" : item === 2 ? "2" : "bg1"
                  }.jpg`}
                  alt={`Portfolio ${item}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300">
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                    <h3 className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                      프로젝트 {item}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      브랜드 영상
                    </p>
                  </div>
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link href="/portfolio">
              <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-clapperboard-gray-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                전체 포트폴리오 보기
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8">
                ABOUT US
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mb-6 sm:mb-8"></div>

              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                <p>
                  <strong>COUCH POTATO</strong>는 브랜드의 이야기를 영상으로
                  완성하는 크리에이티브 스튜디오입니다.
                </p>
                <p>
                  우리는 단순한 영상 제작을 넘어서, 브랜드가 가진 고유한 가치와
                  메시지를 시각적으로 구현하여 고객과의 깊은 연결고리를
                  만들어냅니다.
                </p>
                <p>
                  창의적인 아이디어와 전문적인 기술력을 바탕으로, 각 브랜드만의
                  특별한 스토리를 영상으로 완성하는 것이 우리의 미션입니다.
                </p>
              </div>

              <div className="mt-8 sm:mt-12">
                <Link href="/about">
                  <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-potato-orange text-white font-bold rounded-full hover:bg-potato-orange-light transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    자세히 알아보기
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-clapperboard-gray via-clapperboard-gray-light to-clapperboard-gray-dark rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500">
                {/* 배경에 블러와 투명도, 그리고 둥근 테두리 효과 */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl sm:rounded-2xl z-10" />
                {/* 로고 이미지 */}
                <div className="relative z-20 w-3/4 sm:w-4/5 h-3/4 sm:h-4/5 flex items-center justify-center">
                  <img
                    src="/imgs/mainlogo.png"
                    alt="COUCH POTATO 메인 로고"
                    className="object-contain w-full h-full drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
                    style={{ borderRadius: "1.25rem" }}
                  />
                </div>
                {/* 테두리 장식 */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/30 z-30 pointer-events-none" />
                {/* 빛나는 효과 */}
                <div className="absolute -inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-potato-orange/20 via-potato-orange-light/10 to-clapperboard-gray/10 blur-2xl z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Enhanced Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              CLIENT REVIEWS
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
              함께 작업한 클라이언트들의 생생한 후기를 들어보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "김대표",
                company: "테크스타트업",
                review:
                  "COUCH POTATO와 함께한 브랜드 영상 프로젝트는 정말 만족스러웠습니다. 우리 브랜드의 가치를 완벽하게 이해하고 구현해주었어요.",
              },
              {
                name: "이마케터",
                company: "패션브랜드",
                review:
                  "창의적이고 트렌디한 영상으로 우리 브랜드를 한 단계 업그레이드시켜주었습니다. 전문성과 열정이 느껴지는 팀이에요.",
              },
              {
                name: "박실장",
                company: "교육기관",
                review:
                  "복잡한 교육 내용을 쉽고 재미있게 풀어낸 영상이 정말 인상적이었습니다. 학습 효과도 크게 향상되었어요.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                  &quot;{testimonial.review}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8">
            시작해볼까요?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            브랜드의 이야기를 영상으로 완성할 준비가 되셨나요? COUCH POTATO와
            함께 특별한 프로젝트를 시작해보세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 bg-gradient-to-r from-potato-orange to-potato-orange-light text-white font-bold rounded-full hover:from-potato-orange-light hover:to-potato-orange-dark transform hover:scale-105 transition-all duration-300 shadow-xl">
                프로젝트 문의하기
              </button>
            </Link>
            <Link href="/process" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-clapperboard-gray-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                제작 프로세스 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
