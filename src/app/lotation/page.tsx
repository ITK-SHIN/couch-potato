"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const locations = [
    {
      name: "본사 스튜디오",
      type: "Main Studio",
      address: "서울특별시 강남구 테헤란로 123",
      description: "최신 장비를 갖춘 메인 촬영 스튜디오",
      features: ["4K 촬영 장비", "전문 조명 시설", "음향 녹음실", "편집실"],
      image: "/imgs/lotation.jpg",
      icon: "🏢"
    },
    {
      name: "야외 촬영 지역",
      type: "Outdoor Locations",
      address: "서울 및 수도권 일대",
      description: "다양한 야외 촬영 로케이션 지원",
      features: ["한강공원", "남산타워", "경복궁", "홍대거리"],
      image: "/imgs/about.jpg",
      icon: "🌳"
    },
    {
      name: "웨딩 전용 공간",
      type: "Wedding Venues",
      address: "서울 및 경기도 웨딩홀",
      description: "웨딩 촬영 전문 파트너 업체들",
      features: ["채플", "가든", "연회장", "스몰웨딩홀"],
      image: "/imgs/about2.jpg",
      icon: "💒"
    }
  ];

  const serviceAreas = [
    { area: "서울특별시", coverage: "100%", icon: "🏙️" },
    { area: "경기도", coverage: "95%", icon: "🏘️" },
    { area: "인천광역시", coverage: "90%", icon: "🌊" },
    { area: "기타 지역", coverage: "협의", icon: "🚗" }
  ];

  return (
    <>
      {/* Hero Section */}
      <main className="relative min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/imgs/lotation.jpg"
            alt="COUCH POTATO Location Background"
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
                📍 OUR LOCATIONS
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              촬영 위치
            </h1>
            
            <p className="text-xl md:text-2xl text-yellow-300 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed font-bold drop-shadow-lg">
              서울 및 수도권 전 지역 촬영 서비스 제공
            </p>
          </div>
        </div>
      </main>

      {/* Locations Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              촬영 장소
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              다양한 촬영 환경과 전문 시설을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-4xl">{location.icon}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-black text-black mb-2">{location.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{location.type}</p>
                  
                  <div className="flex items-start gap-2 mb-4">
                    <span className="text-gray-500 mt-1">📍</span>
                    <p className="text-gray-700">{location.address}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{location.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-black mb-3">주요 특징:</h4>
                    {location.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              서비스 지역
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              수도권 전 지역에서 전문 영상 제작 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-black mb-2">{area.area}</h3>
                <div className="text-3xl font-black text-blue-600 mb-2">{area.coverage}</div>
                <p className="text-gray-600">서비스 가능</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              찾아오시는 길
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">지도 위치</h3>
                  <p className="text-gray-600">서울특별시 강남구 테헤란로 123</p>
                </div>
              </div>
            </div>
            
            {/* Location Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">🏢 본사 위치</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">📍</span>
                    <span className="text-gray-700">서울특별시 강남구 테헤란로 123</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">🚇</span>
                    <span className="text-gray-700">강남역 3번 출구 도보 5분</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">🚗</span>
                    <span className="text-gray-700">주차 공간 완비</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">🕐 운영 시간</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">평일</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">토요일</span>
                    <span className="font-semibold">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">일요일</span>
                    <span className="font-semibold text-red-600">휴무</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
            방문 상담 예약하기
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            직접 방문하셔서 스튜디오 시설을 둘러보고 프로젝트에 대해 상담받으세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                📞 방문 예약하기
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-12 py-5 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300">
                🎬 작품 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
