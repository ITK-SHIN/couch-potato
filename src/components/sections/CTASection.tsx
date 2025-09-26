"use client";

import UniversalContent from "@/components/ui/UniversalContent";
import { useAdmin } from "@/contexts/AdminContext";
import { SmallYellowBtn, BigWhiteBtn } from "@/components/ui/Button";

export default function CTASection() {
  const { isAdmin } = useAdmin();

  return (
    <section className="py-24 bg-gradient-to-r from-potato-orange to-potato-orange-light text-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-8">
          <UniversalContent
            isAdmin={isAdmin}
            pageName="home"
            fields={{
              cta_title: {
                value: "지금 시작하세요",
                className: "text-4xl md:text-5xl font-black",
              },
            }}
          />
        </h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
          <UniversalContent
            isAdmin={isAdmin}
            pageName="home"
            fields={{
              cta_subtitle: {
                value: "당신의 브랜드 이야기를 영상으로 만들어보세요",
                className: "text-xl leading-relaxed opacity-90",
              },
            }}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <SmallYellowBtn href="/contact" text="🚀 프로젝트 시작하기" />
          <BigWhiteBtn href="/process" text="📋 제작 과정 보기" />
        </div>
      </div>
    </section>
  );
}
