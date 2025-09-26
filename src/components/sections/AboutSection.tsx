"use client";

import UniversalContent from "@/components/ui/UniversalContent";
import { useAdmin } from "@/contexts/AdminContext";

export default function AboutSection() {
  const { isAdmin } = useAdmin();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            <UniversalContent
              isAdmin={isAdmin}
              pageName="home"
              fields={{
                about_title: {
                  value: "전문성과 창의성",
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
                about_subtitle: {
                  value: "창의적인 영상 제작 전문가",
                  className:
                    "text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed",
                },
              }}
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
              🎬
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_feature1_title: {
                    value: "전문성",
                    className:
                      "text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white",
                  },
                }}
              />
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_feature1_desc: {
                    value:
                      "10년간의 경험과 전문 지식을 바탕으로 고품질 영상을 제작합니다",
                    className:
                      "text-sm sm:text-base text-gray-300 leading-relaxed",
                  },
                }}
              />
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
              💡
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_feature2_title: {
                    value: "창의성",
                    className:
                      "text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white",
                  },
                }}
              />
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_feature2_desc: {
                    value:
                      "독창적이고 신선한 아이디어로 브랜드의 가치를 전달합니다",
                    className:
                      "text-sm sm:text-base text-gray-300 leading-relaxed",
                  },
                }}
              />
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-potato-orange to-potato-orange-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">
              ⚡
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_feature3_title: {
                    value: "효율성",
                    className:
                      "text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white",
                  },
                }}
              />
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              <UniversalContent
                isAdmin={isAdmin}
                pageName="home"
                fields={{
                  about_feature3_desc: {
                    value:
                      "효율적인 워크플로우로 빠르고 확실한 결과를 제공합니다",
                    className:
                      "text-sm sm:text-base text-gray-300 leading-relaxed",
                  },
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}