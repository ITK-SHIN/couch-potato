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

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-6 py-2 bg-yellow-400 rounded-full text-black text-sm font-bold border-2 border-yellow-500 mb-6 shadow-xl">
                📋 OUR PROCESS
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              제작 과정
            </h1>

            <p className="text-xl md:text-2xl text-yellow-300 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed font-bold drop-shadow-lg">
              체계적이고 전문적인 5단계 제작 프로세스
            </p>

            <div className="animate-slide-up-delayed">
              <Link href="#process-steps">
                <button className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-yellow-300">
                  📋 제작 단계 보기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Process Steps */}
      <section id="process-steps" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              제작 단계
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              각 단계별 전문적인 프로세스로 최고 품질의 영상을 제작합니다
            </p>
          </div>

          <div className="space-y-24">
            {processSteps.map((process, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-black">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-black">
                        {process.title}
                      </h3>
                      <p className="text-lg text-gray-600 font-medium">
                        {process.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    {process.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {process.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <span className="text-2xl">{process.icon}</span>
                    <span className="font-semibold text-gray-800">
                      소요시간: {process.duration}
                    </span>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{process.icon}</div>
                      <h4 className="text-2xl font-bold mb-2">
                        {process.title}
                      </h4>
                      <p className="text-blue-100">{process.subtitle}</p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              전체 일정
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>

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
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{process.icon}</span>
                        <h3 className="text-xl font-bold text-black">
                          {process.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {process.description}
                      </p>
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {process.duration}
                      </span>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
            프로젝트를 시작해보세요
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            체계적인 프로세스로 여러분의 아이디어를 완벽한 영상으로
            완성해드립니다
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                🚀 프로젝트 상담하기
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-12 py-5 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300">
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
