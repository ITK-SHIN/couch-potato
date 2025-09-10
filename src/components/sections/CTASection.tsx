"use client";

import UniversalContent from "@/components/UniversalContent";
import { useAdmin } from "@/contexts/AdminContext";
import { SmallYellowBtn, BigWhiteBtn } from "@/app/components/Button";

export default function CTASection() {
  const { isAdmin } = useAdmin();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8">
          <UniversalContent
            isAdmin={isAdmin}
            pageName="home"
            fields={{
              cta_title: {
                value: "지금 시작하세요",
                className:
                  "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8",
              },
            }}
          />
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
          <UniversalContent
            isAdmin={isAdmin}
            pageName="home"
            fields={{
              cta_subtitle: {
                value: "당신의 브랜드 이야기를 영상으로 만들어보세요",
                className:
                  "text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed",
              },
            }}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <SmallYellowBtn href="/contact" text="🚀 프로젝트 시작하기" />
          <BigWhiteBtn href="/process" text="📋 제작 과정 보기" />
        </div>
      </div>
    </section>
  );
}
