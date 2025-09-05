import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <main className="relative min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/imgs/about3.jpg"
            alt="COUCH POTATO About Background"
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
                🏢 ABOUT COUCH POTATO
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              우리의 이야기
            </h1>

            <p className="text-xl md:text-2xl text-yellow-300 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed font-bold drop-shadow-lg">
              창의적인 영상으로 브랜드의 가치를 전달하는 팀
            </p>

            <div className="animate-slide-up-delayed">
              <Link href="#story">
                <button className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-yellow-300">
                  📖 스토리 보기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Company Story Section */}
      <section id="story" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
                COUCH POTATO의
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  시작
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-8"></div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>COUCH POTATO</strong>는 &apos;소파에서 감자&apos;라는
                  뜻으로, 편안하게 소파에 앉아 영상을 감상하는 순간을
                  의미합니다.
                </p>
                <p>
                  우리는 그 순간에 시청자의 마음을 움직이고, 브랜드의 메시지를
                  깊이 있게 전달하는 영상을 만들고자 합니다.
                </p>
                <p>
                  단순한 영상 제작을 넘어서, 브랜드와 고객 사이의 감정적
                  연결고리를 만들어내는 것이 우리의 목표입니다.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* 배경에 블러와 투명도, 그리고 둥근 테두리 효과 */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl z-10" />
                {/* 로고 이미지 */}
                <div className="relative z-20 w-4/5 h-4/5 flex items-center justify-center">
                  <img
                    src="/imgs/mainlogo.png"
                    alt="COUCH POTATO 메인 로고"
                    className="object-contain w-full h-full drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
                    style={{ borderRadius: "1.25rem" }}
                  />
                </div>
                {/* 테두리 장식 */}
                <div className="absolute inset-0 rounded-2xl border-4 border-white/30 z-30 pointer-events-none" />
                {/* 빛나는 효과 */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-yellow-300/20 via-orange-400/10 to-purple-500/10 blur-2xl z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              대표 메시지
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-xl">
                  신
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-black text-black mb-6">
                  신상현 대표
                </h3>
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  &quot;수많은 영상 업체들이 많지만, COUCH POTATO를 컨택해주신
                  것에는 단순히 제작 그 이상의 가치를 보셨기 때문이라고
                  생각합니다.
                  <br />
                  <br />
                  영상 콘텐츠로 전하는 브랜드의 힘을 믿습니다. 우리는 전하고
                  싶은 메시지를 가장 잘 표현할 수 있는 방법을 수단과 방법을
                  가리지 않고 찾아내어, 기어코 구현시키는 팀입니다.
                  <br />
                  <br />
                  고객의 비전을 현실로 만드는 것, 그것이 COUCH POTATO의
                  사명입니다.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              우리의 가치
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              COUCH POTATO가 추구하는 핵심 가치들입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "창의성",
                description:
                  "독창적인 아이디어와 혁신적인 접근으로 차별화된 영상을 제작합니다.",
              },
              {
                icon: "🤝",
                title: "신뢰",
                description:
                  "고객과의 약속을 지키며, 투명하고 정직한 소통을 추구합니다.",
              },
              {
                icon: "⚡",
                title: "전문성",
                description:
                  "최신 기술과 트렌드를 바탕으로 전문적인 퀄리티를 보장합니다.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              우리 팀
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              각자의 전문성을 바탕으로 최고의 결과물을 만들어내는 팀입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "신상현",
                role: "대표 / 총괄 디렉터",
                description:
                  "10년 이상의 영상 제작 경험으로 프로젝트 전반을 이끌어갑니다.",
                initial: "신",
              },
              {
                name: "크리에이티브 팀",
                role: "기획 / 연출",
                description:
                  "창의적인 아이디어로 브랜드만의 스토리를 구성합니다.",
                initial: "C",
              },
              {
                name: "프로덕션 팀",
                role: "촬영 / 편집",
                description:
                  "최신 장비와 기술로 완성도 높은 영상을 제작합니다.",
                initial: "P",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-6">
                  {member.initial}
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
            함께 시작해보세요
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            COUCH POTATO와 함께 브랜드의 이야기를 영상으로 완성해보세요.
            언제든지 연락 주시면 친절하게 상담해드리겠습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                📞 연락하기
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

export default AboutPage;
