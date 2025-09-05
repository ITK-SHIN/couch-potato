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
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          {/* Animated Gradient Accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-transparent to-orange-600/20 opacity-50 animate-pulse"></div>
        </div>

        {/* Hero Content - Asymmetric Impact Layout */}
        <div className="relative z-10 min-h-screen px-4 flex items-center justify-center">
          <div className="max-w-7xl w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content - 7 columns for more impact */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-8">
                {/* Enhanced Badge */}
                <div className="animate-fade-in">
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-xl rounded-full border border-yellow-400/30 shadow-2xl mb-6">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    <span className="text-yellow-300 font-bold text-sm tracking-wider">
                      ⭐ CREATIVE VIDEO PRODUCTION
                    </span>
                  </div>
                </div>

                {/* Massive Brand Title */}
                <div className="animate-slide-up">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-none">
                    <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                      COUCH
                    </span>
                    <br />
                    <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                      POTATO
                    </span>
                  </h1>
                  {/* Decorative Line */}
                  <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mb-8 mx-auto lg:mx-0"></div>
                </div>

                {/* Enhanced Tagline */}
                <div className="animate-fade-in-delayed">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 leading-relaxed font-light mb-4">
                    브랜드의 이야기를
                  </p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      영상으로 완성하는
                    </span>
                  </p>
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 leading-relaxed font-light">
                    크리에이티브 스튜디오
                  </p>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center animate-slide-up-delayed">
                  <Link href="/contact">
                    <button className="group px-12 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 hover:rotate-1 transition-all duration-300 shadow-2xl border-2 border-yellow-300 relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-3 text-lg">
                        🚀 프로젝트 시작하기
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                  <Link href="/portfolio">
                    <button className="group px-12 py-5 border-3 border-yellow-400 text-yellow-400 font-black rounded-full hover:bg-yellow-400 hover:text-black transform hover:scale-110 hover:-rotate-1 transition-all duration-300 shadow-xl relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-3 text-lg">
                        🎬 포트폴리오 보기
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                </div>

                {/* Additional CTA */}
                <div className="animate-slide-up-delayed">
                  <Link href="#services">
                    <button className="group px-10 py-4 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-sm text-white font-bold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl border border-white/20">
                      <span className="flex items-center gap-3">
                        📋 서비스 보기
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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

              {/* Right Content - 5 columns for balanced video */}
              <div className="lg:col-span-5 animate-slide-up-delayed">
                <div className="relative group">
                  {/* Enhanced Glassmorphism Frame */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-150 transition-all duration-700 hover:shadow-3xl">
                    {/* Video Player */}
                    <div
                      ref={(ref) => setVideoContainerRef(ref)}
                      className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/30 border border-white/10"
                    >
                      <div
                        ref={(ref) => setIframeRef(ref)}
                        className="w-full h-full rounded-2xl"
                        id="youtube-player-home"
                      ></div>

                      {/* Enhanced Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 z-10 border border-white/20"
                        title="전체화면"
                      >
                        <svg
                          className="w-6 h-6 text-white"
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

                    {/* Enhanced Video Information */}
                    <div className="mt-8 space-y-6">
                      {/* Title and Tags */}
                      <div>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="px-4 py-2 bg-yellow-400/20 text-yellow-300 text-sm font-bold rounded-full border border-yellow-400/30 backdrop-blur-sm">
                            #패션
                          </span>
                          <span className="px-4 py-2 bg-blue-400/20 text-blue-300 text-sm font-bold rounded-full border border-blue-400/30 backdrop-blur-sm">
                            #브랜드영상
                          </span>
                          <span className="px-4 py-2 bg-purple-400/20 text-purple-300 text-sm font-bold rounded-full border border-purple-400/30 backdrop-blur-sm">
                            #대표작
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          패션을 파는 것은 어떨까요?
                        </h3>
                      </div>

                      {/* Stats and Controls */}
                      <div className="flex items-center justify-between text-sm border-t border-white/10 pt-6">
                        <div className="flex items-center gap-6 text-gray-300">
                          <span className="flex items-center gap-2">
                            👁 <span className="font-medium">조회수</span>
                          </span>
                          <span className="flex items-center gap-2">
                            ❤️ <span className="font-medium">좋아요</span>
                          </span>
                        </div>

                        {/* Enhanced Volume Control */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
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
                              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
                              title={isMuted ? "음소거 해제" : "음소거"}
                            >
                              {isMuted || volume === 0 ? (
                                <svg
                                  className="w-5 h-5 text-white"
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
                                  className="w-5 h-5 text-white"
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
                              className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                              style={{
                                background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`,
                              }}
                            />
                          </div>

                          <span className="text-sm text-white/80 font-medium min-w-[3rem]">
                            {isMuted || volume === 0
                              ? "🔇 음소거"
                              : `${volume}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce shadow-lg"></div>
                  <div className="absolute top-1/2 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <Link href="#services">
            <div className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-8 h-12 border-2 border-yellow-400/60 rounded-full flex justify-center bg-gradient-to-b from-yellow-400/20 to-orange-500/20 backdrop-blur-sm group-hover:border-yellow-400 group-hover:bg-yellow-400/30 transition-all duration-300 shadow-lg">
                <div className="w-2 h-4 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mt-2 animate-pulse group-hover:scale-110 transition-all duration-300"></div>
              </div>
              <span className="text-yellow-300/80 text-sm font-bold group-hover:text-yellow-400 transition-colors duration-300 tracking-wider">
                EXPLORE
              </span>
            </div>
          </Link>
        </div>
      </main>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">
              SERVICES
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              다양한 영상 콘텐츠 제작 서비스를 통해 브랜드의 가치를 극대화합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105"
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">
              PORTFOLIO
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              다양한 브랜드와 함께한 프로젝트들을 만나보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative aspect-video bg-gray-800 rounded-2xl overflow-hidden cursor-pointer"
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
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      프로젝트 {item}
                    </h3>
                    <p className="text-gray-300 text-sm">브랜드 영상</p>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-black"
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

          <div className="text-center mt-16">
            <Link href="/portfolio">
              <button className="px-10 py-4 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300">
                전체 포트폴리오 보기
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-black mb-8">
                ABOUT US
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-8"></div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
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

              <div className="mt-12">
                <Link href="/about">
                  <button className="px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-300">
                    자세히 알아보기
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* 배경에 블러와 투명도, 그리고 둥근 테두리 효과 */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl z-10" />
                {/* 로고 이미지 */}
                <div className="relative z-20 w-4/5 h-4/5 flex items-center justify-center">
                  <img
                    src="/imgs/mainlogo.png"
                    alt="COUCH POTATO 메인 로고"
                    className="object-contain w-full h-full drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
                    style={{ borderRadius: "1.25rem" }}
                  />
                </div>
                {/* 테두리 장식 */}
                <div className="absolute inset-0 rounded-2xl border-4 border-white/30 z-30 pointer-events-none" />
                {/* 빛나는 효과 */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-yellow-300/20 via-orange-400/10 to-purple-500/10 blur-2xl z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">
              CLIENT REVIEWS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              함께 작업한 클라이언트들의 생생한 후기를 들어보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  &quot;{testimonial.review}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-8">
            시작해볼까요?
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            브랜드의 이야기를 영상으로 완성할 준비가 되셨나요? COUCH POTATO와
            함께 특별한 프로젝트를 시작해보세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                프로젝트 문의하기
              </button>
            </Link>
            <Link href="/process">
              <button className="px-12 py-5 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300">
                제작 프로세스 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
