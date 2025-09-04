"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-orange-400/20 rounded-full animate-bounce"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text drop-shadow-2xl leading-none">
            404
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12 animate-fade-in-delayed">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            아래 버튼을 통해 다른 페이지로 이동해보세요.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up-delayed mb-16">
          <Link href="/">
            <button className="group px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 hover:rotate-1 transition-all duration-300 shadow-2xl border-2 border-yellow-300 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                🏠 홈으로 돌아가기
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>

          <Link href="/portfolio">
            <button className="group px-10 py-4 border-3 border-yellow-400 text-yellow-400 font-black rounded-full hover:bg-yellow-400 hover:text-black transform hover:scale-110 hover:-rotate-1 transition-all duration-300 shadow-xl relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                🎬 포트폴리오 보기
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>

        {/* Brand Logo */}
        <div className="mt-16 animate-fade-in-delayed">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-sm tracking-wider">
              COUCH POTATO
            </span>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 right-10 animate-float">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full backdrop-blur-sm border border-white/20"></div>
      </div>

      <div
        className="absolute bottom-40 left-20 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full backdrop-blur-sm border border-white/20"></div>
      </div>

      <div
        className="absolute top-1/3 right-1/4 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-20 h-20 bg-gradient-to-r from-pink-400/30 to-red-500/30 rounded-full backdrop-blur-sm border border-white/20"></div>
      </div>
    </div>
  );
}
