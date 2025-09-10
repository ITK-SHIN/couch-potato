"use client";

import UniversalContent from "@/components/UniversalContent";
import StrapiContent from "@/components/StrapiContent";
import { useAdmin } from "@/contexts/AdminContext";

export default function TestimonialsSection() {
  const { isAdmin } = useAdmin();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="home"
              fields={{
                testimonials_title: {
                  value: "고객 리뷰",
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
                testimonials_subtitle: {
                  value: "고객들이 말하는 COUCH POTATO",
                  className:
                    "text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed",
                },
              }}
            />
          </p>
        </div>

        <StrapiContent
          endpoint="/api/testimonials"
          render={(testimonials: any[], loading: boolean) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {loading ? (
                <div className="col-span-full text-center text-gray-300">
                  리뷰를 불러오는 중...
                </div>
              ) : testimonials && testimonials.length > 0 ? (
                testimonials.map((testimonial: any, index: number) => (
                  <div
                    key={index}
                    className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                        {testimonial.attributes?.name?.charAt(0) || "A"}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl">
                          {testimonial.attributes?.name || "고객"}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          {testimonial.attributes?.company || "회사"}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                      &quot;{testimonial.attributes?.review || "리뷰 내용"}
                      &quot;
                    </p>
                  </div>
                ))
              ) : (
                // 기본 리뷰 데이터 표시
                <>
                  <div className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                        김
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl">
                          김민수
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          패션 브랜드 대표
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                      &quot;정말 훌륭한 영상 제작 서비스입니다. 브랜드의 가치를
                      완벽하게 표현해주셨어요.&quot;
                    </p>
                  </div>
                  <div className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                        이
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl">
                          이지은
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          웨딩 플래너
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                      &quot;웨딩 영상이 정말 감동적이었어요. 평생 기억에 남을
                      소중한 순간을 아름답게 담아주셨습니다.&quot;
                    </p>
                  </div>
                  <div className="bg-clapperboard-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                        박
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg sm:text-xl">
                          박준호
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          기업 마케팅팀장
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed italic text-sm sm:text-base">
                      &quot;기업 홍보 영상 제작에서 전문성과 창의성을 모두 갖춘
                      팀입니다. 강력 추천합니다!&quot;
                    </p>
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
