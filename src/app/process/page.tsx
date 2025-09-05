"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProcessPage = () => {
  const processSteps = [
    {
      step: "01",
      title: "상담 및 기획",
      subtitle: "Consultation & Planning",
      description: "고객의 니즈를 파악하고 최적의 영상 컨셉을 기획합니다",
      details: ["초기 상담", "컨셉 기획", "스토리보드 작성", "일정 협의"],
      icon: "💡",
      duration: "1-2일",
    },
    {
      step: "02",
      title: "사전 준비",
      subtitle: "Pre-Production",
      description: "촬영을 위한 모든 준비 과정을 진행합니다",
      details: ["장소 섭외", "장비 준비", "스태프 배치", "최종 점검"],
      icon: "📋",
      duration: "2-3일",
    },
    {
      step: "03",
      title: "촬영 진행",
      subtitle: "Production",
      description: "전문 장비와 숙련된 기술로 완벽한 촬영을 진행합니다",
      details: ["현장 촬영", "다양한 앵글", "실시간 모니터링", "품질 확인"],
      icon: "🎬",
      duration: "1일",
    },
    {
      step: "04",
      title: "편집 및 후작업",
      subtitle: "Post-Production",
      description: "촬영 소스를 바탕으로 완성도 높은 영상을 제작합니다",
      details: ["영상 편집", "색보정", "음향 작업", "특수 효과"],
      icon: "✂️",
      duration: "3-5일",
    },
    {
      step: "05",
      title: "최종 완성",
      subtitle: "Final Delivery",
      description: "고객 검토 후 최종 수정을 거쳐 완성본을 전달합니다",
      details: ["1차 시안", "피드백 반영", "최종 수정", "완성본 전달"],
      icon: "🎉",
      duration: "1-2일",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <main className="relative min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/imgs/process1.jpg"
            alt="COUCH POTATO Process Background"
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
                📋 OUR PROCESS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              제작 과정
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-potato-orange-light max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 animate-fade-in-delayed font-bold drop-shadow-lg px-4 sm:px-0">
              체계적이고 전문적인 5단계 제작 프로세스
            </p>

            <div className="animate-slide-up-delayed">
              <Link href="#process-steps">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white font-black rounded-full hover:from-potato-orange-light hover:to-potato-orange transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-potato-orange-light">
                  📋 제작 단계 보기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Process Steps */}
      <section
        id="process-steps"
        className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              제작 단계
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-dark mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              각 단계별 전문적인 프로세스로 최고 품질의 영상을 제작합니다
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {processSteps.map((process, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center lg:justify-start">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-potato-orange to-potato-orange-dark rounded-full flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-black">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        {process.title}
                      </h3>
                      <p className="text-base sm:text-lg text-gray-300 font-medium">
                        {process.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6">
                    {process.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {process.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 justify-center lg:justify-start"
                      >
                        <div className="w-2 h-2 bg-potato-orange rounded-full flex-shrink-0"></div>
                        <span className="text-sm sm:text-base text-gray-300">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 bg-clapperboard-gray px-3 sm:px-4 py-2 rounded-full">
                    <span className="text-xl sm:text-2xl">{process.icon}</span>
                    <span className="font-semibold text-white text-sm sm:text-base">
                      소요시간: {process.duration}
                    </span>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-video bg-gradient-to-br from-potato-orange to-potato-orange-dark rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                        {process.icon}
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold mb-2">
                        {process.title}
                      </h4>
                      <p className="text-potato-orange-light text-sm sm:text-base">
                        {process.subtitle}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-3 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-clapperboard-gray">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              전체 일정
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-dark mx-auto mb-8"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-potato-orange to-potato-orange-dark"></div>

            <div className="space-y-12">
              {processSteps.map((process, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-clapperboard-gray-light rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{process.icon}</span>
                        <h3 className="text-xl font-bold text-white">
                          {process.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-2">
                        {process.description}
                      </p>
                      <span className="text-sm bg-potato-orange text-white px-3 py-1 rounded-full font-medium">
                        {process.duration}
                      </span>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-potato-orange rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-clapperboard-gray-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
            프로젝트를 시작해보세요
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            체계적인 프로세스로 여러분의 아이디어를 완벽한 영상으로
            완성해드립니다
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white font-bold rounded-full hover:from-potato-orange-light hover:to-potato-orange transform hover:scale-105 transition-all duration-300 shadow-xl">
                🚀 프로젝트 상담하기
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-12 py-5 border-2 border-potato-orange text-potato-orange font-bold rounded-full hover:bg-potato-orange hover:text-white transform hover:scale-105 transition-all duration-300">
                🎬 포트폴리오 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessPage;
