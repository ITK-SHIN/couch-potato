"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import UniversalContent from "@/components/UniversalContent";
import HomeVideoManager from "@/components/HomeVideoManager";
import { useAdmin } from "@/contexts/AdminContext";
import { BigBlackBtn, BigYellowBtn } from "@/app/components/Button";

interface HeroSectionProps {
  homeVideo: any;
  onVideoChange: (video: any) => void;
}

export default function HeroSection({
  homeVideo,
  onVideoChange,
}: HeroSectionProps) {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const playerRef = useRef<any>(null);
  const [iframeRef, setIframeRef] = useState<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(75);
  const { isAdmin } = useAdmin();

  // YouTube Player API 로드 및 초기화
  useEffect(() => {
    if (typeof window !== "undefined" && !window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);

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
      !playerRef.current &&
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
              event.target.setVolume(volume);
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
        playerRef.current = newPlayer;
        console.log("YouTube player created successfully");
      } catch (error) {
        console.error("Error creating YouTube player:", error);
      }
    }
  }, [isPlayerReady, iframeRef, homeVideo?.videoId, volume, isMuted]);

  // 홈 영상 변경 시 플레이어 업데이트
  useEffect(() => {
    if (playerRef.current && homeVideo?.videoId) {
      try {
        playerRef.current.loadVideoById(homeVideo.videoId);
        console.log(`Video changed to: ${homeVideo.videoId}`);
      } catch (error) {
        console.error("Error changing video:", error);
      }
    }
  }, [homeVideo?.videoId]);

  return (
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
                              🏢 <span>{homeVideo.client || "클라이언트"}</span>
                            </span>
                          </div>

                          {/* Volume Control */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  if (
                                    playerRef.current &&
                                    playerRef.current.isMuted !== undefined
                                  ) {
                                    const newMuted = !isMuted;
                                    setIsMuted(newMuted);

                                    if (newMuted) {
                                      playerRef.current.mute();
                                    } else {
                                      playerRef.current.unMute();
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

                                  if (
                                    playerRef.current &&
                                    playerRef.current.setVolume
                                  ) {
                                    playerRef.current.setVolume(newVolume);

                                    if (newVolume === 0) {
                                      playerRef.current.mute();
                                    } else {
                                      playerRef.current.unMute();
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
                onVideoChange={onVideoChange}
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
  );
}
