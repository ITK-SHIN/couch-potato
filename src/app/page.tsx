import Image from "next/image";
// import backImg from "../../../public/imgs/1.jpg";
// import logoImg from "../../../public/imgs/logo_new_v5.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section - Original Dark Background */}
      <main className="relative min-h-screen  overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imgs/1.jpg"
            alt="COUCH POTATO Background"
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-6 py-2 bg-yellow-400 rounded-full text-black text-sm font-bold border-2 border-yellow-500 mb-6 shadow-xl">
                ⭐ CREATIVE VIDEO PRODUCTION
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              COUCH
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                POTATO
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-yellow-300 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed font-bold drop-shadow-lg">
              브랜드의 이야기를 영상으로 완성하는 크리에이티브 스튜디오
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up-delayed">
              <Link href="/contact">
                <button className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-yellow-300">
                  🚀 프로젝트 시작하기
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="px-10 py-4 border-3 border-yellow-400 text-yellow-400 font-black rounded-full hover:bg-yellow-400 hover:text-black transform hover:scale-110 transition-all duration-300 shadow-xl">
                  🎬 포트폴리오 보기
                </button>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center bg-yellow-400/20">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">
              SERVICES
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              다양한 영상 콘텐츠 제작 서비스를 통해 브랜드의 가치를 극대화합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "브랜드 영상",
                description: "기업의 정체성과 가치를 담은 브랜드 스토리 영상",
                icon: "🎬"
              },
              {
                title: "광고 영상",
                description: "임팩트 있는 메시지로 고객의 마음을 사로잡는 광고",
                icon: "📺"
              },
              {
                title: "프로모션 영상",
                description: "제품과 서비스를 효과적으로 어필하는 홍보 영상",
                icon: "🚀"
              },
              {
                title: "이벤트 영상",
                description: "특별한 순간을 기록하고 공유하는 이벤트 영상",
                icon: "🎉"
              },
              {
                title: "교육 콘텐츠",
                description: "전문적이고 이해하기 쉬운 교육용 영상 콘텐츠",
                icon: "📚"
              },
              {
                title: "SNS 콘텐츠",
                description: "소셜미디어 플랫폼에 최적화된 바이럴 콘텐츠",
                icon: "📱"
              }
            ].map((service, index) => (
              <div key={index} className="group p-8 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105">
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">
              PORTFOLIO
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              다양한 브랜드와 함께한 프로젝트들을 만나보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative aspect-video bg-gray-800 rounded-2xl overflow-hidden cursor-pointer">
                <Image
                  src={`/imgs/${item === 1 ? '1' : item === 2 ? '2' : 'bg1'}.jpg`}
                  alt={`Portfolio ${item}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300">
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-xl font-bold mb-2">프로젝트 {item}</h3>
                    <p className="text-gray-300 text-sm">브랜드 영상</p>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/portfolio">
              <button className="px-10 py-4 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300">
                전체 포트폴리오 보기
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-black mb-8">
                ABOUT US
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-8"></div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>COUCH POTATO</strong>는 브랜드의 이야기를 영상으로 완성하는 크리에이티브 스튜디오입니다.
                </p>
                <p>
                  우리는 단순한 영상 제작을 넘어서, 브랜드가 가진 고유한 가치와 메시지를 시각적으로 구현하여 
                  고객과의 깊은 연결고리를 만들어냅니다.
                </p>
                <p>
                  창의적인 아이디어와 전문적인 기술력을 바탕으로, 각 브랜드만의 특별한 스토리를 영상으로 
                  완성하는 것이 우리의 미션입니다.
                </p>
              </div>

              <div className="mt-12">
                <Link href="/about">
                  <button className="px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-300">
                    자세히 알아보기
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8">
                <div className="bg-white rounded-xl h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-black mb-4">CP</div>
                    <p className="text-gray-600">COUCH POTATO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6">
              CLIENT REVIEWS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              함께 작업한 클라이언트들의 생생한 후기를 들어보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "김대표",
                company: "테크스타트업",
                review: "COUCH POTATO와 함께한 브랜드 영상 프로젝트는 정말 만족스러웠습니다. 우리 브랜드의 가치를 완벽하게 이해하고 구현해주었어요."
              },
              {
                name: "이마케터",
                company: "패션브랜드",
                review: "창의적이고 트렌디한 영상으로 우리 브랜드를 한 단계 업그레이드시켜주었습니다. 전문성과 열정이 느껴지는 팀이에요."
              },
              {
                name: "박실장",
                company: "교육기관",
                review: "복잡한 교육 내용을 쉽고 재미있게 풀어낸 영상이 정말 인상적이었습니다. 학습 효과도 크게 향상되었어요."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-8">
            시작해볼까요?
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            브랜드의 이야기를 영상으로 완성할 준비가 되셨나요? 
            COUCH POTATO와 함께 특별한 프로젝트를 시작해보세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                프로젝트 문의하기
              </button>
            </Link>
            <Link href="/process">
              <button className="px-12 py-5 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300">
                제작 프로세스 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
