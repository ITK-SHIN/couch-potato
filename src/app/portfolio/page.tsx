"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoTitles, setVideoTitles] = useState({});

  const openVideoModal = (videoId) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  // 실제 YouTube 영상 제목들
  useEffect(() => {
    setVideoTitles({
      "1CUt84BK_p0": "패션을 파는 것은 어떨까요?", // 실제 YouTube 영상 제목
      "__Jx8hdRy3w": "이 영상은 우지커피 광고 영상입니다."  // 실제 YouTube 영상 제목
    });
  }, []);

  // TryToShinDirect YouTube 채널의 실제 포트폴리오 데이터
  const portfolioItems = [
    {
      id: 1,
      title: videoTitles["1CUt84BK_p0"] || "패션을 파는 것은 어떨까요?",
      category: "commercial",
      client: "패션 브랜드",
      year: "2024",
      thumbnail: `https://img.youtube.com/vi/1CUt84BK_p0/maxresdefault.jpg`,
      videoId: "1CUt84BK_p0",
      videoUrl: "https://www.youtube.com/watch?v=1CUt84BK_p0",
      description: "패션 브랜드의 마케팅을 위한 창의적인 광고 영상"
    },
    {
      id: 2,
      title: videoTitles["__Jx8hdRy3w"] || "이 영상은 우지커피 광고 영상입니다.", 
      category: "commercial",
      client: "우지커피",
      year: "2024",
      thumbnail: `https://img.youtube.com/vi/__Jx8hdRy3w/maxresdefault.jpg`,
      videoId: "__Jx8hdRy3w",
      videoUrl: "https://www.youtube.com/watch?v=__Jx8hdRy3w",
      description: "우지커피 브랜드를 위한 프로모션 광고 영상"
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
      description: "감성 넘치는 웨딩 세리머니의 모든 순간"
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
      description: "자연 속에서 펼쳐진 아름다운 야외 웨딩"
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
      description: "고전적이고 우아한 웨딩의 완벽한 기록"
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
      description: "웨딩 촬영 현장의 생생한 비하인드 스토리"
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
      description: "브랜드의 정체성을 담은 창의적인 영상 제작 과정"
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
      description: "특별한 순간들을 포착한 이벤트 영상"
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
      description: "프로 영상 제작을 위한 장비 소개 및 활용법"
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
      description: "트렌디한 SNS 콘텐츠 제작 노하우"
    }
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
    { id: "social", name: "소셜미디어", icon: "📱" }
  ];

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

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
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-6 py-2 bg-yellow-400 rounded-full text-black text-sm font-bold border-2 border-yellow-500 mb-6 shadow-xl">
                🎬 OUR PORTFOLIO
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              작품 갤러리
            </h1>
            
            <p className="text-xl md:text-2xl text-yellow-300 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed font-bold drop-shadow-lg">
              TryToShinDirect 채널의 실제 작품들을 감상해보세요
            </p>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
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
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/70 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-600 font-semibold">{item.client}</span>
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
              { number: "150K+", label: "YouTube 조회수", icon: "👀" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-black mb-2">{stat.number}</div>
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* YouTube Video */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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

export default page;
