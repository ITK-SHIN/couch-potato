"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 검증
    if (!formData.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    if (!formData.projectType) {
      alert("프로젝트 유형을 선택해주세요.");
      return;
    }

    if (!formData.message.trim()) {
      alert("프로젝트 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("폼 제출 시작:", formData);

      // 이메일 제목과 본문 구성
      const subject = `[COUCH POTATO] ${formData.projectType} 프로젝트 견적 문의`;
      const body = `안녕하세요, COUCH POTATO 견적 문의드립니다.

=== 고객 정보 ===
이름: ${formData.name}
전화번호: ${formData.phone}
이메일: ${formData.email || "제공되지 않음"}
회사/단체: ${formData.company || "개인"}

=== 프로젝트 정보 ===
프로젝트 유형: ${formData.projectType}
상세 내용:
${formData.message}

=== 요청사항 ===
빠른 견적 및 상담 요청드립니다.
연락 가능한 시간: 평일 오전 9시 ~ 오후 6시

감사합니다.`;

      // 여러 방법으로 이메일 전송 시도
      const emailUrl = `mailto:bano112@naver.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      console.log("이메일 URL 생성:", emailUrl);

      // 방법 1: window.location.href 사용
      try {
        window.location.href = emailUrl;
        console.log("window.location.href로 이메일 앱 실행 시도");
      } catch (error) {
        console.log("window.location.href 실패, window.open 시도");
        // 방법 2: window.open 사용
        const emailWindow = window.open(emailUrl, "_blank");
        if (!emailWindow) {
          console.log("window.open도 실패, 팝업이 차단되었을 수 있습니다");
        }
      }

      // 성공 메시지 표시 (약간의 지연 후)
      setTimeout(() => {
        const confirmed = confirm(
          "📧 메일 앱이 실행되었나요?\n\n" +
            "✅ 예: 메일 앱에서 전송 버튼을 눌러주세요\n" +
            "❌ 아니오: 직접 bano112@naver.com으로 연락해주세요\n\n" +
            "확인을 누르면 폼이 초기화됩니다."
        );

        if (confirmed) {
          // 폼 초기화
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            projectType: "",
            message: "",
          });
        }
      }, 1000);
    } catch (error) {
      console.error("Email send failed:", error);

      // 에러 발생 시 수동 복사 옵션 제공
      const emailInfo = `받는 사람: bano112@naver.com
제목: [COUCH POTATO] ${formData.projectType} 프로젝트 견적 문의

내용:
안녕하세요, COUCH POTATO 견적 문의드립니다.

=== 고객 정보 ===
이름: ${formData.name}
전화번호: ${formData.phone}
이메일: ${formData.email || "제공되지 않음"}
회사/단체: ${formData.company || "개인"}

=== 프로젝트 정보 ===
프로젝트 유형: ${formData.projectType}
상세 내용: ${formData.message}

빠른 견적 및 상담 요청드립니다.
감사합니다.`;

      // 클립보드에 복사 시도
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(emailInfo);
          alert(
            "📋 이메일 정보가 클립보드에 복사되었습니다!\n\nbano112@naver.com으로 직접 이메일을 보내주세요."
          );
        } catch (clipError) {
          console.error("클립보드 복사 실패:", clipError);
          alert(
            "❌ 문제가 발생했습니다.\n\n직접 bano112@naver.com으로 연락해주세요:\n\n" +
              emailInfo
          );
        }
      } else {
        alert(
          "❌ 문제가 발생했습니다.\n\n직접 bano112@naver.com으로 연락해주세요:\n\n" +
            emailInfo
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "전화번호",
      content: "010-1234-5678",
      subContent: "평일 09:00 - 18:00",
      action: "tel:010-1234-5678",
    },
    {
      icon: "📧",
      title: "이메일",
      content: "hello@couchpotato.kr",
      subContent: "24시간 접수 가능",
      action: "mailto:hello@couchpotato.kr",
    },
    {
      icon: "💬",
      title: "카카오톡",
      content: "@CouchPotato",
      subContent: "실시간 상담 가능",
      action: "https://open.kakao.com/o/sCouchPotato",
    },
    {
      icon: "📍",
      title: "주소",
      content: "서울특별시 강남구 테헤란로 123",
      subContent: "강남역 3번 출구 도보 5분",
      action: "https://maps.google.com",
    },
  ];

  const projectTypes = [
    "웨딩 촬영",
    "기업 홍보",
    "제품 광고",
    "이벤트 촬영",
    "브랜딩 영상",
    "교육 콘텐츠",
    "SNS 콘텐츠",
    "기타",
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

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-20 gap-8 lg:gap-12">
          {/* Left Side - Title and Description */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="mb-6 sm:mb-8 animate-fade-in">
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-potato-orange rounded-full text-white text-xs sm:text-sm font-bold border-2 border-potato-orange-light mb-4 sm:mb-6 shadow-xl">
                📞 CONTACT US
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight animate-slide-up drop-shadow-2xl">
              연락하기
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-potato-orange-light leading-relaxed mb-6 sm:mb-8 animate-fade-in-delayed font-bold drop-shadow-lg px-4 sm:px-0">
              프로젝트 상담부터 견적까지, 언제든 편하게 연락주세요
            </p>

            <div className="animate-slide-up-delayed mb-6 sm:mb-8">
              <Link href="#contact-info">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-potato-orange to-potato-orange-light text-white font-black rounded-full hover:from-potato-orange-light hover:to-potato-orange-dark transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-potato-orange">
                  📞 연락처 정보 보기
                </button>
              </Link>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-8 sm:mb-12">
              <a
                href="tel:010-1234-5678"
                className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                📞 바로 전화하기
              </a>
              <a
                href="mailto:hello@couchpotato.kr"
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                📧 이메일 보내기
              </a>
            </div>
          </div>

          {/* Right Side - Compact Contact Form */}
          <div className="flex-1 max-w-md w-full">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 animate-slide-up border border-white/30 hover:border-white/40 transition-all duration-500">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl"></div>

              {/* Form header */}
              <div className="relative text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 shadow-lg">
                  <span className="text-lg">📝</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-2 drop-shadow-lg">
                  빠른 견적 문의
                </h2>
                <p className="text-blue-100 text-xs font-medium">
                  간단한 정보만 남겨주시면 24시간 내 연락드려요
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-3 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="relative space-y-4">
                {/* Name Input */}
                <div
                  className="group form-field-enter"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="relative input-focus-ring">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300 z-10">
                      👤
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-8 py-3 bg-white/90 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 shadow-lg backdrop-blur-sm hover:bg-white/95 hover:shadow-xl text-sm"
                      placeholder="이름"
                    />
                    <div className="absolute top-2 right-4 text-xs text-red-400 font-semibold">
                      *
                    </div>
                    {formData.name && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-400">
                        ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Input */}
                <div
                  className="group form-field-enter"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="relative input-focus-ring">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300 z-10">
                      📱
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-8 py-3 bg-white/90 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 shadow-lg backdrop-blur-sm hover:bg-white/95 hover:shadow-xl text-sm"
                      placeholder="전화번호"
                    />
                    <div className="absolute top-2 right-4 text-xs text-red-400 font-semibold">
                      *
                    </div>
                    {formData.phone && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-400">
                        ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div
                  className="group form-field-enter"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="relative input-focus-ring">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300 z-10">
                      📧
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 shadow-lg backdrop-blur-sm hover:bg-white/95 hover:shadow-xl text-sm"
                      placeholder="이메일 (선택사항)"
                    />
                    {formData.email && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400">
                        ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Input */}
                <div
                  className="group form-field-enter"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="relative input-focus-ring">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300 z-10">
                      🏢
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 shadow-lg backdrop-blur-sm hover:bg-white/95 hover:shadow-xl text-sm"
                      placeholder="회사/단체명 (선택사항)"
                    />
                    {formData.company && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400">
                        ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Type Select */}
                <div
                  className="group form-field-enter"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="relative input-focus-ring">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300 z-10">
                      🎬
                    </div>
                    <select
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-16 py-3 bg-white/90 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-black shadow-lg backdrop-blur-sm hover:bg-white/95 hover:shadow-xl appearance-none cursor-pointer text-sm"
                    >
                      <option value="">프로젝트 유형을 선택해주세요</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="absolute top-2 right-16 text-xs text-red-400 font-semibold">
                      *
                    </div>
                    {formData.projectType && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-400">
                        ✓
                      </div>
                    )}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div
                  className="group form-field-enter"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="relative input-focus-ring">
                    <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300 z-10">
                      💬
                    </div>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-8 py-3 bg-white/90 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none text-black placeholder-gray-500 shadow-lg backdrop-blur-sm hover:bg-white/95 hover:shadow-xl text-sm"
                      placeholder="프로젝트에 대해 간단히 설명해주세요&#10;(예: 웨딩 촬영, 촬영 날짜, 예산 등)"
                    ></textarea>
                    <div className="absolute top-2 right-8 text-xs text-red-400 font-semibold">
                      *
                    </div>
                    {formData.message && (
                      <div className="absolute right-4 top-4 text-green-400">
                        ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div
                  className="pt-4 form-field-enter"
                  style={{ animationDelay: "0.7s" }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] overflow-hidden ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed scale-95"
                        : "hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 form-glow"
                    }`}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                          <span className="text-lg">전송 중...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg mr-2 group-hover:animate-bounce">
                            🚀
                          </span>
                          <span className="text-base font-black">
                            빠른 견적 요청하기
                          </span>
                          <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress bar effect when submitting */}
                    {isSubmitting && (
                      <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full animate-pulse"></div>
                    )}
                  </button>

                  {/* Success feedback */}
                  <div className="mt-2 text-center">
                    <p className="text-xs text-blue-100 opacity-75">
                      ✨ 전송 후 24시간 내 연락드립니다
                    </p>
                  </div>
                </div>

                {/* Direct Contact Info */}
                <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-sm mr-1">💡</span>
                      <span className="font-semibold text-white text-xs">
                        문제가 발생하나요?
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 items-center justify-center text-xs">
                      <a
                        href="mailto:bano112@naver.com"
                        className="inline-flex items-center px-3 py-1.5 bg-blue-500/20 text-blue-200 hover:text-white hover:bg-blue-500/30 rounded-full transition-all duration-300 font-medium"
                      >
                        <span className="mr-1">📧</span>
                        bano112@naver.com
                      </a>
                      <span className="text-white/50 hidden sm:block text-xs">
                        또는
                      </span>
                      <a
                        href="tel:010-1234-5678"
                        className="inline-flex items-center px-3 py-1.5 bg-green-500/20 text-green-200 hover:text-white hover:bg-green-500/30 rounded-full transition-all duration-300 font-medium"
                      >
                        <span className="mr-1">📱</span>
                        010-1234-5678
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Information Cards */}
      <section
        id="contact-info"
        className="py-16 sm:py-20 lg:py-24 bg-clapperboard-gray-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              연락처 정보
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              다양한 방법으로 연락주시면 신속하게 답변드리겠습니다
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action}
                className="group bg-clapperboard-gray rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 p-6 sm:p-8 text-center border-2 border-transparent hover:border-potato-orange"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:animate-bounce">
                  {info.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-2 sm:mb-3">
                  {info.title}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-potato-orange mb-2">
                  {info.content}
                </p>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {info.subContent}
                </p>

                {/* Hover Effect */}
                <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-potato-orange text-white rounded-full text-xs sm:text-sm font-semibold">
                    클릭하여 연결
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-24 bg-clapperboard-gray">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              왜 COUCH POTATO인가요?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              전문성과 창의성을 바탕으로 최고의 영상을 제작합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎬",
                title: "전문적인 장비",
                description:
                  "최신 4K 카메라와 전문 조명 장비로 고품질 영상을 촬영합니다",
                features: [
                  "4K 고화질 촬영",
                  "전문 조명 시스템",
                  "안정적인 짐벌 촬영",
                ],
              },
              {
                icon: "✨",
                title: "창의적인 편집",
                description:
                  "스토리텔링과 감성을 담은 편집으로 특별한 영상을 만들어드립니다",
                features: [
                  "감성적인 스토리텔링",
                  "트렌디한 편집 기법",
                  "맞춤형 음악 선곡",
                ],
              },
              {
                icon: "⚡",
                title: "빠른 작업",
                description:
                  "효율적인 워크플로우로 빠르고 정확하게 작업을 완료합니다",
                features: [
                  "1-2주 내 완성",
                  "실시간 진행상황 공유",
                  "빠른 피드백 반영",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-clapperboard-gray-light rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 p-8"
              >
                <div className="text-5xl mb-6 text-center">{service.icon}</div>
                <h3 className="text-2xl font-black text-white mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-potato-orange rounded-full flex-shrink-0"></span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-clapperboard-gray-dark">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              자주 묻는 질문
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-potato-orange to-potato-orange-light mx-auto mb-8"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "견적은 무료인가요?",
                a: "네, 모든 견적 상담은 무료로 진행됩니다. 프로젝트 상세 내용을 알려주시면 정확한 견적을 제공해드립니다.",
              },
              {
                q: "촬영 소요시간은 얼마나 되나요?",
                a: "프로젝트 규모에 따라 다르지만, 일반적으로 웨딩은 6-8시간, 기업 홍보는 2-4시간 정도 소요됩니다.",
              },
              {
                q: "완성된 영상은 언제 받을 수 있나요?",
                a: "촬영 후 편집 작업을 거쳐 일반적으로 1-2주 내에 완성본을 전달해드립니다.",
              },
              {
                q: "수정 요청이 가능한가요?",
                a: "네, 1차 완성본에 대해 2회까지 수정 요청이 가능합니다. 추가 수정은 별도 비용이 발생할 수 있습니다.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-clapperboard-gray rounded-xl p-6 hover:bg-clapperboard-gray-light transition-colors duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                  <span className="text-potato-orange">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">
                  <span className="text-potato-orange font-semibold">A.</span>{" "}
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-potato-orange to-potato-orange-light text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            지금 바로 시작하세요!
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            전문적인 영상 제작으로 여러분의 스토리를 세상에 알려보세요
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="tel:010-1234-5678"
              className="px-12 py-5 bg-white text-potato-orange font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              📞 010-1234-5678
            </a>
            <Link href="/portfolio">
              <button className="px-12 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-potato-orange transform hover:scale-105 transition-all duration-300">
                🎬 포트폴리오 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
