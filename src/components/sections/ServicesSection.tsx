"use client";

import UniversalContent from "@/components/ui/UniversalContent";
import StrapiContent from "@/components/ui/StrapiContent";
import { useAdmin } from "@/contexts/AdminContext";

export default function ServicesSection() {
  const { isAdmin } = useAdmin();

  return (
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
                  value: "전문 서비스",
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
                // 기본 서비스 카드 표시
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
                        고품질 편집과 후반작업으로 완성도 높은 영상을 제작합니다
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
  );
}