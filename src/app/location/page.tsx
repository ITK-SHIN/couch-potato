"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import UniversalContent from "@/components/UniversalContent";
import { useAdmin } from "@/contexts/AdminContext";

const LocationPage = () => {
  const { isAdmin } = useAdmin();
  const locations = [
    {
      name: "본사 스튜디오",
      type: "Main Studio",
      address: "서울특별시 강남구 테헤란로 123",
      description: "최신 장비를 갖춘 메인 촬영 스튜디오",
      features: ["4K 촬영 장비", "전문 조명 시설", "음향 녹음실", "편집실"],
      image: "/imgs/lotation.jpg",
      icon: "🏢",
    },
    {
      name: "야외 촬영 지역",
      type: "Outdoor Locations",
      address: "서울 및 수도권 일대",
      description: "다양한 야외 촬영 로케이션 지원",
      features: ["한강공원", "남산타워", "경복궁", "홍대거리"],
      image: "/imgs/about.jpg",
      icon: "🌳",
    },
    {
      name: "웨딩 전용 공간",
      type: "Wedding Venues",
      address: "서울 및 경기도 웨딩홀",
      description: "웨딩 촬영 전문 파트너 업체들",
      features: ["채플", "가든", "연회장", "스몰웨딩홀"],
      image: "/imgs/about2.jpg",
      icon: "💒",
    },
  ];

  const serviceAreas = [
    { area: "서울특별시", coverage: "100%", icon: "🏙️" },
    { area: "경기도", coverage: "95%", icon: "🏘️" },
    { area: "인천광역시", coverage: "90%", icon: "🌊" },
    { area: "기타 지역", coverage: "협의", icon: "🚗" },
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

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 animate-fade-in">
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-potato-orange rounded-full text-white text-xs sm:text-sm font-bold border-2 border-potato-orange-light mb-4 sm:mb-6 shadow-xl">
                📍 OUR LOCATIONS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="location"
                fields={{
                  location_title: {
                    value: "촬영 위치",
                    className:
                      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white",
                  },
                }}
              />
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-potato-orange-light max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 animate-fade-in-delayed font-bold drop-shadow-lg px-4 sm:px-0">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="location"
                fields={{
                  location_subtitle: {
                    value: "서울 및 수도권 전 지역 촬영 서비스 제공",
                    className:
                      "text-lg sm:text-xl lg:text-2xl text-potato-orange-light font-bold",
                  },
                }}
              />
            </p>

            <div className="animate-slide-up-delayed">
              <Link href="#locations">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white font-black rounded-full hover:from-potato-orange-light hover:to-potato-orange transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-potato-orange-light">
                  <UniversalContent
                    isAdmin={isAdmin}
                    pageName="location"
                    fields={{
                      location_button: {
                        value: "📍 촬영 장소 보기",
                        className: "text-white font-black",
                      },
                    }}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Locations Section */}
      <section
        id="locations"
        className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="location"
                fields={{
                  locations_title: {
                    value: "촬영 장소",
                    className:
                      "text-3xl sm:text-4xl lg:text-5xl font-black text-white",
                  },
                }}
              />
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-dark mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="location"
                fields={{
                  locations_subtitle: {
                    value: "다양한 촬영 환경과 전문 시설을 제공합니다",
                    className: "text-base sm:text-lg lg:text-xl text-gray-300",
                  },
                }}
              />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className="group bg-clapperboard-gray rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
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

                <div className="p-4 sm:p-6 lg:p-8">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    {location.name}
                  </h3>
                  <p className="text-potato-orange font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                    {location.type}
                  </p>

                  <div className="flex items-start gap-2 mb-3 sm:mb-4">
                    <span className="text-gray-500 mt-1 text-sm">📍</span>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {location.address}
                    </p>
                  </div>

                  <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {location.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">
                      주요 특징:
                    </h4>
                    {location.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-potato-orange rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm sm:text-base">
                          {feature}
                        </span>
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
      <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="location"
                fields={{
                  service_areas_title: {
                    value: "서비스 지역",
                    className:
                      "text-3xl sm:text-4xl lg:text-5xl font-black text-white",
                  },
                }}
              />
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-dark mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="location"
                fields={{
                  service_areas_subtitle: {
                    value:
                      "수도권 전 지역에서 전문 영상 제작 서비스를 제공합니다",
                    className: "text-base sm:text-lg lg:text-xl text-gray-300",
                  },
                }}
              />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="bg-clapperboard-gray-light rounded-xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">
                  {area.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {area.area}
                </h3>
                <div className="text-2xl sm:text-3xl font-black text-potato-orange mb-2">
                  {area.coverage}
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  서비스 가능
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-clapperboard-gray-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="location"
                fields={{
                  map_title: {
                    value: "찾아오시는 길",
                    className: "text-4xl md:text-5xl font-black text-white",
                  },
                }}
              />
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-dark mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <div className="relative aspect-video bg-clapperboard-gray rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    지도 위치
                  </h3>
                  <p className="text-gray-300">
                    서울특별시 강남구 테헤란로 123
                  </p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  🏢 본사 위치
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-potato-orange rounded-full flex items-center justify-center text-white text-sm">
                      📍
                    </span>
                    <span className="text-gray-300">
                      서울특별시 강남구 테헤란로 123
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-potato-orange rounded-full flex items-center justify-center text-white text-sm">
                      🚇
                    </span>
                    <span className="text-gray-300">
                      강남역 3번 출구 도보 5분
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-potato-orange rounded-full flex items-center justify-center text-white text-sm">
                      🚗
                    </span>
                    <span className="text-gray-300">주차 공간 완비</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  🕐 운영 시간
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">평일</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">토요일</span>
                    <span className="font-semibold">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">일요일</span>
                    <span className="font-semibold text-potato-orange">
                      휴무
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-clapperboard-gray">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="location"
              fields={{
                cta_title: {
                  value: "방문 상담 예약하기",
                  className: "text-4xl md:text-5xl font-black text-white",
                },
              }}
            />
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="location"
              fields={{
                cta_subtitle: {
                  value:
                    "직접 방문하셔서 스튜디오 시설을 둘러보고 프로젝트에 대해 상담받으세요",
                  className: "text-xl text-gray-300 leading-relaxed",
                },
              }}
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white font-bold rounded-full hover:from-potato-orange-light hover:to-potato-orange transform hover:scale-105 transition-all duration-300 shadow-xl">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="location"
                  fields={{
                    cta_button1: {
                      value: "📞 방문 예약하기",
                      className: "text-white font-bold",
                    },
                  }}
                />
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-12 py-5 border-2 border-potato-orange text-potato-orange font-bold rounded-full hover:bg-potato-orange hover:text-white transform hover:scale-105 transition-all duration-300">
                <UniversalContent
                  isAdmin={isAdmin}
                  pageName="location"
                  fields={{
                    cta_button2: {
                      value: "🎬 작품 보기",
                      className: "text-potato-orange font-bold",
                    },
                  }}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
