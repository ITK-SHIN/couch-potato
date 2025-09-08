
import Link from "next/link";
import React from "react";
import clsx from "clsx"; // clsx 라이브러리 사용 위해 추가


/*  공통 BigWhiteBtn 컴포넌트 (props: text, link, text color, bg color, hover시 bg-color, hover시 text-color) */

interface BigWhiteBtnProps {
  href: string;
  text: string;
  textColor?: string; // 예: "text-white"
  bgColor?: string; // 예: "bg-transparent"
  hoverBgColor?: string; // 예: "hover:bg-white"
  hoverTextColor?: string; // 예: "hover:text-clapperboard-gray-dark"
  borderColor?: string; // 예: "border-white"
  hoverBorderColor?: string; // 예: "hover:border-white"
  border?: string; // 예: "border-2"
}

export const BigWhiteBtn: React.FC<BigWhiteBtnProps> = ({
  href,
  text,
  textColor = "text-black",
  bgColor = "bg-transparent",
  hoverBgColor = "hover:bg-white",
  hoverTextColor = "hover:text-clapperboard-gray-dark",
  borderColor = "border-white",
  hoverBorderColor = "",
  border = "border-2", // 기본값을 border-2로 지정 (명확하게)
}) => {
  // border 관련 클래스가 중복되거나, tailwind에서 border-white가 border가 없으면 적용 안됨
  // border, borderColor, hoverBorderColor를 순서대로 조합
  const classes = clsx(
    "px-12 py-5 font-bold rounded-full transition-all duration-300 shadow-xl  hover:scale-105",
    border, // border-2 등
    borderColor, // border-white 등
    hoverBorderColor, // hover:border-white 등
    textColor,
    bgColor,
    hoverBgColor,
    hoverTextColor
  );

  return (
    <Link href={href}>
      <button className={classes}>
        {text}
      </button>
    </Link>
  );
};

// 사용 예시
// About 포트폴리오 보기 버튼
{/* <BigWhiteBtn href="/portfolio" text="🎬 포트폴리오 보기" /> */}

/*  SmallYellowBtn 컴포넌트 */
interface SmallYellowBtnProps {
  href?: string;
  text: string;
}

export const SmallYellowBtn: React.FC<SmallYellowBtnProps> = ({
  href,
  text,
}) => {
  const buttonClasses =
    "px-12 py-5 bg-gradient-to-r from-potato-orange to-potato-orange-light text-white font-bold rounded-full hover:from-potato-orange-light hover:to-potato-orange-dark transform hover:scale-105 transition-all duration-300 shadow-xl";

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {text}
      </a>
    );
  }
  return <button className={buttonClasses}>{text}</button>;
};

// 사용 예시
{/* <SmallYellowBtn href="/contact" text="📞 연락하기" /> */}

/* SmallYellowHoverBigBtn 컴포넌트 */
interface SmallYellowHoverBigBtnProps {
  href: string; // href는 무조건 필수
  text: string;
}

export const SmallYellowHoverBigBtn: React.FC<SmallYellowHoverBigBtnProps> = ({
  href,
  text,
}) => {
  // location/page.tsx에서 사용한 버튼 클래스와 완전히 동일하게 맞춤
  const buttonClasses =
    "w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white font-black rounded-full hover:from-potato-orange-light hover:to-potato-orange transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-potato-orange-light";

  // a 태그 대신 next/link의 Link와 button 조합으로 변경 (접근성 및 SSR 일관성)
  return (
    <Link href={href}>
      <button type="button" className={buttonClasses}>
        {text}
      </button>
    </Link>
  );
};

// 사용 예시
// <SmallYellowHoverBigBtn href="#locations" text="📍 촬영 장소 보기" />

/* SmallYellowBorderHoverBigBtn 컴포넌트 */
interface SmallYellowBorderHoverBigBtnProps {
  href: string; // href는 무조건 필수
  text: string;
}

export const SmallYellowBorderHoverBigBtn: React.FC<SmallYellowBorderHoverBigBtnProps> = ({
  href,
  text,
}) => {
  // SmallYellowHoverBigBtn의 디자인을 그대로 사용하되, 배경은 투명 & border만 노란색, hover 시 배경이 노란색으로 변하도록
  const buttonClasses =
    "w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-potato-orange text-potato-orange font-black rounded-full hover:bg-gradient-to-r hover:from-potato-orange hover:to-potato-orange-dark hover:text-white transform hover:scale-110 transition-all duration-300 shadow-2xl";

  return (
    <Link href={href}>
      <button type="button" className={buttonClasses}>
        {text}
      </button>
    </Link>
  );
};

// 사용 예시
// <SmallYellowBorderHoverBigBtn href="#portfolio-grid" text="🎬 작품 갤러리 보기" />




/* BigYellowBtn */
interface BigYellowBtnProps {
  href: string; // href는 필수
  text: string;
}

export const BigYellowBtn: React.FC<BigYellowBtnProps> = ({
  href,
  text,
}) => {
  return (
    <Link href={href} className="flex-1">
      <button className="group relative w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-potato-orange to-potato-orange-dark text-white font-bold rounded-full shadow-2xl hover:shadow-potato-orange/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base whitespace-nowrap overflow-hidden">
        <span className="relative z-10 flex items-center justify-center gap-2">
          {/* text가 "🚀 프로젝트 시작하기"처럼 이모지+텍스트일 때 이모지와 텍스트를 분리해서 보여줌 */}
          {text.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s+/u) ? (
            <>
              <span className="text-sm sm:text-base">
                {text.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u)?.[0]}
              </span>
              <span className="font-bold text-sm sm:text-base">
                {text.replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s+/u, '')}
              </span>
            </>
          ) : (
            <span className="font-bold text-sm sm:text-base">{text}</span>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-potato-orange-dark to-potato-orange-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </Link>
  );
};

// 사용예시
// <BigYellowBtn href="/contact" text="🚀 프로젝트 시작하기" />


/*  BigBlackBtn */
interface BigBlackBtnProps {
  href: string; // href는 필수로 변경
  text: string;
}

export const BigBlackBtn: React.FC<BigBlackBtnProps> = ({
  href,
  text,
}) => {
  // page.tsx의 포트폴리오 버튼과 완전히 동일한 디자인
  const buttonClasses =
    "group w-full px-5 py-3 sm:px-6 sm:py-4 bg-clapperboard-gray/80 backdrop-blur-sm text-white font-semibold rounded-full border border-clapperboard-gray-light hover:bg-clapperboard-gray transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap";

  return (
    <a href={href} className="flex-1">
      <button className={buttonClasses}>
        <span className="flex items-center justify-center gap-2">
          {text}
        </span>
      </button>
    </a>
  );
}; 
// 사용 예시
// <BigBlackBtn href="/portfolio" text="🎬 포트폴리오 보기" />
