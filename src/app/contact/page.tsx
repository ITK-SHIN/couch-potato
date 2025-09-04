"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 로직 구현
    console.log("Form submitted:", formData);
    alert("문의사항이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다!");
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "전화번호",
      content: "010-1234-5678",
      subContent: "평일 09:00 - 18:00",
      action: "tel:010-1234-5678"
    },
    {
      icon: "📧",
      title: "이메일",
      content: "hello@couchpotato.kr",
      subContent: "24시간 접수 가능",
      action: "mailto:hello@couchpotato.kr"
    },
    {
      icon: "💬",
      title: "카카오톡",
      content: "@CouchPotato",
      subContent: "실시간 상담 가능",
      action: "https://open.kakao.com/o/sCouchPotato"
    },
    {
      icon: "📍",
      title: "주소",
      content: "서울특별시 강남구 테헤란로 123",
      subContent: "강남역 3번 출구 도보 5분",
      action: "https://maps.google.com"
    }
  ];

  const projectTypes = [
    "웨딩 촬영", "기업 홍보", "제품 광고", "이벤트 촬영", 
    "브랜딩 영상", "교육 콘텐츠", "SNS 콘텐츠", "기타"
  ];

  return (
    <>
      {/* Hero Section */}
      <main className="relative min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/imgs/contact.jpg"
            alt="COUCH POTATO Contact Background"
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
                📞 CONTACT US
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              연락하기
            </h1>
            
            <p className="text-xl md:text-2xl text-yellow-300 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed font-bold drop-shadow-lg">
              프로젝트 상담부터 견적까지, 언제든 편하게 연락주세요
            </p>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="tel:010-1234-5678" className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
                📞 바로 전화하기
              </a>
              <a href="mailto:hello@couchpotato.kr" className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
                📧 이메일 보내기
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Information Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              연락처 정보
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              다양한 방법으로 연락주시면 신속하게 답변드리겠습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <a 
                key={index} 
                href={info.action}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 p-8 text-center border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-5xl mb-4 group-hover:animate-bounce">{info.icon}</div>
                <h3 className="text-xl font-black text-black mb-3">{info.title}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{info.content}</p>
                <p className="text-gray-600 text-sm">{info.subContent}</p>
                
                {/* Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold">
                    클릭하여 연결
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              프로젝트 문의하기
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              프로젝트 세부사항을 알려주시면 맞춤 견적을 제공해드립니다
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-black font-semibold mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="홍길동"
                  />
                </div>
                
                <div>
                  <label className="block text-black font-semibold mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-black font-semibold mb-2">
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="010-1234-5678"
                  />
                </div>
                
                <div>
                  <label className="block text-black font-semibold mb-2">
                    회사/단체명
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="(주)회사명"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">
                  프로젝트 유형 <span className="text-red-500">*</span>
                </label>
                <select
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">프로젝트 유형을 선택해주세요</option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">
                  프로젝트 상세 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="프로젝트의 목적, 일정, 예산, 특별한 요구사항 등을 자세히 적어주세요."
                ></textarea>
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  🚀 견적 요청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              자주 묻는 질문
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "견적은 무료인가요?",
                a: "네, 모든 견적 상담은 무료로 진행됩니다. 프로젝트 상세 내용을 알려주시면 정확한 견적을 제공해드립니다."
              },
              {
                q: "촬영 소요시간은 얼마나 되나요?",
                a: "프로젝트 규모에 따라 다르지만, 일반적으로 웨딩은 6-8시간, 기업 홍보는 2-4시간 정도 소요됩니다."
              },
              {
                q: "완성된 영상은 언제 받을 수 있나요?",
                a: "촬영 후 편집 작업을 거쳐 일반적으로 1-2주 내에 완성본을 전달해드립니다."
              },
              {
                q: "수정 요청이 가능한가요?",
                a: "네, 1차 완성본에 대해 2회까지 수정 요청이 가능합니다. 추가 수정은 별도 비용이 발생할 수 있습니다."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-3">
                  <span className="text-blue-500">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-8">
                  <span className="text-blue-500 font-semibold">A.</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            지금 바로 시작하세요! 
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            전문적인 영상 제작으로 여러분의 스토리를 세상에 알려보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="tel:010-1234-5678" className="px-12 py-5 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
              📞 010-1234-5678
            </a>
            <Link href="/portfolio">
              <button className="px-12 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                🎬 포트폴리오 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
