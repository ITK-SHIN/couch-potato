"use client";
import Link from "next/link";
import Image from "next/image";
// import logoImg from "../../../../../public/imgs/logo_new_v2.png";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

type SidebarProps = {
  toggleSidebar: () => void;
};

const Sidebar = ({ toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-40 bg-clapperboard-gray-dark/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={toggleSidebar}
      />

      {/* 사이드바 */}
      <aside
        className="fixed left-0 top-0 w-80 h-full z-50 transform transition-all duration-500 ease-out animate-slide-in-left"
        style={{
          background:
            "linear-gradient(135deg, rgba(47,47,47,0.95) 0%, rgba(64,64,64,0.9) 50%, rgba(26,26,26,0.85) 100%)",
          backdropFilter: "blur(25px) saturate(180%)",
          WebkitBackdropFilter: "blur(25px) saturate(180%)",
          boxShadow:
            "0 20px 60px 0 rgba(210, 105, 30, 0.3), inset 0 1px 0 rgba(244, 164, 96, 0.2)",
          borderRight: "1px solid rgba(210, 105, 30, 0.3)",
        }}
      >
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between p-6 border-b border-potato-orange/20">
          <Link href="/" className="flex items-center" onClick={toggleSidebar}>
            <div className="inline-block rounded-xl bg-gradient-to-br from-clapperboard-gray-dark via-clapperboard-gray to-clapperboard-gray-light p-2 shadow-lg">
              <Image
                src="/imgs/mainlogo.png"
                alt={"logoImage"}
                className="w-32"
                width={128}
                height={56}
              />
            </div>
          </Link>

          {/* 닫기 버튼 */}
          <div
            className="relative overflow-hidden rounded-full shadow-lg p-3 border border-potato-orange/40 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgba(47,47,47,0.8) 0%, rgba(64,64,64,0.6) 100%)",
              boxShadow: "0 8px 25px 0 rgba(210, 105, 30, 0.2)",
            }}
            onClick={toggleSidebar}
          >
            <IoClose
              className="text-2xl transition-transform duration-200 hover:rotate-90"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 8px rgba(239, 68, 68, 0.3))",
              }}
            />
          </div>
        </div>

        {/* 메뉴 영역 */}
        <nav className="flex flex-col p-6 space-y-3">
          {[
            { href: "/about", label: "ABOUT" },
            { href: "/portfolio", label: "PORTFOLIO" },
            { href: "/process", label: "PROCESS" },
            { href: "/location", label: "LOCATION" },
            { href: "/contact", label: "CONTACT" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative overflow-hidden rounded-2xl px-6 py-4 transition-all duration-300 transform hover:scale-105 animate-menu-item-slide-in ${
                pathname === item.href
                  ? "bg-gradient-to-r from-potato-orange via-potato-orange-light to-potato-orange-dark text-white shadow-lg scale-105"
                  : "bg-clapperboard-gray/40 text-white hover:bg-gradient-to-r hover:from-potato-orange/20 hover:to-potato-orange-light/20 hover:text-white"
              }`}
              style={{
                boxShadow:
                  pathname === item.href
                    ? "0 8px 25px 0 rgba(210, 105, 30, 0.3), inset 0 1px 0 rgba(244, 164, 96, 0.2)"
                    : "0 4px 15px 0 rgba(47, 47, 47, 0.1), inset 0 1px 0 rgba(210, 105, 30, 0.1)",
                border: "1px solid rgba(210, 105, 30, 0.2)",
                animationDelay: `${0.2 + index * 0.1}s`,
                opacity: 0,
                animation: `menu-item-slide-in 0.3s ease-out ${
                  0.2 + index * 0.1
                }s forwards`,
              }}
              onClick={toggleSidebar}
            >
              {/* 배경 장식 요소 */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(210,105,30,0.2) 50%, transparent 70%)",
                }}
              />

              <span className="relative z-10 font-extrabold text-lg tracking-wide">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* 하단 장식 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-potato-orange via-potato-orange-light to-potato-orange-dark opacity-50" />
      </aside>
    </>
  );
};

export default Sidebar;
